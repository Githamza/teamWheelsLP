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
    /[aria-expanded=true]/,
    /[aria-expanded=false]/,
    /dragging/,
    /loaded/,
    /visible/,
    /current/,
    /active/,
    /^modal/,
    /^fade/,
  ],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
