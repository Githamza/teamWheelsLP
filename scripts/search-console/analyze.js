#!/usr/bin/env node
/**
 * Google Search Console - SEO Analysis & Improvement Generator
 *
 * Analyzes fetched GSC data and generates actionable SEO improvements.
 *
 * Usage:
 *   node scripts/search-console/analyze.js [path-to-data.json]
 *   node scripts/search-console/analyze.js   (uses most recent data file)
 */

const fs = require('fs');
const path = require('path');
const config = require('./config');

function loadData(filepath) {
  if (filepath && fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }

  // Find most recent data file
  if (!fs.existsSync(config.DATA_DIR)) {
    console.error('No data directory found. Run fetch-data.js first.');
    process.exit(1);
  }

  const files = fs.readdirSync(config.DATA_DIR)
    .filter(f => f.startsWith('gsc-data_') && f.endsWith('.json'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.error('No data files found. Run fetch-data.js first.');
    process.exit(1);
  }

  const file = path.join(config.DATA_DIR, files[0]);
  console.log(`Using data file: ${file}\n`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function analyzeQuickWins(data) {
  // Find queries with high impressions but low CTR (opportunity keywords)
  const opportunities = [];

  if (data.queries.rows) {
    data.queries.rows.forEach(row => {
      const query = row.keys[0];
      const { clicks, impressions, ctr, position } = row;

      // High impressions, low CTR = title/description needs improvement
      if (impressions > 50 && ctr < 0.03 && position < 20) {
        opportunities.push({
          type: 'low_ctr',
          query,
          clicks,
          impressions,
          ctr,
          position,
          priority: impressions * (0.05 - ctr), // potential gain
          suggestion: `Query "${query}" has ${impressions} impressions but only ${(ctr * 100).toFixed(1)}% CTR at position ${position.toFixed(1)}. Improve title tag and meta description to increase CTR.`,
        });
      }

      // Position 4-20 = can be pushed to top 3 with optimization
      if (position >= 4 && position <= 20 && impressions > 20) {
        opportunities.push({
          type: 'ranking_opportunity',
          query,
          clicks,
          impressions,
          ctr,
          position,
          priority: impressions / position,
          suggestion: `Query "${query}" ranks at position ${position.toFixed(1)} with ${impressions} impressions. Optimize content to push into top 3.`,
        });
      }

      // Position 1-3 with low CTR = featured snippet or title issue
      if (position <= 3 && ctr < 0.1 && impressions > 20) {
        opportunities.push({
          type: 'top_position_low_ctr',
          query,
          clicks,
          impressions,
          ctr,
          position,
          priority: impressions * 0.1,
          suggestion: `Query "${query}" is in position ${position.toFixed(1)} but CTR is only ${(ctr * 100).toFixed(1)}%. May be losing clicks to featured snippets. Add structured data or optimize title.`,
        });
      }
    });
  }

  return opportunities.sort((a, b) => b.priority - a.priority);
}

function analyzeContentGaps(data) {
  const gaps = [];

  if (data.queryPages.rows) {
    // Group queries by page
    const pageQueries = {};
    data.queryPages.rows.forEach(row => {
      const [query, page] = row.keys;
      if (!pageQueries[page]) pageQueries[page] = [];
      pageQueries[page].push({ query, ...row });
    });

    // Find pages ranking for many diverse queries (content consolidation opportunity)
    Object.entries(pageQueries).forEach(([page, queries]) => {
      if (queries.length > 10) {
        const totalImpressions = queries.reduce((s, q) => s + q.impressions, 0);
        gaps.push({
          type: 'content_hub',
          page: page.replace(config.SITE_URL, '/'),
          queryCount: queries.length,
          totalImpressions,
          topQueries: queries.sort((a, b) => b.impressions - a.impressions).slice(0, 5).map(q => q.query),
          suggestion: `Page "${page.replace(config.SITE_URL, '/')}" ranks for ${queries.length} queries. Consider creating dedicated sub-pages for top query clusters.`,
        });
      }
    });

    // Find queries appearing on multiple pages (cannibalization)
    const queryPages2 = {};
    data.queryPages.rows.forEach(row => {
      const [query, page] = row.keys;
      if (!queryPages2[query]) queryPages2[query] = [];
      queryPages2[query].push({ page, ...row });
    });

    Object.entries(queryPages2).forEach(([query, pages]) => {
      if (pages.length > 1) {
        const totalImpressions = pages.reduce((s, p) => s + p.impressions, 0);
        if (totalImpressions > 30) {
          gaps.push({
            type: 'cannibalization',
            query,
            pages: pages.map(p => ({
              url: p.page.replace(config.SITE_URL, '/'),
              clicks: p.clicks,
              impressions: p.impressions,
              position: p.position,
            })),
            suggestion: `Query "${query}" triggers ${pages.length} different pages. Consider consolidating content or using canonical tags to avoid keyword cannibalization.`,
          });
        }
      }
    });
  }

  return gaps;
}

function analyzeDevicePerformance(data) {
  const insights = [];

  if (data.devices.rows) {
    const mobile = data.devices.rows.find(r => r.keys[0] === 'MOBILE');
    const desktop = data.devices.rows.find(r => r.keys[0] === 'DESKTOP');

    if (mobile && desktop) {
      if (mobile.ctr < desktop.ctr * 0.7) {
        insights.push({
          type: 'mobile_ctr_gap',
          mobileCtr: mobile.ctr,
          desktopCtr: desktop.ctr,
          suggestion: `Mobile CTR (${(mobile.ctr * 100).toFixed(1)}%) is significantly lower than desktop (${(desktop.ctr * 100).toFixed(1)}%). Optimize mobile titles (shorter) and ensure mobile page speed is good.`,
        });
      }

      if (mobile.position > desktop.position + 2) {
        insights.push({
          type: 'mobile_ranking_gap',
          mobilePos: mobile.position,
          desktopPos: desktop.position,
          suggestion: `Mobile rankings (avg pos ${mobile.position.toFixed(1)}) trail desktop (${desktop.position.toFixed(1)}). Focus on Core Web Vitals and mobile page speed.`,
        });
      }
    }
  }

  return insights;
}

function analyzeCountryOpportunities(data) {
  const insights = [];

  if (data.countries.rows) {
    const sorted = [...data.countries.rows].sort((a, b) => b.impressions - a.impressions);

    // Check if French content is performing for French-speaking countries
    const frenchCountries = sorted.filter(r => ['fra', 'bel', 'che', 'can'].includes(r.keys[0]));
    const englishCountries = sorted.filter(r => ['usa', 'gbr', 'aus', 'ind', 'can'].includes(r.keys[0]));

    if (frenchCountries.length > 0) {
      const frTotal = frenchCountries.reduce((s, r) => s + r.impressions, 0);
      insights.push({
        type: 'french_market',
        countries: frenchCountries.map(c => ({ country: c.keys[0], clicks: c.clicks, impressions: c.impressions })),
        totalImpressions: frTotal,
        suggestion: `French-speaking markets have ${frTotal} impressions. Ensure /fr/ pages are well-optimized and consider more French blog content.`,
      });
    }

    if (englishCountries.length > 0) {
      const enTotal = englishCountries.reduce((s, r) => s + r.impressions, 0);
      insights.push({
        type: 'english_market',
        countries: englishCountries.map(c => ({ country: c.keys[0], clicks: c.clicks, impressions: c.impressions })),
        totalImpressions: enTotal,
        suggestion: `English-speaking markets have ${enTotal} impressions. Consider region-specific landing pages for US/UK/CA.`,
      });
    }
  }

  return insights;
}

function generateReport(data) {
  const quickWins = analyzeQuickWins(data);
  const contentGaps = analyzeContentGaps(data);
  const deviceInsights = analyzeDevicePerformance(data);
  const countryInsights = analyzeCountryOpportunities(data);

  console.log('='.repeat(70));
  console.log('  SEARCH CONSOLE SEO ANALYSIS REPORT');
  console.log(`  Period: ${data.metadata.startDate} to ${data.metadata.endDate}`);
  console.log('='.repeat(70));

  // Quick wins
  console.log('\n--- QUICK WINS (High-Impact Opportunities) ---\n');
  if (quickWins.length === 0) {
    console.log('  No significant quick wins identified.');
  } else {
    quickWins.slice(0, 15).forEach((opp, i) => {
      console.log(`  ${i + 1}. [${opp.type.toUpperCase()}] ${opp.suggestion}`);
      console.log('');
    });
  }

  // Content gaps
  console.log('\n--- CONTENT ANALYSIS ---\n');
  const hubs = contentGaps.filter(g => g.type === 'content_hub');
  const cannibalization = contentGaps.filter(g => g.type === 'cannibalization');

  if (hubs.length > 0) {
    console.log('  Content Hub Opportunities:');
    hubs.slice(0, 5).forEach((gap, i) => {
      console.log(`  ${i + 1}. ${gap.suggestion}`);
      console.log(`     Top queries: ${gap.topQueries.join(', ')}`);
      console.log('');
    });
  }

  if (cannibalization.length > 0) {
    console.log('  Keyword Cannibalization Issues:');
    cannibalization.slice(0, 5).forEach((gap, i) => {
      console.log(`  ${i + 1}. ${gap.suggestion}`);
      gap.pages.forEach(p => {
        console.log(`     - ${p.url}: ${p.clicks} clicks, pos ${p.position.toFixed(1)}`);
      });
      console.log('');
    });
  }

  // Device insights
  console.log('\n--- DEVICE PERFORMANCE ---\n');
  if (deviceInsights.length === 0) {
    console.log('  Device performance is balanced.');
  } else {
    deviceInsights.forEach((ins, i) => {
      console.log(`  ${i + 1}. ${ins.suggestion}`);
    });
  }

  // Country insights
  console.log('\n--- GEOGRAPHIC OPPORTUNITIES ---\n');
  if (countryInsights.length === 0) {
    console.log('  No significant geographic patterns found.');
  } else {
    countryInsights.forEach((ins, i) => {
      console.log(`  ${i + 1}. ${ins.suggestion}`);
    });
  }

  // Save report
  const report = {
    generatedAt: new Date().toISOString(),
    period: { start: data.metadata.startDate, end: data.metadata.endDate },
    quickWins: quickWins.slice(0, 20),
    contentGaps,
    deviceInsights,
    countryInsights,
    summary: {
      totalOpportunities: quickWins.length + contentGaps.length,
      quickWinCount: quickWins.length,
      contentGapCount: contentGaps.length,
      cannibalizationCount: cannibalization.length,
    },
  };

  if (!fs.existsSync(config.DATA_DIR)) {
    fs.mkdirSync(config.DATA_DIR, { recursive: true });
  }

  const reportPath = path.join(config.DATA_DIR, `seo-report_${data.metadata.startDate}_${data.metadata.endDate}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nFull report saved to: ${reportPath}`);

  return report;
}

// Main
const filepath = process.argv[2];
const data = loadData(filepath);
generateReport(data);
