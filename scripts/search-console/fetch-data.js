#!/usr/bin/env node
/**
 * Google Search Console - Data Fetcher
 *
 * Fetches search performance data and saves it for analysis.
 *
 * Usage:
 *   node scripts/search-console/fetch-data.js
 *   node scripts/search-console/fetch-data.js --start 2025-09-01 --end 2025-09-30
 *   node scripts/search-console/fetch-data.js --months 3
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { getOAuth2Client } = require('./auth');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    startDate: config.DEFAULT_START_DATE,
    endDate: config.DEFAULT_END_DATE,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--start' && args[i + 1]) opts.startDate = args[++i];
    if (args[i] === '--end' && args[i + 1]) opts.endDate = args[++i];
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

async function getAuthenticatedClient() {
  const oauth2Client = await getOAuth2Client();

  if (!fs.existsSync(config.TOKEN_PATH)) {
    console.error('No authentication tokens found.');
    console.error('Run first: node scripts/search-console/auth.js');
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
  oauth2Client.setCredentials(tokens);

  // Auto-refresh tokens
  oauth2Client.on('tokens', (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
    const merged = { ...existing, ...newTokens };
    fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  return oauth2Client;
}

async function fetchSearchAnalytics(auth, { startDate, endDate, dimensions, rowLimit = 1000, dimensionFilterGroups }) {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = config.SITE_URL;

  const requestBody = {
    startDate,
    endDate,
    dimensions,
    rowLimit,
    dataState: 'all',
  };

  if (dimensionFilterGroups) {
    requestBody.dimensionFilterGroups = dimensionFilterGroups;
  }

  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody,
  });

  return response.data;
}

async function fetchAllData(auth, opts) {
  const { startDate, endDate } = opts;
  console.log(`\nFetching data for ${startDate} to ${endDate}...\n`);

  // Fetch multiple dimensions in parallel
  const [queryData, pageData, countryData, deviceData, dateData, queryPageData] = await Promise.all([
    // Top queries
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 1000,
    }).then(d => { console.log(`  Queries: ${d.rows?.length || 0} rows`); return d; }),

    // Top pages
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 500,
    }).then(d => { console.log(`  Pages: ${d.rows?.length || 0} rows`); return d; }),

    // By country
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['country'],
      rowLimit: 50,
    }).then(d => { console.log(`  Countries: ${d.rows?.length || 0} rows`); return d; }),

    // By device
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['device'],
      rowLimit: 10,
    }).then(d => { console.log(`  Devices: ${d.rows?.length || 0} rows`); return d; }),

    // By date (daily performance)
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['date'],
      rowLimit: 500,
    }).then(d => { console.log(`  Dates: ${d.rows?.length || 0} rows`); return d; }),

    // Query + Page combinations (for content gap analysis)
    fetchSearchAnalytics(auth, {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 2000,
    }).then(d => { console.log(`  Query+Page: ${d.rows?.length || 0} rows`); return d; }),
  ]);

  return {
    metadata: { startDate, endDate, fetchedAt: new Date().toISOString(), siteUrl: config.SITE_URL },
    queries: queryData,
    pages: pageData,
    countries: countryData,
    devices: deviceData,
    dates: dateData,
    queryPages: queryPageData,
  };
}

function saveData(data, opts) {
  if (!fs.existsSync(config.DATA_DIR)) {
    fs.mkdirSync(config.DATA_DIR, { recursive: true });
  }

  const filename = `gsc-data_${opts.startDate}_${opts.endDate}.json`;
  const filepath = path.join(config.DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`\nData saved to: ${filepath}`);
  return filepath;
}

function printSummary(data) {
  console.log('\n' + '='.repeat(60));
  console.log('SEARCH CONSOLE DATA SUMMARY');
  console.log('='.repeat(60));
  console.log(`Period: ${data.metadata.startDate} to ${data.metadata.endDate}`);

  // Overall metrics from date data
  if (data.dates.rows) {
    const totalClicks = data.dates.rows.reduce((sum, r) => sum + r.clicks, 0);
    const totalImpressions = data.dates.rows.reduce((sum, r) => sum + r.impressions, 0);
    const avgCtr = totalClicks / totalImpressions;
    const avgPosition = data.dates.rows.reduce((sum, r) => sum + r.position, 0) / data.dates.rows.length;

    console.log(`\nOverall Performance:`);
    console.log(`  Total Clicks:       ${totalClicks.toLocaleString()}`);
    console.log(`  Total Impressions:  ${totalImpressions.toLocaleString()}`);
    console.log(`  Average CTR:        ${(avgCtr * 100).toFixed(2)}%`);
    console.log(`  Average Position:   ${avgPosition.toFixed(1)}`);
  }

  // Top 10 queries
  if (data.queries.rows) {
    console.log(`\nTop 10 Queries by Clicks:`);
    const sorted = [...data.queries.rows].sort((a, b) => b.clicks - a.clicks);
    sorted.slice(0, 10).forEach((row, i) => {
      console.log(`  ${i + 1}. "${row.keys[0]}" - ${row.clicks} clicks, ${row.impressions} imp, pos ${row.position.toFixed(1)}`);
    });
  }

  // Top 10 pages
  if (data.pages.rows) {
    console.log(`\nTop 10 Pages by Clicks:`);
    const sorted = [...data.pages.rows].sort((a, b) => b.clicks - a.clicks);
    sorted.slice(0, 10).forEach((row, i) => {
      const pagePath = row.keys[0].replace(config.SITE_URL, '/');
      console.log(`  ${i + 1}. ${pagePath} - ${row.clicks} clicks, ${row.impressions} imp, CTR ${(row.ctr * 100).toFixed(1)}%`);
    });
  }

  // Device breakdown
  if (data.devices.rows) {
    console.log(`\nDevice Breakdown:`);
    data.devices.rows.forEach(row => {
      console.log(`  ${row.keys[0]}: ${row.clicks} clicks, ${row.impressions} imp, CTR ${(row.ctr * 100).toFixed(1)}%`);
    });
  }

  // Top countries
  if (data.countries.rows) {
    console.log(`\nTop 5 Countries:`);
    const sorted = [...data.countries.rows].sort((a, b) => b.clicks - a.clicks);
    sorted.slice(0, 5).forEach(row => {
      console.log(`  ${row.keys[0]}: ${row.clicks} clicks, ${row.impressions} imp`);
    });
  }

  console.log('\n' + '='.repeat(60));
}

async function main() {
  const opts = parseArgs();

  try {
    const auth = await getAuthenticatedClient();
    const data = await fetchAllData(auth, opts);
    const filepath = saveData(data, opts);
    printSummary(data);

    console.log(`\nNext step: node scripts/search-console/analyze.js ${filepath}`);
  } catch (err) {
    if (err.code === 401 || err.code === 403) {
      console.error('Authentication error. Re-run: node scripts/search-console/auth.js');
    } else {
      console.error('Error fetching data:', err.message);
    }
    process.exit(1);
  }
}

main();
