#!/usr/bin/env node
/**
 * Builds the site's YouTube data from the channel.
 *
 *   npm run youtube:sync
 *
 * Reads scripts/youtube/topics.json (topic → video id per language), fetches
 * each video's metadata from the signed-in channel, then writes
 *   data/youtube.json                 read by layouts/partials/youtube-*.html
 *   assets/images/youtube/<id>.jpg    thumbnail, served from our own domain
 * Both are committed: the Hugo build needs no credentials and the pages make
 * no request to Google until a visitor clicks play.
 */

const fs = require('fs');
const path = require('path');
const { fetchInventory } = require('./inventory');

const ROOT = path.join(__dirname, '..', '..');
const { topics: TOPICS, fallback: FALLBACK = {} } = require('./topics.json');
const DATA_OUT = path.join(ROOT, 'data', 'youtube.json');
const THUMB_DIR = path.join(ROOT, 'assets', 'images', 'youtube');

function seconds(iso) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso) || [];
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
}

(async () => {
  const { videos } = await fetchInventory();
  const byId = new Map(videos.map((v) => [v.id, v]));
  fs.mkdirSync(THUMB_DIR, { recursive: true });
  const problems = [];
  const topics = [];

  for (const topic of TOPICS) {
    const out = { slug: topic.slug, category: topic.category, videos: {} };
    for (const [lang, id] of Object.entries(topic.videos)) {
      const v = byId.get(id);
      const where = `${topic.slug}/${lang} (${id})`;
      if (!v) { problems.push(`${where}: not on the channel`); continue; }
      if (v.status.privacyStatus === 'private') { problems.push(`${where}: private, cannot be embedded`); continue; }
      if (!v.status.embeddable) { problems.push(`${where}: embedding disabled`); continue; }

      const t = v.snippet.thumbnails;
      const thumb = t.maxres || t.standard || t.high;
      const res = await fetch(thumb.url);
      if (!res.ok) { problems.push(`${where}: thumbnail HTTP ${res.status}`); continue; }
      fs.writeFileSync(path.join(THUMB_DIR, `${id}.jpg`), Buffer.from(await res.arrayBuffer()));

      out.videos[lang] = {
        id,
        // "Feature: tagline | TeamWheels" → drop the channel suffix.
        title: v.snippet.title.replace(/\s*\|\s*TeamWheels\s*$/, ''),
        // First paragraph only: the rest is channel boilerplate and links.
        description: v.snippet.description.split(/\n\s*\n/)[0].trim(),
        duration: v.contentDetails.duration,
        duration_seconds: seconds(v.contentDetails.duration),
        published: v.snippet.publishedAt,
        privacy: v.status.privacyStatus,
        thumbnail: `images/youtube/${id}.jpg`,
      };
    }
    topics.push(out);
  }

  fs.writeFileSync(DATA_OUT, JSON.stringify({ fallback: FALLBACK, topics }, null, 2) + '\n');
  const n = topics.reduce((a, t) => a + Object.keys(t.videos).length, 0);
  console.log(`Wrote ${path.relative(ROOT, DATA_OUT)}: ${topics.length} topics, ${n} videos.`);
  if (problems.length) {
    console.error('\nSkipped:\n  ' + problems.join('\n  '));
    process.exit(1);
  }
})().catch((err) => {
  console.error('Failed:', err.errors ? JSON.stringify(err.errors) : err.message);
  process.exit(1);
});
