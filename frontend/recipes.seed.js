/*
 * Heirloom Kitchen — recipe data
 * ---------------------------------
 * Cached from the Notion database "🍳 Heirloom Kitchen"
 * (data source collection://13242a54-af53-438b-882e-803295cf4e03).
 *
 * This file is the contract between Notion and the website. A sync script
 * fetches the Notion database via the API and regenerates this array with
 * the SAME shape, then redeploys. Field mapping is documented in
 * notion-sync-spec.md.
 *
 * ingredients / steps are arrays of { h, items } sections (h = optional
 * subheading). Quantities are kept as plain text so the serving scaler can
 * multiply the numbers in place.
 */
window.HK_RECIPES = [
  {
    id: "zucchini-corn-poblano-empanadas",
    emoji: "🌽",
    name: "Zucchini, Corn & Poblano Empanadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian", "Low Sat Fat"],
    meal: ["Lunch", "Dinner"],
    keyIngredients: ["Zucchini", "Corn", "Poblano"],
    recipeType: "Empanadas", difficulty: "Easy",
    prep: 15, cook: 20, batch: 12, unit: "empanadas",
    freezer: false, lowFat: true, proteinFocus: false,
    blurb: "A fresh summer filling — zucchini, sweet corn, and charred poblano — folded into masa and baked, not fried.",
    notes: "Keep the vegetables slightly crisp — don't overcook the zucchini. Best eaten fresh; freezer results vary. Add a light sprinkle of cotija if desired.",
    ingredients: [
      { h: "Filling", items: ["1 zucchini (200g), small dice", "1 cup (150g) corn", "1 poblano pepper", "¼ onion (50g), diced", "1 clove garlic", "½ tsp salt", "Juice of ½ lime", "2 tbsp cilantro"] },
      { h: "Dough", items: ["~3 cups masa"] }
    ],
    steps: [
      { h: null, items: [
        "Char the poblano directly over a flame or under the broiler, then peel and slice.",
        "Cook the onion and garlic over medium heat until softened.",
        "Add the zucchini and cook 3–4 min, keeping a slight crispness. Add the corn and poblano; cook 3 min more.",
        "Off the heat, stir in the lime juice and cilantro. Cool before filling.",
        "Bake at 400°F: 12–15 min, flip, then 8–10 min more."
      ] }
    ]
  },
  {
    id: "crispy-refried-bean-tostadas",
    emoji: "🫘",
    name: "Crispy Refried Bean Tostadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat", "Dairy-Free"],
    meal: ["Lunch", "Dinner", "Snack"],
    keyIngredients: ["Black Beans", "Jalapeño", "Onion", "Avocado", "Cotija"],
    recipeType: "Tostada", difficulty: "Easy",
    prep: 15, cook: 25, batch: 4, unit: "servings",
    freezer: false, lowFat: true, proteinFocus: false,
    blurb: "Oven-crisped tortillas piled with quick skillet refried black beans and all the garnishes. From Masienda.",
    notes: "Baking the tortillas is crispier and healthier than frying. The beans can be made ahead and refrigerated. From Masienda.",
    ingredients: [
      { h: "For the tostadas", items: ["8 corn tortillas", "2 tbsp olive oil", "Salt to taste"] },
      { h: "For the refried beans", items: ["½ small white onion, diced (about ¼ cup)", "1 small jalapeño, diced", "3 garlic cloves, minced", "½ tsp kosher salt", "1 tsp dried oregano", "1 can (15 oz) black beans with their broth (or 1½ cups cooked black beans with cooking liquid)"] },
      { h: "For garnish", items: ["Shredded lettuce", "Sliced avocado", "Salsa macha", "Cotija, crumbled", "Mexican crema"] }
    ],
    steps: [
      { h: "Tostadas", items: [
        "Preheat the oven to 425°F. Line a baking sheet with parchment.",
        "Arrange the tortillas in a single layer, drizzle lightly with olive oil, and sprinkle with salt.",
        "Bake 15 min, flipping halfway, until golden and crispy."
      ] },
      { h: "Refried beans", items: [
        "Heat olive oil in a skillet over medium heat.",
        "Add the onion, jalapeño, garlic, salt, and oregano. Cook 5–6 min until soft and translucent.",
        "Add the black beans with their broth. Bring to a simmer.",
        "Mash to your preferred consistency with a bean masher or the back of a spoon.",
        "Taste and adjust salt."
      ] },
      { h: "Assemble", items: [
        "Spread a generous layer of refried beans on each tostada.",
        "Top with shredded lettuce, avocado, salsa macha, crumbled cotija, and a drizzle of crema."
      ] }
    ]
  },
  {
    id: "sheet-pan-chicken-tinga-tostadas",
    emoji: "🫔",
    name: "Sheet Pan Chicken Tinga Tostadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Contains Meat", "Dairy-Free", "Gluten-Free"],
    meal: ["Lunch", "Dinner"],
    keyIngredients: ["Chicken", "Chipotle", "Tomato", "Onion", "Avocado"],
    recipeType: "Tostada", difficulty: "Easy",
    prep: 15, cook: 25, batch: 5, unit: "servings",
    freezer: false, lowFat: false, proteinFocus: true,
    blurb: "Everything roasts on one sheet pan — smoky chipotle chicken, caramelized onions — then gets shredded right in the sauce.",
    notes: "A convection oven gives better caramelization on the onions. The tinga reheats well, but assemble the tostadas fresh so they stay crispy. From Masienda.",
    ingredients: [
      { h: null, items: ["3 boneless, skinless chicken breasts (~1½ lb)", "¼ cup olive oil", "1 cup crushed tomatoes", "3 chipotle chiles in adobo + 1 tbsp adobo sauce", "1 tsp dried oregano", "1 tsp ground cumin", "1 tsp garlic powder", "3 tsp kosher salt, divided", "1 large white onion, very thinly sliced", "3 Roma tomatoes, small dice"] },
      { h: "To serve", items: ["Mexican crema", "Sliced avocado", "Tostadas"] }
    ],
    steps: [
      { h: null, items: [
        "Heat the oven to 375°F (convection if available).",
        "Pat the chicken dry and place on a 13x18-inch sheet pan.",
        "Drizzle with olive oil, then add the crushed tomatoes, chipotles with adobo sauce, oregano, cumin, garlic powder, and 2 tsp salt. Mix directly on the pan until the chicken is evenly coated.",
        "Scatter the sliced onions and diced tomatoes around the chicken. Season with the remaining 1 tsp salt.",
        "Bake 20–25 min, flipping the chicken halfway, until the internal temperature reaches 165°F and the onions are softened and caramelized.",
        "Shred the chicken directly on the pan with two forks and toss everything together in the sauce.",
        "Spoon the tinga onto tostadas spread with crema. Top with sliced avocado and serve immediately."
      ] }
    ]
  },
  {
    id: "high-fiber-blue-corn-muffins",
    emoji: "🧁",
    name: "High-Fiber Blue Corn Muffins",
    cuisine: ["American", "Fusion"], cuisineInfluence: ["Fusion"],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Breakfast", "Snack", "Meal Prep"],
    keyIngredients: ["Blue Corn/Masa", "Squash", "Rolled Oats", "Egg", "Pistachio", "Apple Butter"],
    recipeType: "Muffin", difficulty: "Easy",
    prep: 15, cook: 22, batch: 12, unit: "muffins",
    freezer: true, lowFat: true, proteinFocus: false,
    blurb: "High-fiber breakfast muffins built on blue masa, oats, and roasted squash. Better the next morning.",
    notes: "Flavor and texture improve overnight. Optional blueberries or chia seeds add extra fiber and antioxidants.",
    ingredients: [
      { h: null, items: ["120g blue masa harina", "120g rolled oats", "80g whole wheat flour", "300g roasted squash puree", "2 eggs", "240ml pistachio milk", "40g apple butter", "25g olive oil", "8g baking powder", "1 tsp cinnamon", "½ tsp cardamom", "1 tsp vanilla", "4g salt"] },
      { h: "Optional", items: ["120g blueberries", "20g chia seeds"] }
    ],
    steps: [
      { h: null, items: [
        "Heat the oven to 375°F / 190°C. Grease or line a 12-cup muffin tin.",
        "Blend the roasted squash with the pistachio milk until smooth.",
        "Mix all the dry ingredients: masa harina, oats, flour, baking powder, cinnamon, cardamom, and salt.",
        "Whisk the eggs, olive oil, apple butter, and vanilla into the squash mixture.",
        "Gently fold the wet into the dry.",
        "Fold in blueberries or chia seeds if using.",
        "Fill the muffin cups and bake 20–24 min until a toothpick comes out clean.",
        "Cool before removing."
      ] }
    ]
  },
  {
    id: "huevos-a-la-mexicana",
    emoji: "🍳",
    name: "Huevos a la Mexicana",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian", "Low Sat Fat"],
    meal: ["Breakfast", "Lunch"],
    keyIngredients: ["Egg", "Tomato", "Jalapeño", "Onion", "Avocado"],
    recipeType: "Eggs", difficulty: "Easy",
    prep: 10, cook: 12, batch: 4, unit: "servings",
    freezer: false, lowFat: true, proteinFocus: true,
    blurb: "Soft scrambled eggs with tomato, onion, and jalapeño — a five-ingredient Mexican breakfast.",
    notes: "Remove the jalapeño seeds for milder heat. The eggs should stay soft and fluffy — don't overcook them. From Masienda.",
    ingredients: [
      { h: null, items: ["2 tbsp avocado oil", "1 small white onion, finely diced", "1 jalapeño, finely diced (seeds removed for less heat)", "2 Roma tomatoes, finely chopped", "Salt and pepper to taste", "6 large eggs"] },
      { h: "To serve", items: ["Fresh cilantro, chopped", "Warm tortillas", "Refried beans", "Sliced avocado"] }
    ],
    steps: [
      { h: null, items: [
        "Heat the avocado oil in a large skillet over medium heat.",
        "Add the onion, jalapeño, and tomatoes. Cook 6–8 min, stirring occasionally, until softened and most of the tomato liquid has evaporated. Season lightly with salt.",
        "Whisk the eggs until fully combined and slightly frothy. Season with salt and pepper.",
        "Reduce the heat to medium-low. Pour in the eggs and gently stir to combine with the vegetables.",
        "Cook 3–4 min, stirring occasionally, until the eggs are just set but still soft and fluffy.",
        "Garnish with cilantro and serve alongside warm tortillas, refried beans, and avocado."
      ] }
    ]
  },
  {
    id: "picadillo-shepherds-pie",
    emoji: "🥧",
    name: "Picadillo Shepherd's Pie",
    cuisine: ["Mexican", "American"], cuisineInfluence: [],
    diet: ["Contains Meat", "High Fiber"],
    meal: ["Dinner", "Meal Prep"],
    keyIngredients: ["Ground Beef", "Sweet Potato", "Chipotle", "Tomato", "Carrot", "Peas"],
    recipeType: "Pie/Bake", difficulty: "Medium",
    prep: 30, cook: 45, batch: 6, unit: "servings",
    freezer: true, lowFat: false, proteinFocus: true,
    blurb: "Chipotle-spiced beef picadillo under a silky sweet potato mash, thickened with a masa slurry.",
    notes: "The masa harina slurry thickens the sauce beautifully — don't skip it. Leftovers freeze very well. From Masienda.",
    ingredients: [
      { h: "Sweet potato mash", items: ["2 medium sweet potatoes (1½–2 lb), peeled and cubed", "3 garlic cloves, peeled", "¼ cup milk", "4 tbsp unsalted butter", "Salt and pepper to taste"] },
      { h: "Picadillo", items: ["1 tbsp neutral cooking oil", "1 medium onion, finely diced", "4 garlic cloves, minced", "1 lb ground beef", "2–3 chipotle chiles in adobo, finely diced", "½ tsp ground cumin", "½ tsp dried Mexican oregano", "¼ tsp ground cinnamon", "⅛ tsp ground allspice", "Kosher salt and black pepper", "1 medium carrot, diced", "1 cup beef broth", "1 tbsp masa harina", "3 Roma tomatoes, chopped", "½ cup frozen peas"] }
    ],
    steps: [
      { h: "Sweet potato mash", items: [
        "Place the cubed sweet potatoes, whole garlic cloves, and 1 tbsp salt in a pot. Cover with water and bring to a boil.",
        "Reduce to a simmer and cook ~15 min until very tender.",
        "Drain and return to the warm pot. Add the butter, milk, ½ tsp salt, and pepper.",
        "Mash until smooth — an immersion blender gives the silkiest result. Taste and adjust seasoning."
      ] },
      { h: "Picadillo", items: [
        "Heat the oil in a large oven-safe skillet over medium. Sauté the onion ~5 min until translucent. Add the garlic and cook 3 min more.",
        "Add the ground beef and cook until browned, breaking it up as it cooks.",
        "Stir in the chipotle, cumin, oregano, cinnamon, allspice, 1 tsp salt, and pepper. Fry until fragrant.",
        "Add the diced carrot. Cook 5 min, stirring occasionally.",
        "Whisk the beef broth and masa harina together into a slurry.",
        "Add the chopped tomatoes and masa slurry. Simmer 15 min until the tomatoes break down. Stir in the peas in the last minute. Taste and adjust."
      ] },
      { h: "Assemble and bake", items: [
        "Preheat the oven to 400°F.",
        "Transfer the picadillo to a 9x13 baking dish (or leave it in the oven-safe skillet). Top evenly with the sweet potato mash and spread with a spatula. Score the surface with a fork.",
        "Bake uncovered 20–25 min until bubbling.",
        "Optional: broil on high ~2 min for a browned crust.",
        "Rest 15–20 min before serving."
      ] }
    ]
  },
  {
    id: "roasted-squash-garbanzo-sopes",
    emoji: "🎃",
    name: "Roasted Squash & Garbanzo Sopes",
    cuisine: ["Mexican", "Middle Eastern"], cuisineInfluence: ["Mexican"],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Lunch", "Dinner", "Snack"],
    keyIngredients: ["Blue Corn/Masa", "Squash", "Garbanzo", "Greek Yogurt", "Onion"],
    recipeType: "Sopes", difficulty: "Medium",
    prep: 25, cook: 20, batch: 8, unit: "sopes",
    freezer: false, lowFat: false, proteinFocus: true,
    blurb: "Pinched blue-masa sopes, crisped and piled with smoky squash, garbanzos, and za'atar yogurt.",
    notes: "Shape the sopes while they're still warm — they won't hold their rim once cooled. Za'atar in the yogurt adds a nice Middle Eastern dimension.",
    ingredients: [
      { h: "Sope dough", items: ["160g blue masa harina", "240g warm water", "4g kosher salt"] },
      { h: "Topping", items: ["250g roasted squash", "240g garbanzo beans, drained", "40g red onion or scallion, finely sliced", "10g olive oil", "1 tsp cumin", "1 tsp smoked paprika", "½ tsp garlic powder", "Juice of 1 lime", "Salt and pepper to taste"] },
      { h: "Yogurt sauce (optional)", items: ["120g plain Greek yogurt", "1 tbsp lime juice", "Pinch of salt", "Herbs or za'atar to taste"] }
    ],
    steps: [
      { h: "Make the sopes", items: [
        "Mix the masa harina, salt, and warm water until a smooth dough forms.",
        "Rest 10 minutes.",
        "Divide into 8 equal balls.",
        "Flatten each to ~½ inch thick.",
        "Cook on a dry skillet over medium heat, 2–3 min per side.",
        "While still warm, pinch the edges upward to form a rim."
      ] },
      { h: "Crisp", items: ["Return the sopes to the skillet with a light oil spray and cook until the edges are golden."] },
      { h: "Filling", items: [
        "Sauté the onion in olive oil until softened.",
        "Add the garbanzo beans and spices; cook 2–3 min.",
        "Fold in the roasted squash and finish with the lime juice."
      ] },
      { h: "Assemble", items: [
        "Top each sope with the bean and squash filling.",
        "Drizzle with the yogurt sauce, scatter herbs, and add salsa if desired."
      ] }
    ]
  },
  {
    id: "lemony-mushroom-greens-jalapeno-bean-empanadas",
    emoji: "🌿",
    name: "Lemony Mushroom, Greens & Jalapeño Bean Empanadas",
    cuisine: ["Fusion"], cuisineInfluence: [],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Lunch", "Dinner", "Meal Prep"],
    keyIngredients: ["Mushroom", "Kale/Greens", "Black Beans", "Jalapeño"],
    recipeType: "Empanadas", difficulty: "Easy",
    prep: 20, cook: 25, batch: 12, unit: "empanadas",
    freezer: true, lowFat: true, proteinFocus: true,
    blurb: "Meaty mushrooms, greens, and jalapeño beans brightened with lemon, in blue-corn masa with a lime yogurt sauce.",
    notes: "The refried beans act as a binder — no need to mash. Cooking off the mushroom moisture completely is essential for texture. Citrus balances the richness.",
    ingredients: [
      { h: "Filling", items: ["1 cup (100g) mushrooms, finely chopped", "½ medium onion (75g), diced", "1½ cups (150g) broccoli, very finely chopped", "1 cup (30g) spinach, chopped", "1 cup (240g) Amy's refried beans (jalapeño)", "2 cloves garlic, minced", "Zest of ½ lemon", "Juice of ½ lemon (1–2 tbsp)", "½ tsp cumin", "½ tsp oregano or thyme", "½ tsp salt", "¼ tsp black pepper"] },
      { h: "Lime yogurt sauce", items: ["¾ cup (170g) plain Greek yogurt (0–2%)", "Juice of 1 lime (2 tbsp)", "Zest of ½ lime", "1 small garlic clove, grated", "¼ tsp salt"] },
      { h: "Dough", items: ["~3 cups fresh blue corn masa"] }
    ],
    steps: [
      { h: null, items: [
        "Heat a large pan over medium-high. Add the mushrooms (no oil) and cook 5–7 min until the liquid fully evaporates and they begin to brown.",
        "Add the onion and garlic; cook 3–4 min. Add the broccoli; cook 4–5 min until just tender.",
        "Add the spinach; wilt 1–2 min. Stir in the refried beans, cumin, oregano, salt, and pepper.",
        "Off the heat, add the lemon zest and juice. The texture should be thick and scoopable, not wet.",
        "Preheat the oven to 400°F. Divide the masa into 12 portions, press into 4–5 inch circles, add ~2 tbsp filling, fold and seal.",
        "Bake 12–15 min, flip, then 8–10 min more. Optional: broil 1–2 min for a crisp finish.",
        "For the sauce, mix all the sauce ingredients and chill 10–15 min before serving."
      ] }
    ]
  },
  {
    id: "black-bean-sweet-potato-chipotle-empanadas",
    emoji: "🫘",
    name: "Black Bean, Sweet Potato & Chipotle Empanadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian", "High Fiber"],
    meal: ["Lunch", "Dinner", "Meal Prep"],
    keyIngredients: ["Black Beans", "Sweet Potato", "Chipotle"],
    recipeType: "Empanadas", difficulty: "Easy",
    prep: 15, cook: 30, batch: 12, unit: "empanadas",
    freezer: true, lowFat: true, proteinFocus: true,
    blurb: "Sweet roasted potato and smoky chipotle black beans — the freezer-friendly weeknight empanada.",
    notes: "Sweet and smoky is the balance to chase. Mashing about a third of the mixture helps it bind without losing texture. Very freezer-friendly.",
    ingredients: [
      { h: "Filling", items: ["1 medium sweet potato (300g), small dice", "1 cup (170g) cooked black beans, drained", "2 cloves garlic, minced", "1–2 tsp chipotle in adobo, minced", "½ tsp cumin", "½ tsp smoked paprika", "½ tsp salt", "¼ tsp black pepper", "Juice of ½ lime (1 tbsp)"] },
      { h: "Dough", items: ["~3 cups fresh masa", "Optional: 1–2 tsp oil"] }
    ],
    steps: [
      { h: null, items: [
        "Preheat the oven to 425°F. Roast the sweet potato 20–25 min until tender and lightly browned.",
        "Sauté the garlic briefly. Add the black beans, spices, and chipotle. Cook 3–4 min.",
        "Add the roasted sweet potato. Lightly mash ~⅓ of the mixture for cohesion. Add the lime juice.",
        "Preheat the oven to 400°F. Assemble the empanadas and bake 12–15 min, flip, then 8–10 min more."
      ] }
    ]
  },
  {
    id: "greens-light-cotija-empanadas",
    emoji: "🧀",
    name: "Greens & Light Cotija Empanadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian"],
    meal: ["Lunch", "Snack"],
    keyIngredients: ["Kale/Greens", "Cotija"],
    recipeType: "Empanadas", difficulty: "Easy",
    prep: 10, cook: 15, batch: 12, unit: "empanadas",
    freezer: false, lowFat: false, proteinFocus: false,
    blurb: "Simple wilted greens with a light hand of cotija. Best as part of a mixed batch.",
    notes: "Use the cheese sparingly — a little goes a long way. Add lemon zest for brightness.",
    ingredients: [
      { h: "Filling", items: ["2 cups (60g) spinach or chard, chopped", "2 cloves garlic", "¼ tsp red pepper flakes", "¼ cup (30g) cotija cheese (light use)", "Pinch salt"] },
      { h: "Dough", items: ["~3 cups masa"] }
    ],
    steps: [
      { h: null, items: [
        "Lightly sauté the garlic over medium heat.",
        "Add the greens and cook until fully wilted and the moisture has cooked off completely.",
        "Cool the mixture slightly, then fold in the cotija.",
        "Bake at 400°F: 12–15 min, flip, then 8–10 min more."
      ] }
    ]
  },
  {
    id: "lentil-mushroom-picadillo-empanadas",
    emoji: "🍄",
    name: "Lentil & Mushroom Picadillo Empanadas",
    cuisine: ["Mexican"], cuisineInfluence: [],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Lunch", "Dinner", "Meal Prep"],
    keyIngredients: ["Lentils", "Mushroom", "Tomato"],
    recipeType: "Empanadas", difficulty: "Easy",
    prep: 15, cook: 25, batch: 12, unit: "empanadas",
    freezer: true, lowFat: true, proteinFocus: true,
    blurb: "A meatless picadillo — lentils, mushrooms, olives, and raisins — with a deeply savory bite.",
    notes: "The texture should resemble a thick, meaty paste — cook off any excess liquid. Great for batch cooking and freezing.",
    ingredients: [
      { h: "Filling", items: ["1 cup (200g) cooked lentils", "1 cup (100g) mushrooms, finely chopped", "½ onion (75g), diced", "2 cloves garlic", "½ cup (120g) crushed tomato", "2 tbsp chopped green olives", "1 tbsp raisins (optional)", "½ tsp cumin", "½ tsp oregano", "½ tsp salt"] },
      { h: "Dough", items: ["~3 cups masa"] }
    ],
    steps: [
      { h: null, items: [
        "Cook the mushrooms over medium-high until the moisture evaporates completely.",
        "Add the onion and garlic; cook until soft.",
        "Add the lentils, tomato, and spices. Simmer 5–8 min until thick.",
        "Add the olives and raisins. Cool slightly before filling.",
        "Bake at 400°F: 12–15 min, flip, then 8–10 min more."
      ] }
    ]
  },
  {
    id: "blue-corn-pistachio-atole",
    emoji: "🫖",
    name: "Blue Corn Pistachio Atole",
    cuisine: ["Mexican", "Latin American"], cuisineInfluence: [],
    diet: ["Vegetarian", "Gluten-Free", "Low Sat Fat"],
    meal: ["Breakfast", "Drink", "Snack"],
    keyIngredients: ["Blue Corn/Masa", "Pistachio"],
    recipeType: "Drink/Atole", difficulty: "Easy",
    prep: 5, cook: 10, batch: 3, unit: "servings",
    freezer: false, lowFat: true, proteinFocus: false,
    blurb: "A warm, spiced blue-corn and pistachio drink to start a cold morning.",
    notes: "Starting with cold water prevents clumping. A splash of goat milk adds subtle richness if you want something more substantial.",
    ingredients: [
      { h: null, items: ["30g blue masa harina", "480ml pistachio milk", "120ml water", "1 tsp vanilla", "½ tsp cinnamon", "Pinch of cardamom", "Pinch of salt", "10–15g maple syrup"] },
      { h: "Optional", items: ["60ml diluted goat milk (for extra richness)"] }
    ],
    steps: [
      { h: null, items: [
        "Whisk the masa harina with the cold water first until completely smooth and lump-free.",
        "Add the pistachio milk, vanilla, cinnamon, cardamom, salt, and maple syrup.",
        "Bring to a gentle simmer over medium-low heat.",
        "Cook 8–10 min, stirring constantly toward the end. It's ready when it lightly coats the back of a spoon."
      ] }
    ]
  },
  {
    id: "savory-blue-corn-spoonbread-cornbread",
    emoji: "🫐",
    name: "Savory Blue Corn Spoonbread-Style Cornbread",
    cuisine: ["American", "Fusion"], cuisineInfluence: ["Fusion"],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Breakfast", "Snack", "Side", "Meal Prep"],
    keyIngredients: ["Blue Corn/Masa", "Squash", "Rolled Oats", "Egg"],
    recipeType: "Cornbread", difficulty: "Easy",
    prep: 15, cook: 32, batch: 9, unit: "squares",
    freezer: true, lowFat: true, proteinFocus: false,
    blurb: "A custardy, squash-enriched cornbread that stays moist — savory with thyme.",
    notes: "Moister and healthier than classic cornbread. The custardy interior is intentional — don't overbake. Freezes well.",
    ingredients: [
      { h: null, items: ["140g blue masa harina", "80g rolled oats", "80g whole wheat flour", "250g roasted squash", "2 eggs", "360ml oat milk", "30g olive oil", "8g baking powder", "5g kosher salt", "1 tsp thyme", "Black pepper to taste"] },
      { h: "Optional", items: ["60g browned chicken sausage", "30g sharp cheddar, grated"] }
    ],
    steps: [
      { h: null, items: [
        "Heat the oven to 400°F / 205°C. Grease an 8x8 baking pan.",
        "Blend the roasted squash with the oat milk until completely smooth.",
        "Mix all the dry ingredients: masa harina, oats, flour, baking powder, salt, thyme, and pepper.",
        "Whisk the eggs and olive oil into the squash mixture.",
        "Gently fold the wet into the dry — do not overmix.",
        "Fold in any optional additions.",
        "Pour into the prepared pan and bake 28–35 min. The center should remain slightly custardy — that's intentional."
      ] }
    ]
  },
  {
    id: "sourdough-discard-chocolate-muffins",
    emoji: "🧁",
    name: "Healthy Sourdough Discard Chocolate Muffins",
    cuisine: ["American"], cuisineInfluence: [],
    diet: ["Vegetarian"],
    meal: ["Breakfast", "Snack"],
    keyIngredients: ["Sourdough Discard", "Apple Butter", "Walnut"],
    recipeType: "Muffin", difficulty: "Easy",
    prep: 10, cook: 22, batch: 12, unit: "muffins",
    freezer: true, lowFat: true, proteinFocus: false,
    blurb: "Moist, lightly sweet chocolate muffins that put sourdough discard and apple butter to work.",
    notes: "Apple butter replaces most of the oil and sugar. A pinch of espresso powder makes the chocolate taste richer.",
    ingredients: [
      { h: "Wet", items: ["227g sourdough discard", "180g apple butter (unsweetened if possible)", "2 eggs", "180g milk (2%, goat, oat, or pistachio all work)", "20g olive oil", "1 tsp vanilla extract"] },
      { h: "Dry", items: ["140g whole wheat flour", "40g rolled oats", "30g cocoa powder", "1 tsp baking powder", "½ tsp baking soda", "½ tsp salt", "1 tsp cinnamon", "Optional: ¼ tsp espresso powder or instant coffee"] },
      { h: "Optional mix-ins (choose one)", items: ["80g dark chocolate chips", "100g blueberries", "40g chopped walnuts", "1 tbsp chia or flax seeds"] }
    ],
    steps: [
      { h: null, items: [
        "Preheat the oven to 375°F (190°C). Line or grease a muffin tin.",
        "Mix the wet ingredients in a large bowl: discard, apple butter, eggs, milk, olive oil, and vanilla.",
        "In another bowl, whisk together the flour, oats, cocoa, baking powder, baking soda, salt, cinnamon, and espresso powder if using.",
        "Fold the dry into the wet until just combined. Do not overmix.",
        "Fold in any mix-ins.",
        "Fill the muffin cups about ¾ full.",
        "Bake 18–22 min, until the tops spring back lightly.",
        "Let cool 10 min before eating."
      ] }
    ]
  },
  {
    id: "high-fiber-pear-apple-oat-muffins",
    emoji: "🧁",
    name: "High-Fiber Pear Apple Oat Muffins",
    cuisine: ["American"], cuisineInfluence: [],
    diet: ["Vegetarian", "High Fiber", "Low Sat Fat"],
    meal: ["Breakfast", "Snack", "Meal Prep"],
    keyIngredients: ["Sourdough Discard", "Pear/Apple", "Rolled Oats", "Egg"],
    recipeType: "Muffin", difficulty: "Easy",
    prep: 20, cook: 20, batch: 12, unit: "muffins",
    freezer: true, lowFat: true, proteinFocus: false,
    blurb: "No added sugar — all the sweetness from ripe pear and apple. Built for meal-prep mornings.",
    notes: "No added sugar — the sweetness comes entirely from the fruit. Flavor and texture improve significantly overnight.",
    ingredients: [
      { h: null, items: ["227g sourdough starter discard (100% hydration)", "200g ripe pear, mashed", "1 medium apple (~180g), finely chopped", "1 large egg", "180g whole wheat flour", "80–110g rolled oats", "220g 2% milk", "10–15g olive oil", "8g baking powder", "3g baking soda", "8g cinnamon", "1–1.5g cardamom", "0.5g ground clove", "1g salt", "2 tsp vanilla extract"] }
    ],
    steps: [
      { h: null, items: [
        "Preheat the oven to 180°C / 350°F.",
        "Mix all the wet ingredients: starter, mashed pear, egg, milk, oil, and vanilla.",
        "Mix all the dry ingredients: flour, oats, baking powder, baking soda, spices, and salt.",
        "Gently fold the wet into the dry — do not overmix.",
        "Fold in the chopped apple.",
        "Rest the batter 10–15 min.",
        "Fill the muffin tin and bake 18–22 min until a toothpick comes out clean.",
        "Cool 5–10 min in the tin, then remove."
      ] }
    ]
  },
  {
    id: "warm-spiced-pear-apple-skillet",
    emoji: "🍐",
    name: "Warm Spiced Pear & Apple Skillet",
    cuisine: ["American"], cuisineInfluence: [],
    diet: ["Vegetarian", "Gluten-Free", "Low Sat Fat"],
    meal: ["Breakfast", "Dessert", "Snack"],
    keyIngredients: ["Pear/Apple", "Greek Yogurt"],
    recipeType: "Other", difficulty: "Easy",
    prep: 3, cook: 10, batch: 2, unit: "bowls",
    freezer: false, lowFat: true, proteinFocus: false,
    blurb: "Caramelized pears and apples with warm spice and a little thyme. Ten minutes, no added sugar.",
    notes: "Uses fruit caramelization instead of added sugar, balanced with lemon and thyme. Sweeter? Add 5–10g honey. More savory? Increase the thyme or add black pepper.",
    ingredients: [
      { h: null, items: ["300g pears (~2 medium), thinly sliced", "200g apple (~1 medium), thinly sliced", "5g butter or olive oil (~1 tsp; optional, can sub water)", "10g lemon juice (~2 tsp)", "5g vanilla extract (~1 tsp)", "2g cinnamon (~1 tsp)", "0.5g ground cardamom (~¼ tsp)", "1g salt (pinch)", "1–2g fresh thyme (~1 tsp leaves, optional)"] },
      { h: "For serving (optional)", items: ["100g plain Greek yogurt (50g per serving)"] }
    ],
    steps: [
      { h: null, items: [
        "Slice the pears and apples thinly, about 3–5 mm thick.",
        "Heat a skillet over medium. Add the butter/oil, or a splash of water for ultra low-fat.",
        "Add the fruit and a pinch of salt. Cook 5–7 min, stirring occasionally, until softened and lightly caramelized.",
        "Stir in the cinnamon, cardamom, thyme, lemon juice, and vanilla. Cook 1–2 min until fragrant and glossy.",
        "Divide into 2 bowls. Top with Greek yogurt if using."
      ] }
    ]
  }
];

window.dispatchEvent(new Event("hk-recipes-ready"));
