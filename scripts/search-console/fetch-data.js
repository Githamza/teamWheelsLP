#!/usr/bin/env node
/**
 * Google Search Console - Deep Data Fetcher
 *
 * Fetches a comprehensive snapshot of Search Console data for analysis:
 *   - Current period query/page/country/device/date breakdowns
 *   - Previous period (same length, immediately before) for comparison
 *   - 52-week daily trend
 *   - searchAppearance (rich results coverage)
 *   - Per-country query drilldowns (USA, FRA, GBR, AUS, CAN)
 *   - Sitemaps list + health (submitted / warnings / errors / last download)
 *   - Sitemap URL extraction (parses live sitemap.xml)
 *   - URL Inspection for EVERY URL in the sitemap (indexation status,
 *     canonical, last crawl, mobile usability, rich results)
 *
 * Usage:
 *   node scripts/search-console/fetch-data.js
 *   node scripts/search-console/fetch-data.js --start 2026-01-01 --end 2026-03-31
 *   node scripts/search-console/fetch-data.js --light          (skip URL inspection)
 *   node scripts/search-console/fetch-data.js --key-urls-only  (inspect only KEY_URLS, skip sitemap crawl)
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');
const config = require('./config');
const { getOAuth2Client } = require('./auth');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    startDate: config.DEFAULT_START_DATE,
    endDate: config.DEFAULT_END_DATE,
    light: false,
    keyUrlsOnly: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--start' && args[i + 1]) opts.startDate = args[++i];
    if (args[i] === '--end' && args[i + 1]) opts.endDate = args[++i];
    if (args[i] === '--light') opts.light = true;
    if (args[i] === '--key-urls-only') opts.keyUrlsOnly = true;
    if (args[i] === '--months' && args[i + 1]) {
      const months = parseInt(args[++i], 10);
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - months);
      opts.startDate = start.toISOString().split('T')[0];
      opts.endDate = end.toISOString().split('T')[0];
    }
  }
  return opts;
}

function daysBetween(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e - s) / (1000 * 60 * 60 * 24));
}

function shiftDate(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

async function getAuthenticatedClient() {
  const oauth2Client = await getOAuth2Client();

  if (!fs.existsSync(config.TOKEN_PATH)) {
    console.error('No authentication tokens found.');
    console.error('Run first: node scripts/search-console/auth-manual.js');
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
  oauth2Client.setCredentials(tokens);

  oauth2Client.on('tokens', (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
    const merged = { ...existing, ...newTokens };
    fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  return oauth2Client;
}

// ---------------------------------------------------------------------------
// Search Analytics
// ---------------------------------------------------------------------------

async function fetchSearchAnalytics(auth, params) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const requestBody = { dataState: 'all', ...params };
  const response = await searchconsole.searchanalytics.query({
    siteUrl: config.SITE_URL,
    requestBody,
  });
  return response.data;
}

async function fetchPeriodBundle(auth, startDate, endDate, label) {
  console.log(`\nFetching ${label} (${startDate} → ${endDate})...`);

  const [queries, pages, countries, devices, dates, queryPages] = await Promise.all([
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['query'], rowLimit: 1000 }),
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['page'], rowLimit: 500 }),
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['country'], rowLimit: 50 }),
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['device'], rowLimit: 10 }),
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['date'], rowLimit: 500 }),
    fetchSearchAnalytics(auth, { startDate, endDate, dimensions: ['query', 'page'], rowLimit: 2000 }),
  ]);

  console.log(`  queries=${queries.rows?.length || 0}, pages=${pages.rows?.length || 0}, queryPages=${queryPages.rows?.length || 0}`);

  return { metadata: { startDate, endDate, label }, queries, pages, countries, devices, dates, queryPages };
}

async function fetchSearchAppearance(auth, startDate, endDate) {
  console.log('\nFetching search appearance (rich results coverage)...');
  try {
    // First get the aggregate
    const overall = await fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['searchAppearance'],
      rowLimit: 50,
    });

    // Then per searchAppearance, get the pages (to see which pages get which features)
    const byPage = {};
    if (overall.rows && overall.rows.length > 0) {
      for (const row of overall.rows) {
        const appearance = row.keys[0];
        try {
          const pageData = await fetchSearchAnalytics(auth, {
            startDate,
            endDate,
            dimensions: ['page'],
            dimensionFilterGroups: [
              {
                filters: [
                  { dimension: 'searchAppearance', operator: 'equals', expression: appearance },
                ],
              },
            ],
            rowLimit: 20,
          });
          byPage[appearance] = pageData.rows || [];
        } catch (err) {
          byPage[appearance] = { error: err.message };
        }
      }
    }
    console.log(`  appearance types: ${overall.rows?.length || 0}`);
    return { overall, byPage };
  } catch (err) {
    console.log(`  (searchAppearance not available: ${err.message})`);
    return { error: err.message };
  }
}

async function fetchCountryDrilldowns(auth, startDate, endDate) {
  console.log('\nFetching per-country query drilldowns...');
  const result = {};
  for (const country of config.COUNTRY_DRILLDOWNS) {
    try {
      const data = await fetchSearchAnalytics(auth, {
        startDate,
        endDate,
        dimensions: ['query'],
        dimensionFilterGroups: [
          { filters: [{ dimension: 'country', operator: 'equals', expression: country }] },
        ],
        rowLimit: 200,
      });
      result[country] = data;
      console.log(`  ${country}: ${data.rows?.length || 0} queries`);
    } catch (err) {
      result[country] = { error: err.message };
      console.log(`  ${country}: error — ${err.message}`);
    }
  }
  return result;
}

async function fetchDeviceQueryBreakdown(auth, startDate, endDate) {
  console.log('\nFetching device × query breakdown...');
  try {
    const data = await fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['query', 'device'],
      rowLimit: 2000,
    });
    console.log(`  ${data.rows?.length || 0} rows`);
    return data;
  } catch (err) {
    return { error: err.message };
  }
}

async function fetch12MonthTrend(auth, endDate) {
  console.log('\nFetching 12-month daily trend...');
  const startDate = shiftDate(endDate, -365);
  try {
    const data = await fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['date'],
      rowLimit: 500,
    });
    console.log(`  ${data.rows?.length || 0} daily data points`);
    return { metadata: { startDate, endDate }, data };
  } catch (err) {
    return { error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Sitemap URL extraction (parses live sitemap.xml)
// ---------------------------------------------------------------------------

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'TeamWheels-GSC-Fetcher/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(httpGet(new URL(res.headers.location, url).toString()));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }

        const chunks = [];
        let stream = res;
        const enc = res.headers['content-encoding'];
        if (enc === 'gzip') stream = res.pipe(zlib.createGunzip());
        else if (enc === 'deflate') stream = res.pipe(zlib.createInflate());
        else if (enc === 'br') stream = res.pipe(zlib.createBrotliDecompress());

        stream.on('data', (c) => chunks.push(c));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error', reject);
      })
      .on('error', reject);
  });
}

function extractLocs(xml) {
  // Minimal XML parsing: extract <loc>...</loc> values
  const out = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

async function discoverSitemapUrls(rootSitemapUrl) {
  console.log(`\nDiscovering URLs from sitemap: ${rootSitemapUrl}`);
  const seen = new Set();
  const urls = new Set();
  const queue = [rootSitemapUrl];

  while (queue.length > 0) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);

    try {
      const xml = await httpGet(sm);
      const locs = extractLocs(xml);
      const isIndex = /<sitemapindex/i.test(xml);

      if (isIndex) {
        // It's a sitemap index — queue children
        locs.forEach((loc) => queue.push(loc));
        console.log(`  sitemap index ${sm}: ${locs.length} child sitemap(s)`);
      } else {
        locs.forEach((loc) => urls.add(loc));
        console.log(`  sitemap ${sm}: ${locs.length} URL(s)`);
      }
    } catch (err) {
      console.log(`  ERROR fetching ${sm}: ${err.message}`);
    }
  }

  const urlList = Array.from(urls);
  console.log(`  total unique URLs discovered: ${urlList.length}`);
  return urlList;
}

// ---------------------------------------------------------------------------
// URL Inspection API
// ---------------------------------------------------------------------------

async function inspectUrl(auth, inspectionUrl) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const response = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl,
      siteUrl: config.SITE_URL,
    },
  });
  return response.data.inspectionResult;
}

async function fetchUrlInspections(auth, urls, label = 'pages') {
  console.log(`\nFetching URL inspections for ${urls.length} ${label}...`);
  const results = {};
  let done = 0;
  const start = Date.now();

  for (const url of urls) {
    const shortUrl = url.replace(config.SITE_URL.replace(/\/$/, ''), '') || '/';
    done++;
    process.stdout.write(`  [${done}/${urls.length}] ${shortUrl.slice(0, 60)} ... `);
    try {
      const data = await inspectUrl(auth, url);
      results[url] = data;
      const verdict = data?.indexStatusResult?.verdict || '?';
      const coverage = data?.indexStatusResult?.coverageState || '?';
      console.log(`${verdict} (${coverage.slice(0, 40)})`);
    } catch (err) {
      results[url] = { error: err.message };
      console.log(`ERROR`);
    }
    // Rate limit: URL Inspection has ~2000 req/day quota, ~60/min
    await new Promise((r) => setTimeout(r, 700));
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(0);
  console.log(`  done in ${elapsed}s`);
  return results;
}

function buildIndexationReport(inspections) {
  const buckets = {
    indexed: [],
    crawledNotIndexed: [],
    discoveredNotIndexed: [],
    duplicate: [],
    noindex: [],
    blocked: [],
    error: [],
    other: [],
  };

  for (const [url, result] of Object.entries(inspections)) {
    if (!result || result.error) {
      buckets.error.push({ url, reason: result?.error || 'unknown' });
      continue;
    }
    const coverage = (result.indexStatusResult?.coverageState || '').toLowerCase();
    const entry = {
      url,
      coverage: result.indexStatusResult?.coverageState,
      verdict: result.indexStatusResult?.verdict,
      lastCrawlTime: result.indexStatusResult?.lastCrawlTime,
      googleCanonical: result.indexStatusResult?.googleCanonical,
      userCanonical: result.indexStatusResult?.userCanonical,
      canonicalMismatch:
        result.indexStatusResult?.googleCanonical &&
        result.indexStatusResult?.userCanonical &&
        result.indexStatusResult.googleCanonical !== result.indexStatusResult.userCanonical,
    };

    if (coverage.includes('submitted and indexed') || coverage.includes('indexed, not submitted')) {
      buckets.indexed.push(entry);
    } else if (coverage.includes('crawled - currently not indexed')) {
      buckets.crawledNotIndexed.push(entry);
    } else if (coverage.includes('discovered - currently not indexed')) {
      buckets.discoveredNotIndexed.push(entry);
    } else if (coverage.includes('duplicate')) {
      buckets.duplicate.push(entry);
    } else if (coverage.includes('noindex')) {
      buckets.noindex.push(entry);
    } else if (coverage.includes('blocked')) {
      buckets.blocked.push(entry);
    } else {
      buckets.other.push(entry);
    }
  }

  return {
    counts: {
      indexed: buckets.indexed.length,
      crawledNotIndexed: buckets.crawledNotIndexed.length,
      discoveredNotIndexed: buckets.discoveredNotIndexed.length,
      duplicate: buckets.duplicate.length,
      noindex: buckets.noindex.length,
      blocked: buckets.blocked.length,
      error: buckets.error.length,
      other: buckets.other.length,
      total: Object.values(buckets).reduce((a, b) => a + b.length, 0),
    },
    buckets,
  };
}

// ---------------------------------------------------------------------------
// Sitemaps API
// ---------------------------------------------------------------------------

async function fetchSitemaps(auth) {
  console.log('\nFetching sitemaps status...');
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  try {
    const listRes = await searchconsole.sitemaps.list({ siteUrl: config.SITE_URL });
    const sitemaps = listRes.data.sitemap || [];
    console.log(`  found ${sitemaps.length} sitemap(s)`);

    const details = {};
    for (const sm of sitemaps) {
      try {
        const detailRes = await searchconsole.sitemaps.get({
          siteUrl: config.SITE_URL,
          feedpath: sm.path,
        });
        details[sm.path] = detailRes.data;
        const submitted = detailRes.data.contents?.reduce((sum, c) => sum + parseInt(c.submitted || 0, 10), 0) || 0;
        const indexed = detailRes.data.contents?.reduce((sum, c) => sum + parseInt(c.indexed || 0, 10), 0) || 0;
        console.log(`  ${sm.path}: ${submitted} submitted, ${indexed} indexed`);
      } catch (err) {
        details[sm.path] = { error: err.message };
      }
    }

    return { list: sitemaps, details };
  } catch (err) {
    return { error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function fetchAllData(auth, opts) {
  const { startDate, endDate } = opts;
  const periodLength = daysBetween(startDate, endDate);
  const prevEnd = shiftDate(startDate, -1);
  const prevStart = shiftDate(prevEnd, -periodLength);

  // Current period - comprehensive
  const current = await fetchPeriodBundle(auth, startDate, endDate, 'current');

  // Previous period - same length, immediately before (for period comparison)
  const previous = await fetchPeriodBundle(auth, prevStart, prevEnd, 'previous');

  // 12-month trend
  const yearlyTrend = await fetch12MonthTrend(auth, endDate);

  // Search appearance
  const searchAppearance = await fetchSearchAppearance(auth, startDate, endDate);

  // Country drilldowns
  const countryDrilldowns = await fetchCountryDrilldowns(auth, startDate, endDate);

  // Device × query
  const deviceQueries = await fetchDeviceQueryBreakdown(auth, startDate, endDate);

  // Sitemaps (GSC-registered)
  const sitemaps = await fetchSitemaps(auth);

  // Discover URLs from the live sitemap (parses sitemap.xml + any sub-sitemaps)
  let sitemapUrls = [];
  if (!opts.light && !opts.keyUrlsOnly) {
    try {
      const rootSitemap = config.SITE_URL.replace(/\/$/, '') + '/sitemap.xml';
      sitemapUrls = await discoverSitemapUrls(rootSitemap);
    } catch (err) {
      console.log(`  could not discover sitemap URLs: ${err.message}`);
    }
  }

  // URL Inspection: inspect either KEY_URLS only, or KEY_URLS + all sitemap URLs
  let urlsToInspect = [];
  if (opts.light) {
    console.log('\n(--light mode: skipping URL inspection)');
  } else if (opts.keyUrlsOnly) {
    urlsToInspect = config.KEY_URLS;
  } else {
    const set = new Set([...config.KEY_URLS, ...sitemapUrls]);
    urlsToInspect = Array.from(set);
  }

  const urlInspections = opts.light
    ? { skipped: true }
    : await fetchUrlInspections(auth, urlsToInspect, 'URLs');

  // Build indexation coverage report from inspection data
  const indexationReport = opts.light ? null : buildIndexationReport(urlInspections);

  return {
    metadata: {
      siteUrl: config.SITE_URL,
      current: { startDate, endDate },
      previous: { startDate: prevStart, endDate: prevEnd },
      periodLengthDays: periodLength,
      fetchedAt: new Date().toISOString(),
      light: opts.light,
      keyUrlsOnly: opts.keyUrlsOnly,
      sitemapUrlCount: sitemapUrls.length,
      inspectedUrlCount: urlsToInspect.length,
    },
    current,
    previous,
    yearlyTrend,
    searchAppearance,
    countryDrilldowns,
    deviceQueries,
    sitemaps,
    sitemapUrls,
    urlInspections,
    indexationReport,
  };
}

function saveData(data, opts) {
  if (!fs.existsSync(config.DATA_DIR)) {
    fs.mkdirSync(config.DATA_DIR, { recursive: true });
  }

  const filename = `gsc-deep_${opts.startDate}_${opts.endDate}.json`;
  const filepath = path.join(config.DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  const stats = fs.statSync(filepath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`\nData saved to: ${filepath} (${sizeKB} KB)`);
  return filepath;
}

function printSummary(data) {
  const sep = '='.repeat(70);
  console.log('\n' + sep);
  console.log('  SEARCH CONSOLE DEEP FETCH SUMMARY');
  console.log(sep);

  const cur = data.current;
  const prev = data.previous;

  function agg(periodData) {
    if (!periodData.dates?.rows) return { clicks: 0, impressions: 0 };
    return periodData.dates.rows.reduce(
      (acc, r) => ({ clicks: acc.clicks + r.clicks, impressions: acc.impressions + r.impressions }),
      { clicks: 0, impressions: 0 }
    );
  }

  const curTotals = agg(cur);
  const prevTotals = agg(prev);

  console.log(`\nCurrent  (${cur.metadata.startDate} → ${cur.metadata.endDate}):`);
  console.log(`  ${curTotals.clicks} clicks / ${curTotals.impressions} impressions`);
  console.log(`Previous (${prev.metadata.startDate} → ${prev.metadata.endDate}):`);
  console.log(`  ${prevTotals.clicks} clicks / ${prevTotals.impressions} impressions`);

  const clickDelta = curTotals.clicks - prevTotals.clicks;
  const impDelta = curTotals.impressions - prevTotals.impressions;
  const clickPct = prevTotals.clicks ? ((clickDelta / prevTotals.clicks) * 100).toFixed(1) : 'N/A';
  const impPct = prevTotals.impressions ? ((impDelta / prevTotals.impressions) * 100).toFixed(1) : 'N/A';

  console.log(`Delta:`);
  console.log(`  Clicks: ${clickDelta >= 0 ? '+' : ''}${clickDelta} (${clickPct}%)`);
  console.log(`  Impressions: ${impDelta >= 0 ? '+' : ''}${impDelta} (${impPct}%)`);

  // Rich results
  if (data.searchAppearance?.overall?.rows?.length) {
    console.log(`\nRich results appearances:`);
    data.searchAppearance.overall.rows.forEach((row) => {
      console.log(`  ${row.keys[0]}: ${row.clicks} clicks, ${row.impressions} imp`);
    });
  } else {
    console.log(`\nRich results: NONE detected (structured data not being picked up or eligible)`);
  }

  // Sitemaps
  if (data.sitemaps?.list?.length) {
    console.log(`\nSitemaps (registered in Search Console):`);
    data.sitemaps.list.forEach((sm) => {
      const detail = data.sitemaps.details[sm.path];
      const submitted =
        detail?.contents?.reduce((s, c) => s + parseInt(c.submitted || 0, 10), 0) || 0;
      console.log(
        `  ${sm.path}`
      );
      console.log(
        `    submitted=${submitted}, warnings=${detail?.warnings || 0}, errors=${detail?.errors || 0}, lastDownloaded=${detail?.lastDownloaded || 'never'}`
      );
    });
  }

  if (data.sitemapUrls?.length) {
    console.log(`\nURLs discovered in sitemap.xml: ${data.sitemapUrls.length}`);
  }

  // Indexation coverage report
  if (data.indexationReport) {
    const r = data.indexationReport;
    console.log(`\nIndexation coverage (inspected ${r.counts.total} URLs):`);
    console.log(`  indexed:                  ${r.counts.indexed}`);
    console.log(`  crawled - not indexed:    ${r.counts.crawledNotIndexed}`);
    console.log(`  discovered - not indexed: ${r.counts.discoveredNotIndexed}`);
    console.log(`  duplicate:                ${r.counts.duplicate}`);
    console.log(`  noindex:                  ${r.counts.noindex}`);
    console.log(`  blocked:                  ${r.counts.blocked}`);
    console.log(`  other:                    ${r.counts.other}`);
    console.log(`  error:                    ${r.counts.error}`);

    const indexedRate = r.counts.total ? ((r.counts.indexed / r.counts.total) * 100).toFixed(1) : 0;
    console.log(`  → indexation rate:        ${indexedRate}%`);

    // Show non-indexed URLs (the actual problems)
    const problems = [
      ...r.buckets.crawledNotIndexed,
      ...r.buckets.discoveredNotIndexed,
      ...r.buckets.duplicate,
    ];
    if (problems.length) {
      console.log(`\n  Problematic URLs (not indexed but not intentional):`);
      problems.slice(0, 20).forEach((p) => {
        const shortUrl = p.url.replace(config.SITE_URL.replace(/\/$/, ''), '') || '/';
        console.log(`    ${shortUrl}`);
        console.log(`      → ${p.coverage}`);
      });
      if (problems.length > 20) console.log(`    ... and ${problems.length - 20} more`);
    }

    // Canonical mismatches
    const canonMismatches = [
      ...r.buckets.indexed,
      ...r.buckets.duplicate,
      ...r.buckets.other,
    ].filter((e) => e.canonicalMismatch);
    if (canonMismatches.length) {
      console.log(`\n  Canonical mismatches (Google picked a different canonical):`);
      canonMismatches.slice(0, 10).forEach((e) => {
        const shortUrl = e.url.replace(config.SITE_URL.replace(/\/$/, ''), '') || '/';
        console.log(`    ${shortUrl}`);
        console.log(`      user:   ${e.userCanonical}`);
        console.log(`      google: ${e.googleCanonical}`);
      });
    }
  }

  console.log('\n' + sep);
}

async function main() {
  const opts = parseArgs();

  try {
    const auth = await getAuthenticatedClient();
    const data = await fetchAllData(auth, opts);
    const filepath = saveData(data, opts);
    printSummary(data);

    console.log(`\n✓ Deep fetch complete.`);
    console.log(`\nPaste the contents of ${filepath} in your chat with Claude.`);
  } catch (err) {
    if (err.code === 401 || err.code === 403) {
      console.error('\nAuthentication error. Re-run: node scripts/search-console/auth-manual.js');
    } else {
      console.error('\nError:', err.message);
      if (err.stack) console.error(err.stack);
    }
    process.exit(1);
  }
}

main();
