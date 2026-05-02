#!/usr/bin/env node
/**
 * IndexNow submitter.
 *
 * Notifies search engines (Bing, Yandex, Seznam, Naver, Yep) that URLs
 * on the site have changed via the IndexNow protocol:
 *   https://www.indexnow.org/documentation
 *
 * Usage:
 *   node scripts/indexnow/submit.js --all
 *       Submit every URL listed in the sitemap.
 *
 *   node scripts/indexnow/submit.js --urls https://www.teamwheelsapp.com/fr/blog/foo/ ...
 *       Submit a specific list of URLs.
 *
 *   node scripts/indexnow/submit.js --changed --base <git-ref>
 *       Submit URLs whose source content files changed between <git-ref>
 *       and HEAD. Falls back to --all if the ref is unavailable.
 *
 * Options:
 *   --sitemap <path-or-url>   Override sitemap location.
 *                             Default: ./public/sitemap.xml, otherwise the
 *                             live https://<host>/sitemap.xml.
 *   --dry-run                 Print the payload without sending.
 *
 * Environment:
 *   INDEXNOW_KEY              API key (required). Falls back to the value
 *                             baked into KEY_FALLBACK below.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const HOST = 'www.teamwheelsapp.com';
const KEY_FALLBACK = 'c496718c095a4114b0ddbb8cf661fed5';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 10000; // IndexNow per-request cap

function parseArgs(argv) {
  const opts = {
    mode: null, // 'all' | 'urls' | 'changed'
    urls: [],
    base: null,
    sitemap: null,
    dryRun: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') opts.mode = 'all';
    else if (a === '--changed') opts.mode = 'changed';
    else if (a === '--urls') {
      opts.mode = 'urls';
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
        opts.urls.push(argv[++i]);
      }
    } else if (a === '--base' && argv[i + 1]) opts.base = argv[++i];
    else if (a === '--sitemap' && argv[i + 1]) opts.sitemap = argv[++i];
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--help' || a === '-h') {
      console.log(fs.readFileSync(__filename, 'utf8').match(/^\/\*\*[\s\S]*?\*\//)[0]);
      process.exit(0);
    }
  }
  if (!opts.mode) opts.mode = 'changed';
  return opts;
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`GET ${url} -> ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      })
      .on('error', reject);
  });
}

async function loadSitemap(sitemapArg) {
  if (sitemapArg && /^https?:\/\//i.test(sitemapArg)) return fetchUrl(sitemapArg);
  const local = sitemapArg || path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(local)) return fs.readFileSync(local, 'utf8');
  return fetchUrl(`https://${HOST}/sitemap.xml`);
}

function extractLocs(xml) {
  const out = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

// Recursively expand a sitemap or sitemap-index into a flat URL list.
async function expandSitemap(xml, sourceHint) {
  const isIndex = /<sitemapindex[\s>]/i.test(xml);
  const locs = extractLocs(xml);
  if (!isIndex) return locs;
  const all = [];
  for (const loc of locs) {
    try {
      const child = await fetchUrl(loc);
      const inner = await expandSitemap(child, loc);
      all.push(...inner);
    } catch (e) {
      console.warn(`[indexnow] failed to fetch nested sitemap ${loc}: ${e.message}`);
    }
  }
  return all;
}

async function urlsFromSitemap(sitemapArg) {
  const xml = await loadSitemap(sitemapArg);
  const expanded = await expandSitemap(xml);
  return Array.from(new Set(expanded));
}

// Map a changed content file path to the URLs it produces.
// Hugo: content/<lang-dir>/<section>/<slug>.md  ->  /<lang>/<section>/<slug>/
// languages.toml: english=en, french=fr (default lang served at /fr/ here).
const LANG_DIR_TO_LANG = { english: 'en', french: 'fr' };

function contentPathToUrls(file) {
  const norm = file.split(path.sep).join('/');
  const m = norm.match(/^content\/([^/]+)\/(.*)$/);
  if (!m) return [];
  const lang = LANG_DIR_TO_LANG[m[1]];
  if (!lang) return [];
  let rest = m[2];
  if (!/\.(md|html)$/i.test(rest)) return [];
  rest = rest.replace(/\.(md|html)$/i, '');
  // _index.md -> section root; index.md -> bundle root
  rest = rest.replace(/(^|\/)(_index|index)$/, '$1');
  const slug = rest.replace(/\/$/, '');
  const pathPart = slug ? `/${slug}/` : '/';
  return [`https://${HOST}/${lang}${pathPart}`];
}

function changedFilesSince(baseRef) {
  try {
    const out = execSync(`git diff --name-only ${baseRef} HEAD`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return out.split('\n').filter(Boolean);
  } catch (e) {
    console.warn(`[indexnow] git diff against ${baseRef} failed: ${e.message}`);
    return null;
  }
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(JSON.stringify(body), 'utf8');
    const u = new URL(url);
    const req = https.request(
      {
        method: 'POST',
        host: u.host,
        path: u.pathname + u.search,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': data.length,
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks).toString('utf8'),
          })
        );
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const key = process.env.INDEXNOW_KEY || KEY_FALLBACK;
  if (!key) {
    console.error('[indexnow] INDEXNOW_KEY not set and no fallback baked in');
    process.exit(1);
  }
  const keyLocation = `https://${HOST}/${key}.txt`;

  let urls = [];
  if (opts.mode === 'urls') {
    urls = opts.urls;
  } else if (opts.mode === 'all') {
    urls = await urlsFromSitemap(opts.sitemap);
  } else if (opts.mode === 'changed') {
    const base = opts.base || process.env.INDEXNOW_BASE_REF || 'HEAD~1';
    const files = changedFilesSince(base);
    if (files == null) {
      console.warn('[indexnow] falling back to full sitemap submission');
      const xml = await loadSitemap(opts.sitemap);
      urls = extractUrlsFromSitemap(xml);
    } else {
      const fromContent = files
        .filter((f) => f.startsWith('content/'))
        .flatMap(contentPathToUrls);
      // If layouts/i18n/config changed, the change can affect every page —
      // submit the whole sitemap so search engines re-crawl.
      const globalChange = files.some((f) =>
        /^(layouts\/|i18n\/|config\/|hugo\.toml$|config\.toml$|themes\/)/.test(f)
      );
      if (globalChange) {
        console.log('[indexnow] global change detected, submitting full sitemap');
        urls = await urlsFromSitemap(opts.sitemap);
      } else {
        urls = Array.from(new Set(fromContent));
      }
    }
  }

  urls = urls
    .map((u) => u.trim())
    .filter((u) => /^https:\/\//i.test(u))
    .filter((u) => new URL(u).host === HOST);

  if (urls.length === 0) {
    console.log('[indexnow] no URLs to submit');
    return;
  }

  console.log(`[indexnow] submitting ${urls.length} URL(s) using key ${key.slice(0, 6)}…`);
  for (const batch of chunk(urls, BATCH_SIZE)) {
    const payload = {
      host: HOST,
      key,
      keyLocation,
      urlList: batch,
    };
    if (opts.dryRun) {
      console.log('[indexnow] DRY RUN payload:', JSON.stringify(payload, null, 2));
      continue;
    }
    const res = await postJson(ENDPOINT, payload);
    // 200 = accepted, 202 = accepted but processing later. Both are success.
    if (res.status !== 200 && res.status !== 202) {
      console.error(`[indexnow] HTTP ${res.status}: ${res.body.slice(0, 500)}`);
      process.exitCode = 1;
    } else {
      console.log(`[indexnow] HTTP ${res.status} (${batch.length} URL${batch.length === 1 ? '' : 's'})`);
    }
  }
}

main().catch((e) => {
  console.error('[indexnow] failed:', e);
  process.exit(1);
});
