// recipes.js — PRODUCTION data loader (replaces the static prototype data file).
// The site's component waits for window.HK_RECIPES + a "hk-recipes-ready" event.
// This fetches the live data from the Cloud Run API (Turso-backed). If that fails,
// it falls back to the bundled seed so the page still renders.
(function () {
  fetch("/api/recipes", { headers: { accept: "application/json" } })
    .then(function (r) { if (!r.ok) throw new Error("bad status"); return r.json(); })
    .then(function (data) {
      if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
      window.HK_RECIPES = data;
      window.dispatchEvent(new Event("hk-recipes-ready"));
    })
    .catch(function () {
      // Offline / API down -> load the baked-in seed (it sets HK_RECIPES + fires the event).
      var s = document.createElement("script");
      s.src = "recipes.seed.js";
      document.head.appendChild(s);
    });
})();
