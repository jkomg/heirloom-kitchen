# Heirloom Kitchen Cookbook — Claude Code Handoff

## Overview
A recipe website synced from Notion with **interactive bowl configurators**. Users can build custom bowls by selecting protein, grain, and topping options — the UI scales ingredients, updates nutrition, and shows protein-specific cooking methods.

## Live Features
- **3 Bowl Recipes** with full configurators:
  - Mexican Chicken Rice Bowl (Chicken/Shrimp/Tofu)
  - Lebanese Farro & Chicken Bowl (Chicken/Salmon/Cod/Tofu)
  - Japanese Miso Shrimp Bowl (Shrimp/Scallops/Salmon/Cod)
- **Dynamic Ingredient Scaling** — Portions scale both the protein amount and full recipe
- **Live Nutrition** — Macros update with every choice
- **Chef's Notes** — Each protein/topping choice explains the flavor logic
- **Protein-Specific Methods** — "SHRIMP: Sauté in hot pan…" vs "SALMON: Sear skin-side down…"

## File Structure
- `Heirloom Kitchen.dc.html` — Main component (all UI + logic)
- `recipes.js` — Recipe data objects with configurator slots
- `notion-sync-spec.md` — Notion schema & sync requirements
- `support.js` — DC runtime (auto-generated, don't edit)

## Key Data Shape (recipes.js)
Each bowl recipe has a `configurator` object:
```js
configurator: {
  slots: [
    { id: "grain", label: "Grain", default: "brown-rice", 
      options: [{ id: "...", label: "..." }, ...] },
    { id: "protein", label: "Protein", default: "shrimp", 
      options: [...] },
    { id: "topping", label: "Topping", default: "miso", 
      options: [...] }
  ],
  base: ["ingredient 1", "ingredient 2", ...],  // Always shown
  proteins: {
    shrimp: {
      label: "Shrimp", 
      gramLabel: "340g",  // Used for portion scaling
      spiceNote: "Miso-glazed, umami, quick-cooking",
      ingredients: [...],
      method: "Sauté in a hot pan with oil...",
      nutrition: { cal: 196, protein: 28, fat: 5, carbs: 4, fiber: 0 }
    },
    ...
  },
  grains: { ... },  // Same shape
  toppings: { ... },  // Same shape
  baseNutrition: { cal: 165, protein: 10, fat: 2, carbs: 28, fiber: 7 }
}
`

## State Management (Heirloom Kitchen.dc.html)
```js
state = {
  view: 'index',  // 'index' or recipe id
  scale: 1,
  cfg: {},  // Active configurator choices per recipe
  proteinMult: 1,  // 0.75 (Lite), 1 (Normal), 1.5 (Large)
  filteredRecipes: [...],
  favs: [],
  favOnly: false,
  // ... more
}
`

When a bowl is active (`view === bowlId`):
- `cfg[bowlId]` contains `{ grain, protein, topping }` selections
- Portion multiplier (`proteinMult`) scales the protein gram amount
- `renderVals()` computes ingredient list, nutrition, and protein method from selections

## Next Steps for Development
1. **Notion Sync** — Read `notion-sync-spec.md` for API shape; write a webhook listener or scheduled job to pull new recipes
2. **More Recipes** — Use the configurator pattern for other dishes (e.g., Grain Bowls, Protein Plates)
3. **Persistence** — Store user's bowl builds in localStorage or a database
4. **Search & Filters** — Already stubbed (cuisine, diet, meal type); wire to a backend if needed
5. **Print / Export** — Add "Save Bowl" → generates a shopping list or PDF

## Configurator Logic Flow
1. User opens a bowl recipe
2. Clicks a slot option (e.g., "Salmon" under Protein)
3. `onSlotChoice(recipeId, slotId, optionId)` updates `state.cfg`
4. `renderVals()` recomputes:
   - Merged ingredient list (base + selected protein/grain/topping)
   - Scaled nutrition (protein choice × portion multiplier)
   - Protein method text
5. Template re-renders with new values

## Component Exports
None — this is a full-page DC. Mount with:
```html
<x-import component-from-global-scope="..." from="./Heirloom Kitchen.dc.html" hint-size="100%,100%"></x-import>
`

## CSS / Styling
- Inline styles only (no stylesheets)
- CSS variables: `--bg`, `--ink`, `--muted`, `--accent`
- Fonts: 'Space Mono' for labels, system sans for body

## Known Limitations
- No backend sync yet (Notion→recipes.js is manual)
- No user accounts or saved bowls
- Nutrition data is approximate (sourced from USDA/general databases)
- No allergen warnings (should add per-ingredient tags)

---

**Questions?** Check the component's logic class or reach out to the design team.
