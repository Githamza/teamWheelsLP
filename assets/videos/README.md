# Demo video assets

The home page "See it in action" pop-in (configured in `content/english/_index.md` →
`video_demo:`) looks for the files below. Drop your encoded demo here with these exact
names, or change the names in the front matter.

```
assets/videos/
  teamwheels-demo.webm          # primary (best compression)
  teamwheels-demo.mp4           # fallback (Safari / older browsers)
  teamwheels-demo-poster.jpg    # optional still frame shown before play
```

Until at least one of `.webm` / `.mp4` exists, the buttons and modal are not rendered
(`$vdOn` is false) — so the page never shows a broken/empty player.

## Encode from your source recording (ffmpeg)

```bash
# WebM (VP9) — primary
ffmpeg -i demo-source.mov -c:v libvpx-vp9 -b:v 0 -crf 33 -an \
  -vf "scale=1280:-2" assets/videos/teamwheels-demo.webm

# MP4 (H.264) — fallback; +faststart lets it start before fully downloaded
ffmpeg -i demo-source.mov -c:v libx264 -crf 28 -an -movflags +faststart \
  -vf "scale=1280:-2" assets/videos/teamwheels-demo.mp4

# Poster / video thumbnail — grab a REPRESENTATIVE, settled frame.
# The opening seconds aren't meaningful, so pull a frame from mid-clip
# (the current poster is the TeamWheels home screen at ~25s). Pick a
# moment where the UI is static, not mid-animation, so text stays sharp.
ffmpeg -i demo-source.mov -ss 00:00:25 -frames:v 1 -q:v 2 \
  assets/videos/teamwheels-demo-poster.jpg
```

Notes:
- `-an` strips audio. The demo currently autoplays in the modal; keep audio if the
  clip has narration and you want sound on click (the modal has `controls`).
- Target each file under ~3-5 MB. Lower the resolution (`scale=960:-2`) or raise `-crf`
  if larger.
- The video bytes are fetched **only when a visitor clicks the button** — zero impact
  on initial page load.
