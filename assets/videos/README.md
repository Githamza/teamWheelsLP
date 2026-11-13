# Demo video assets

Two clips, each with its own watch page:

| Clip | Files | Homepage placement | Watch page |
|---|---|---|---|
| Launch video (20 s, EN + FR) | `teamwheels-launch-{en,fr}.mp4` + `-poster.jpg` | hero carousel (`launch_video:` block) — slide 1 is the animated `banner.image` SVG, slide 2 the clip (muted autoplay after 3 s, created by JS) | `/{en,fr}/launch-video/` (`content/*/launch-video.md`) |
| Full demo (65 s, one per language) | `teamwheels-demo-{fr,en,de,es,nl,nl-be}.*` | section under the hero (`video_demo:` block) | `/{en,fr}/demo/` |

The launch `-poster.jpg` files are a 1280×720 raster render of the banner SVG (Google does
not accept SVG thumbnails); regenerate them if the SVG changes. The launch MP4s were only
remuxed with `-movflags +faststart` (audio kept).

The demo clip is declared through a `video_demo:` front-matter block on each language's
homepage (`content/*/_index.md`) and on the `/demo/` watch pages (fr, en, de, es). Each
language points at its own files:

```
assets/videos/
  teamwheels-demo-<lang>.mp4         # primary (H.264 + AAC, 1080p, +faststart)
  teamwheels-demo-<lang>.webm        # alternative (VP9 + Opus)
  teamwheels-demo-<lang>-poster.jpg  # frame at 29.4 s = the video thumbnail
```

`<lang>` is fr, en, de, es, nl or nl-be. The source is the HyperFrames project in
`../teamwheels-demo-motion/video` (on-screen strings per language in `assets/copy.js`);
render with `npx hyperframes render --quality delivery --variables '{"lang":"<lang>"}'
-o renders/teamwheels-demo-<lang>.mp4`, then encode as below.

## Watch page vs. supporting embeds (Google video indexing)

Google only indexes a video from its **watch page** — a page whose main content is the
video — and reports "Video isn't on a watch page" for every other URL where it finds it.
So:

- `/fr/demo/` and `/en/demo/` (`layouts/_default/demo.html`) are the watch pages: a real
  `<video>` right under the H1, above the fold, plus the `VideoObject` JSON-LD
  (`layouts/partials/seo/schema.html`) and the video-sitemap entry
  (`layouts/partials/seo/sitemap-video.html`). Both partials only emit when the page's
  `video_demo.watch_page` resolves to the page itself.
- The homepages embed the same clip as supporting content only: a click-to-play poster
  that creates the `<video>` element on the first click, and a link to the watch page.
  No `<video>` in the HTML, no structured data, no sitemap entry.

## Encode from your source recording (ffmpeg)

```bash
# MP4 (H.264) — primary; +faststart lets it start before fully downloaded
ffmpeg -i demo-source.mov -c:v libx264 -crf 28 -an -movflags +faststart \
  -vf "scale=1280:-2" assets/videos/teamwheels-demo.mp4

# WebM (VP9) — alternative
ffmpeg -i demo-source.mov -c:v libvpx-vp9 -b:v 0 -crf 33 -an \
  -vf "scale=1280:-2" assets/videos/teamwheels-demo.webm

# Poster / video thumbnail — grab a REPRESENTATIVE, settled frame.
# The opening seconds aren't meaningful, so pull a frame from mid-clip
# (the current poster is the TeamWheels home screen at ~25s). Pick a
# moment where the UI is static, not mid-animation, so text stays sharp.
ffmpeg -i demo-source.mov -ss 00:00:25 -frames:v 1 -q:v 2 \
  assets/videos/teamwheels-demo-poster.jpg
```

Notes:
- `-an` strips audio. The demo currently autoplays muted in the modal; keep audio if the
  clip has narration and you want sound on click (the players have `controls`).
- Target each file under ~3-5 MB. Lower the resolution (`scale=960:-2`) or raise `-crf`
  if larger. (The current WebM is ~2.5× the size of the MP4, hence MP4 first.)
- On the homepage the video bytes are fetched **only when a visitor clicks play** — zero
  impact on initial page load. The watch page uses `preload="metadata"`.

## Embedding the launch video elsewhere (internal links)

Use the `launch-video` shortcode in any page's Markdown (optional `placement="…"` for the
GA4 `placement` param). It renders the same click-to-play facade as the hero plus a link to
`/launch-video/`, reading its settings from the homepage `launch_video:` block of the page's
language. Currently used on `/demo/` and in 10 product-related blog posts (5 EN, 5 FR), each
preceded by a sentence with a text link to the watch page. The shortcode is stripped from
the Markdown-for-agents output (`layouts/partials/agent/page.md`).

## YouTube clips (features + install walkthrough)

The short feature clips and the "install in Teams" walkthrough live on the YouTube
channel `@teamwheelsapp`, not in this folder. The site embeds them click-to-play: our own
thumbnail first, and a `youtube-nocookie.com` iframe created on the click (same facade and
script as above), so a page makes no request to Google until a visitor presses play.

- `scripts/youtube/topics.json` maps each topic (`install`, `route-matching`, …) to one
  video id per language. A language without an id plays the one named in `fallback`
  (nl and nl-be → the English clips, with an "Engelstalig" play label), or shows nothing
  (de today).
- `npm run youtube:sync` signs in to the channel (read-only; `scripts/youtube/client_secret.json`
  and `tokens.json` are git-ignored), then writes `data/youtube.json` (title, description,
  duration) and the thumbnails in `assets/images/youtube/`. Both are committed, so the
  build and CI need no credentials. Re-run it after adding a video or editing a title on
  YouTube. `node scripts/youtube/inventory.js` lists everything on the channel.
- In a layout: `partials/youtube-section.html` with a front-matter block (`install_video:`
  and `feature_videos:` on `/how-it-works/`). In Markdown: the `youtube-video` shortcode
  with `topic="install"` (used on `/support/`).
- These are supporting embeds: no `VideoObject`, no video-sitemap entry.
