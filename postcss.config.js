const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: [
    /dark/,
    /^swiper-/,
    /collapsing/,
    /show/,
    /\[aria-expanded=true\]/,
    /\[aria-expanded=false\]/,
    /^lb-/,
    /^gl/,
    /^go/,
    /^gc/,
    /^gs/,
    /^gi/,
    /^desc/,
    /^zoom/,
    /dragging/,
    /fullscreen/,
    /loaded/,
    /visible/,
    /current/,
    // classes toggled at runtime by JS (not visible to hugo_stats.json)
    /^is-/,
    /^no-anim/,
    /player/,
    /^fa/,
    /^d-/,
    /active/,
  ],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
