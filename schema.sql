-- schema.sql — Turso / libSQL
-- One row per recipe. Scalar columns are handy for future SQL filtering/sorting;
-- `data` holds the full recipe object exactly as the frontend consumes it.
CREATE TABLE IF NOT EXISTS recipes (
  id            TEXT PRIMARY KEY,   -- slug, stable (favorites key on the site)
  notion_id     TEXT UNIQUE,        -- Notion page id (for upserts)
  name          TEXT NOT NULL,
  updated_at    TEXT,               -- Notion last_edited_time (ISO)
  total_min     INTEGER,            -- prep + cook, for cheap sorting
  data          TEXT NOT NULL       -- JSON: the full recipe object
);

CREATE INDEX IF NOT EXISTS idx_recipes_name ON recipes (name);
