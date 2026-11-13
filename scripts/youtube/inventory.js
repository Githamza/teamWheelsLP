#!/usr/bin/env node
/**
 * Lists every video (public, unlisted, private) and playlist of the signed-in
 * YouTube channel. Writes scripts/youtube/data/inventory.json (git-ignored)
 * and prints a summary.
 *
 *   node scripts/youtube/inventory.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { getClient } = require('./auth');

const OUT = path.join(__dirname, 'data', 'inventory.json');

async function all(fn, params) {
  const items = [];
  let pageToken;
  do {
    const { data } = await fn({ ...params, maxResults: 50, pageToken });
    items.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return items;
}

async function fetchInventory() {
  const auth = await getClient();
  const yt = google.youtube({ version: 'v3', auth });

  const { data: ch } = await yt.channels.list({ part: 'snippet,contentDetails,statistics', mine: true });
  const channel = (ch.items || [])[0];
  if (!channel) throw new Error('No YouTube channel on this Google account.');
  const uploads = channel.contentDetails.relatedPlaylists.uploads;

  const uploadItems = await all((p) => yt.playlistItems.list(p), { part: 'contentDetails', playlistId: uploads });
  const ids = uploadItems.map((i) => i.contentDetails.videoId);
  const videos = [];
  for (let i = 0; i < ids.length; i += 50) {
    const { data } = await yt.videos.list({
      part: 'snippet,contentDetails,status,statistics,localizations',
      id: ids.slice(i, i + 50).join(','),
    });
    videos.push(...(data.items || []));
  }

  const playlists = await all((p) => yt.playlists.list(p), { part: 'snippet,status,contentDetails', mine: true });
  for (const pl of playlists) {
    const items = await all((p) => yt.playlistItems.list(p), { part: 'contentDetails', playlistId: pl.id });
    pl.videoIds = items.map((i) => i.contentDetails.videoId);
  }

  return { channel, videos, playlists };
}

module.exports = { fetchInventory };
if (require.main !== module) return;

(async () => {
  const { channel, videos, playlists } = await fetchInventory();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ channel, videos, playlists }, null, 2));

  console.log(`\nChannel: ${channel.snippet.title} (${channel.id}, ${channel.snippet.customUrl || 'no handle'})`);
  console.log(`Videos: ${videos.length} | Playlists: ${playlists.length}\n`);
  for (const v of videos) {
    const s = v.snippet;
    console.log(
      [
        v.id,
        v.status.privacyStatus + (v.status.uploadStatus !== 'processed' ? `/${v.status.uploadStatus}` : ''),
        v.contentDetails.duration,
        v.contentDetails.definition,
        `lang=${s.defaultAudioLanguage || s.defaultLanguage || '?'}`,
        s.publishedAt.slice(0, 10),
        `captions=${v.contentDetails.caption}`,
        `embeddable=${v.status.embeddable}`,
        JSON.stringify(s.title),
      ].join(' | ')
    );
    if (s.description) console.log('    ' + s.description.slice(0, 200).replace(/\s+/g, ' '));
  }
  for (const pl of playlists) {
    console.log(`\nPlaylist ${pl.id} [${pl.status.privacyStatus}] ${JSON.stringify(pl.snippet.title)}: ${pl.videoIds.join(', ')}`);
  }
  console.log(`\nSaved ${OUT}`);
})().catch((err) => {
  console.error('Failed:', err.errors ? JSON.stringify(err.errors) : err.message);
  process.exit(1);
});
