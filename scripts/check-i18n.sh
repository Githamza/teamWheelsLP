#!/usr/bin/env bash
# Checks for the Dutch rollout (SPEC.md, PR 2). There is no test suite, so
# this script is the test: run it before every commit on an nl branch.
#
#   1. The production build (what CI deploys, drafts excluded) is clean and
#      byte-identical to a production build of BASE_REF, except for files
#      matching ALLOW (an extended regex on paths relative to public/).
#   2. Production output carries no Dutch URL while the Dutch locales are
#      drafts.
#   3. A draft-inclusive build (-D) renders both Dutch homes with reciprocal
#      hreflang (nl-BE, nl-NL + the four existing languages + x-default → fr)
#      and lists them, with alternates, in the sitemaps.
#
# Usage: scripts/check-i18n.sh            (BASE_REF defaults to origin/main)
#        ALLOW='^(fr|en|de|es)/index\.html$' scripts/check-i18n.sh
#
# Builds land in $CHECK_DIR (default: a temp dir). The baseline build is
# cached per BASE_REF commit, so only the first run pays for it.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BASE_REF="${BASE_REF:-origin/main}"
ALLOW="${ALLOW:-^$}"
CHECK_DIR="${CHECK_DIR:-${TMPDIR:-/tmp}/teamwheels-check-i18n}"
mkdir -p "$CHECK_DIR"
# Resolve symlinks (macOS /var -> /private/var): Node's permission model
# denies reads through them when PostCSS resolves modules.
CHECK_DIR="$(cd "$CHECK_DIR" && pwd -P)"

fail=0
pass() { printf '  ok    %s\n' "$1"; }
bad()  { printf '  FAIL  %s\n' "$1"; fail=1; }

build() { # build <src dir> <dest dir> <log> [extra hugo flags]
  local src="$1" dest="$2" log="$3"; shift 3
  rm -rf "$dest"
  (cd "$src" && hugo --gc --minify --quiet --logLevel warn -d "$dest" "$@") >"$log" 2>&1
}

echo "== Baseline: production build of $BASE_REF"
base_sha="$(git -C "$ROOT" rev-parse --short "$BASE_REF")"
base_out="$CHECK_DIR/base-$base_sha"
if [ ! -f "$base_out/.done" ]; then
  wt="$CHECK_DIR/worktree-$base_sha"
  git -C "$ROOT" worktree remove --force "$wt" >/dev/null 2>&1
  git -C "$ROOT" worktree add --detach "$wt" "$BASE_REF" >/dev/null 2>&1 || { echo "cannot check out $BASE_REF"; exit 2; }
  # Hugo runs PostCSS under Node's permission model, which refuses to read
  # through a symlink that leaves the worktree: hardlink-copy instead.
  rsync -a --link-dest="$ROOT/node_modules/" "$ROOT/node_modules/" "$wt/node_modules/"
  build "$wt" "$base_out" "$CHECK_DIR/base.log" || { cat "$CHECK_DIR/base.log"; exit 2; }
  touch "$base_out/.done"
  git -C "$ROOT" worktree remove --force "$wt" >/dev/null 2>&1
fi
pass "baseline $base_sha"

echo "== 1. Production build of the working tree"
head_out="$CHECK_DIR/head"
if build "$ROOT" "$head_out" "$CHECK_DIR/head.log"; then pass "build exits 0"; else bad "build failed"; cat "$CHECK_DIR/head.log"; fi
if grep -qE 'WARN|ERROR' "$CHECK_DIR/head.log"; then bad "warnings in build log:"; grep -E 'WARN|ERROR' "$CHECK_DIR/head.log" | head -20; else pass "zero warnings"; fi

diffs="$(diff -rq -x .DS_Store -x .done "$base_out" "$head_out" 2>&1 \
  | sed -E "s#$base_out/?##g; s#$head_out/?##g" \
  | sed -E 's/^Files ([^ ]+) and [^ ]+ differ$/\1/; s/^Only in ([^:]*): (.*)$/\1\/\2 (only one side)/; s#^/##')"
# Blog posts list 3 related posts through `shuffle` (layouts/_default/single.html),
# so two builds of the same commit differ there. Ignore a file whose only
# difference is the order of those cards, or the fingerprint of a CSS/JS
# bundle (a changed bundle is still reported, as a file present on one side).
same_but_shuffled() { # same_but_shuffled <relative path>
  python3 -I - "$base_out/$1" "$head_out/$1" <<'PY'
import re, sys
card = r'<div class="col-lg-4 col-md-6 blog-card has-border"><article.*?</article></div>'
run = re.compile('(?:%s)+' % card, re.S)
def norm(path):
    try: html = open(path, encoding='utf-8').read()
    except OSError: return None
    html = re.sub(r'\.[0-9a-f]{32,128}\.(css|js)', r'.FINGERPRINT.\1', html)
    html = re.sub(r'integrity="?sha(256|384|512)-[^" >]+"?', 'integrity=SRI', html)
    return run.sub(lambda m: ''.join(sorted(re.findall(card, m.group(0), re.S))), html)
a, b = norm(sys.argv[1]), norm(sys.argv[2])
sys.exit(0 if a is not None and a == b else 1)
PY
}
unexpected="$(printf '%s\n' "$diffs" | grep -v '^$' | grep -vE "$ALLOW" \
  | while read -r f; do same_but_shuffled "$f" || echo "$f"; done)"
if [ -z "$unexpected" ]; then
  pass "output identical to $BASE_REF$( [ "$ALLOW" != '^$' ] && echo " (outside ALLOW)")"
else
  bad "output differs from $BASE_REF:"; printf '%s\n' "$unexpected" | head -30 | sed 's/^/          /'
fi

echo "== 2. No Dutch URL in production"
if [ -e "$head_out/nl-be" ] || [ -e "$head_out/nl" ]; then bad "public/nl-be or public/nl exists"; else pass "no /nl-be/ or /nl/ directory"; fi
leaks="$(grep -rlE '(teamwheelsapp\.com/|href="?/)(nl-be|nl)/' "$head_out" 2>/dev/null | head -5)"
if [ -z "$leaks" ]; then pass "no link to /nl-be/ or /nl/"; else bad "Dutch links in: $leaks"; fi
if grep -rqiE 'hreflang="?nl' "$head_out" 2>/dev/null; then bad "nl hreflang in production output"; else pass "no nl hreflang"; fi

echo "== 3. Draft build (-D): Dutch locales"
draft_out="$CHECK_DIR/draft"
if build "$ROOT" "$draft_out" "$CHECK_DIR/draft.log" -D; then pass "draft build exits 0"; else bad "draft build failed"; cat "$CHECK_DIR/draft.log"; fi

check_home() { # check_home <dir> <hreflang>
  local f="$draft_out/$1/index.html" tag="$2"
  [ -f "$f" ] || { bad "$1/index.html missing"; return; }
  grep -qE "<html[^>]* lang=\"?$tag\"?" "$f" && pass "$1: <html lang=$tag>" || bad "$1: <html lang> is not $tag"
  local want
  for want in fr en de es nl-BE nl-NL x-default; do
    grep -qE "hreflang=\"?$want\"?" "$f" || { bad "$1: missing hreflang $want"; return; }
  done
  pass "$1: hreflang fr en de es nl-BE nl-NL x-default"
  grep -qE "hreflang=\"?x-default\"? href=\"?https://www\.teamwheelsapp\.com/fr/\"?" "$f" \
    && pass "$1: x-default → /fr/" || bad "$1: x-default is not /fr/"
}
check_home nl-be nl-BE
check_home nl nl-NL

fr_home="$draft_out/fr/index.html"
if grep -qE 'hreflang="?nl-BE"? href="?https://www\.teamwheelsapp\.com/nl-be/"?' "$fr_home" \
  && grep -qE 'hreflang="?nl-NL"? href="?https://www\.teamwheelsapp\.com/nl/"?' "$fr_home"; then
  pass "fr home links back to nl-BE and nl-NL"
else
  bad "fr home does not link back to /nl-be/ and /nl/"
fi

for sm in nl-be/sitemap.xml sitemap.xml; do
  f="$draft_out/$sm"
  if [ -f "$f" ] && grep -qE 'hreflang="?nl-BE' "$f" && grep -qE 'hreflang="?nl-NL' "$f" \
     && grep -q '<loc>https://www.teamwheelsapp.com/nl-be/</loc>' "$f"; then
    pass "$sm: nl URLs with nl-BE / nl-NL alternates"
  else
    bad "$sm: missing nl URL or nl-BE / nl-NL alternates"
  fi
done

echo
if [ "$fail" -eq 0 ]; then echo "ALL CHECKS PASSED"; else echo "CHECKS FAILED"; fi
exit "$fail"
