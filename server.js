// server.js — Cloud Run container: serves the static site + recipes API from Turso.
// Run: node server.js   (PORT provided by Cloud Run, defaults to 8080)
import express from "express";
import { createClient } from "@libsql/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// GET /api/recipes -> array of recipe objects (the shape the UI expects).
// Each row stores the full recipe object as JSON in `data`.
app.get("/api/recipes", async (_req, res) => {
  try {
    const rs = await db.execute(
      "SELECT data FROM recipes ORDER BY name COLLATE NOCASE ASC"
    );
    const recipes = rs.rows.map((r) => JSON.parse(r.data));
    res.set("Cache-Control", "public, max-age=300"); // 5 min CDN/browser cache
    res.json(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed to load recipes" });
  }
});

app.get("/health", (_req, res) => res.send("ok"));

// Static site. The frontend references ./support.js and ./recipes.js relatively.
app.use(express.static(path.join(__dirname, "frontend")));
// SPA catch-all: /recipe/:id and / all serve the same HTML; routing is client-side.
app.get(/^(\/recipe\/[^/]+)?$/, (_req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "Heirloom Kitchen.dc.html"))
);

app.listen(PORT, () => console.log(`Heirloom Kitchen on :${PORT}`));
