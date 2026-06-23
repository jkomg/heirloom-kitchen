// sync.js — Notion -> Turso. Run as a Cloud Run Job on an hourly Cloud Scheduler cron.
// Pulls the Heirloom Kitchen database, maps each page to the frontend recipe shape,
// dedupes by name (keeps the most recently edited), and upserts into Turso.
import { Client } from "@notionhq/client";
import { createClient } from "@libsql/client";
import { Storage } from "@google-cloud/storage";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIGURATORS = JSON.parse(readFileSync(join(__dirname, "configurators.json"), "utf8"));

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_DATABASE_ID;
const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const storage = new Storage({ projectId: "cookbook-500218" });
const BUCKET = "heirloom-kitchen-images";

// ---- Notion property readers -------------------------------------------------
const txt = (p) => (p?.rich_text || p?.title || []).map((t) => t.plain_text).join("").trim();
const num = (p) => (p?.number ?? null);
const sel = (p) => p?.select?.name || null;
const multi = (p) => (p?.multi_select || []).map((o) => o.name);
const check = (p) => !!p?.checkbox;

// Get the first file URL from a Notion files property (internal URLs are signed + temporary).
const notionFileUrl = (p) => {
  const items = p?.files || [];
  if (!items.length) return null;
  const f = items[0];
  return f.type === "file" ? f.file?.url : f.external?.url || null;
};

const UNIT_BY_TYPE = {
  Empanadas: "empanadas", Tostada: "servings", Muffin: "muffins", Sopes: "sopes",
  Cornbread: "squares", "Drink/Atole": "servings", Eggs: "servings", "Pie/Bake": "servings",
  Soup: "bowls", Stew: "bowls",
};

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitEmoji(title) {
  const m = title.match(/^\s*(\p{Extended_Pictographic}(?:‍\p{Extended_Pictographic})*)\s*/u);
  const emoji = m ? m[1] : "";
  const name = title.replace(/^\s*(\p{Extended_Pictographic}[\s‍]*)+/u, "").trim();
  return { emoji, name };
}

// ---- Block-based content reader ---------------------------------------------
// For recipes whose Ingredients/Instructions live in the page body as Notion blocks
// (heading_2 → section, heading_3 → subsection, bulleted/numbered/paragraph → items).
async function fetchPageContent(pageId) {
  const blocks = [];
  let cursor;
  do {
    const r = await notion.blocks.children.list({ block_id: pageId, page_size: 100, start_cursor: cursor });
    blocks.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);

  let mode = null; // 'ingredients' | 'instructions'
  let curSec = null;
  const ingSections = [];
  const stepSections = [];

  const flush = () => {
    if (!curSec) return;
    if (curSec.items.length || curSec.h) {
      if (mode === "ingredients") ingSections.push(curSec);
      else if (mode === "instructions") stepSections.push(curSec);
    }
    curSec = null;
  };

  for (const block of blocks) {
    const richText = block[block.type]?.rich_text || [];
    const text = richText.map((t) => t.plain_text).join("").trim();

    if (block.type === "heading_2") {
      flush();
      const lower = text.toLowerCase();
      if (lower.includes("ingredient")) {
        mode = "ingredients";
        curSec = { h: null, items: [] };
      } else if (lower.includes("instruction") || lower.includes("method") || lower.includes("direction")) {
        mode = "instructions";
        curSec = { h: null, items: [] };
      } else {
        mode = null;
      }
      continue;
    }

    if (!mode) continue;

    if (block.type === "heading_3") {
      flush();
      curSec = { h: text, items: [] };
      continue;
    }

    if (["bulleted_list_item", "numbered_list_item", "paragraph"].includes(block.type)) {
      if (!text) continue;
      if (!curSec) curSec = { h: null, items: [] };
      curSec.items.push(text);
    }
  }
  flush();

  return {
    ingredients: ingSections.length ? ingSections : [{ h: null, items: [] }],
    steps: stepSections.length ? stepSections : [{ h: null, items: [] }],
  };
}

// ---- Image mirroring --------------------------------------------------------
async function mirrorImage(recipeId, notionUrl) {
  if (!notionUrl) return null;
  const bucket = storage.bucket(BUCKET);

  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const [exists] = await bucket.file(`recipes/${recipeId}.${ext}`).exists();
    if (exists) return `https://storage.googleapis.com/${BUCKET}/recipes/${recipeId}.${ext}`;
  }

  try {
    const resp = await fetch(notionUrl);
    if (!resp.ok) return null;
    const contentType = resp.headers.get("content-type") || "image/jpeg";
    const ext = contentType.split("/")[1]?.replace("jpeg", "jpg").replace(/;.*/, "") || "jpg";
    const dest = `recipes/${recipeId}.${ext}`;
    const buf = Buffer.from(await resp.arrayBuffer());
    await bucket.file(dest).save(buf, { contentType, resumable: false });
    console.log(`  Uploaded image for ${recipeId}`);
    return `https://storage.googleapis.com/${BUCKET}/${dest}`;
  } catch (e) {
    console.warn(`  Image mirror failed for ${recipeId}: ${e.message}`);
    return null;
  }
}

// ---- Page mapper -------------------------------------------------------------
import { parseIngredients, parseSteps } from "./parse.js";

async function mapPage(page) {
  const P = page.properties;
  const rawTitle = txt(P["Name"]);
  const { emoji, name } = splitEmoji(rawTitle);
  const recipeType = sel(P["Recipe Type"]);
  const id = slug(name);

  const ingText = txt(P["Ingredients"]);
  const stepsText = txt(P["Instructions"]);

  // If either property is empty, the recipe content lives in page body blocks.
  let ingredients, steps;
  if (!ingText || !stepsText) {
    const content = await fetchPageContent(page.id);
    ingredients = ingText ? parseIngredients(ingText, page) : content.ingredients;
    steps = stepsText ? parseSteps(stepsText, page) : content.steps;
  } else {
    ingredients = parseIngredients(ingText, page);
    steps = parseSteps(stepsText, page);
  }

  const photo = await mirrorImage(id, notionFileUrl(P["Files & media"]) || (page.cover?.type === "file" ? page.cover.file?.url : page.cover?.external?.url));

  return {
    id,
    notion_id: page.id,
    updated_at: page.last_edited_time,
    recipe: {
      id,
      emoji: emoji || "🍽️",
      name,
      photo,
      cuisine: multi(P["Cuisine"]),
      cuisineInfluence: multi(P["Cuisine Influence"]),
      diet: multi(P["Diet"]),
      meal: multi(P["Meal Type"]),
      keyIngredients: multi(P["Key Ingredients"]),
      recipeType,
      difficulty: sel(P["Difficulty"]) || "Easy",
      prep: num(P["Prep Time"]) || 0,
      cook: num(P["Cook Time"]) || 0,
      batch: num(P["Batch Size"]) || 1,
      unit: UNIT_BY_TYPE[recipeType] || "servings",
      freezer: check(P["Freezer Friendly"]),
      lowFat: check(P["Low Fat"]),
      proteinFocus: check(P["Protein Focus"]),
      blurb: txt(P["Blurb"]) || (txt(P["Notes"]).split(/(?<=[.!?])\s/)[0] || ""),
      notes: txt(P["Notes"]),
      ingredients,
      steps,
      ...(CONFIGURATORS[id] ? { configurator: CONFIGURATORS[id] } : {}),
    },
  };
}

// ---- Fetch all pages --------------------------------------------------------
async function fetchAllPages() {
  const out = [];
  let cursor;
  do {
    const r = await notion.databases.query({ database_id: DB, start_cursor: cursor, page_size: 100 });
    out.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return out;
}

// ---- Main -------------------------------------------------------------------
async function main() {
  const pages = await fetchAllPages();
  const mapped = await Promise.all(pages.map(mapPage));

  // Dedupe by name: keep the most recently edited.
  const byName = new Map();
  for (const m of mapped) {
    const k = m.recipe.name.toLowerCase();
    const prev = byName.get(k);
    if (!prev || new Date(m.updated_at) > new Date(prev.updated_at)) byName.set(k, m);
  }
  const recipes = [...byName.values()];

  // Upsert + remove rows no longer present.
  const keepIds = new Set(recipes.map((r) => r.id));
  await turso.batch(
    recipes.map((m) => ({
      sql: `INSERT INTO recipes (id, notion_id, name, updated_at, total_min, data)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              notion_id=excluded.notion_id, name=excluded.name,
              updated_at=excluded.updated_at, total_min=excluded.total_min, data=excluded.data`,
      args: [m.id, m.notion_id, m.recipe.name, m.updated_at,
             (m.recipe.prep + m.recipe.cook), JSON.stringify(m.recipe)],
    })),
    "write"
  );
  const existing = await turso.execute("SELECT id FROM recipes");
  const stale = existing.rows.map((r) => r.id).filter((id) => !keepIds.has(id));
  if (stale.length) {
    await turso.execute({
      sql: `DELETE FROM recipes WHERE id IN (${stale.map(() => "?").join(",")})`,
      args: stale,
    });
  }
  console.log(`Synced ${recipes.length} recipes (removed ${stale.length} stale).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
