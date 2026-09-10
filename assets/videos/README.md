# Demo video assets

The demo clip is declared through a `video_demo:` front-matter block on four pages
(`content/{english,french}/_index.md` and `content/{english,french}/demo.md`), which all
look for the files below. Drop your encoded demo here with these exact names, or change
the names in the front matter.

```
assets/videos/
  teamwheels-demo.mp4           # primary (H.264, smallest encode, plays everywhere)
  teamwheels-demo.webm          # alternative (VP9)
  teamwheels-demo-poster.jpg    # still frame shown before play = the video thumbnail
```

Until at least one of `.mp4` / `.webm` exists, the buttons and players are not rendered
(`$vdOn` is false) — so the page never shows a broken/empty player.

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
