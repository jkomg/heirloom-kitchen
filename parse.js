// parse.js — turn Notion's Ingredients / Instructions text into structured sections.
// Rules are documented in PARSING.md. Tune against frontend/recipes.seed.js, which
// is the hand-verified expected output for the current 16 recipes.

// A section header looks like "FOR THE TOSTADAS", "OPTIONAL", "DOUGH:" — short,
// mostly uppercase, no quantity.
function isHeader(line) {
  const l = line.replace(/:$/, "").trim();
  if (!l || /\d/.test(l)) return false;
  const letters = l.replace(/[^A-Za-z]/g, "");
  if (letters.length < 2) return false;
  const upper = l.replace(/[^A-Z]/g, "").length;
  return upper / letters.length > 0.7 && l.split(/\s+/).length <= 6;
}
const titleCase = (h) =>
  h.replace(/:$/, "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Split a blob into lines. Newer recipes use <br>; older ones may use real newlines.
function lines(blob) {
  return (blob || "")
    .split(/<br\s*\/?>|\n/i)
    .map((s) => s.replace(/&nbsp;/g, " ").trim())
    .filter(Boolean);
}

export function parseIngredients(blob, _page) {
  // Older empanadas pack everything as "FILLING: a, b, c. DOUGH: x." on one line.
  if (blob && !/<br/i.test(blob) && /\b[A-Z]{3,}:/.test(blob)) {
    const sections = [];
    const re = /([A-Z][A-Z \/]+):\s*([^]*?)(?=(?:[A-Z][A-Z \/]+:)|$)/g;
    let m;
    while ((m = re.exec(blob))) {
      const items = m[2].replace(/\.\s*$/, "").split(/,\s*/).map((s) => s.trim()).filter(Boolean);
      sections.push({ h: titleCase(m[1]), items });
    }
    if (sections.length) return sections;
  }
  // Default: <br>/newline list with optional ALL-CAPS headers.
  const sections = [];
  let cur = { h: null, items: [] };
  for (const ln of lines(blob)) {
    if (isHeader(ln)) {
      if (cur.items.length || cur.h) sections.push(cur);
      cur = { h: titleCase(ln), items: [] };
    } else cur.items.push(ln);
  }
  if (cur.items.length || cur.h) sections.push(cur);
  return sections.length ? sections : [{ h: null, items: [] }];
}

export function parseSteps(blob, _page) {
  const sections = [];
  let cur = { h: null, items: [] };
  for (let ln of lines(blob)) {
    if (isHeader(ln)) {
      if (cur.items.length || cur.h) sections.push(cur);
      cur = { h: titleCase(ln), items: [] };
    } else {
      ln = ln.replace(/^\s*\d+[.)]\s*/, ""); // strip leading "1." / "2)"
      if (ln) cur.items.push(ln);
    }
  }
  if (cur.items.length || cur.h) sections.push(cur);
  return sections.length ? sections : [{ h: null, items: [] }];
}
