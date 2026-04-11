#!/usr/bin/env node
/**
 * Google Search Console - Manual OAuth2 Code Exchange
 *
 * Use this script when a local callback server is not reachable
 * (e.g., running in a sandboxed environment).
 *
 * Usage:
 *   1. node scripts/search-console/auth-manual.js
 *      (prints the auth URL — visit it in your browser, approve)
 *   2. After approval, Google redirects to http://localhost:3001/oauth2callback?code=XXX
 *      The page will fail to load, but the URL bar contains the code.
 *   3. Copy the entire redirect URL OR just the code parameter, then run:
 *      node scripts/search-console/auth-manual.js "THE_CODE_OR_URL"
 */

const { google } = require('googleapis');
const fs = require('fs');
const config = require('./config');

function loadCredentials() {
  if (!fs.existsSync(config.CLIENT_SECRET_PATH)) {
    console.error(`Missing ${config.CLIENT_SECRET_PATH}`);
    process.exit(1);
  }
  const creds = JSON.parse(fs.readFileSync(config.CLIENT_SECRET_PATH, 'utf8'));
  return creds.web || creds.installed;
}

function buildClient() {
  const key = loadCredentials();
  return new google.auth.OAuth2(key.client_id, key.client_secret, config.REDIRECT_URI);
}

function extractCode(input) {
  if (!input) return null;
  // If full URL, extract code param
  const match = input.match(/[?&]code=([^&]+)/);
  if (match) return decodeURIComponent(match[1]);
  // Otherwise assume the input is the code itself
  return input.trim();
}

async function main() {
  const arg = process.argv[2];
  const client = buildClient();

  if (!arg) {
    // Print auth URL
    const authUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: config.SCOPES,
      prompt: 'consent',
    });
    console.log('\n=== STEP 1: Open this URL in your browser ===\n');
    console.log(authUrl);
    console.log('\n=== STEP 2: After approving ===');
    console.log('Google will redirect to http://localhost:3001/oauth2callback?code=...');
    console.log('The page will show an error (cannot reach localhost) — that is OK.');
    console.log('Copy the ENTIRE redirect URL from the browser address bar, then run:\n');
    console.log('  node scripts/search-console/auth-manual.js "PASTE_URL_HERE"\n');
    return;
  }

  const code = extractCode(arg);
  if (!code) {
    console.error('Could not extract code from input.');
    process.exit(1);
  }

  console.log('Exchanging authorization code for tokens...');
  try {
    const { tokens } = await client.getToken(code);
    fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log(`Tokens saved to ${config.TOKEN_PATH}`);

    // Test by listing sites
    client.setCredentials(tokens);
    const sc = google.searchconsole({ version: 'v1', auth: client });
    const sites = await sc.sites.list();
    console.log('\nVerified! Sites accessible:');
    (sites.data.siteEntry || []).forEach(s => {
      console.log(`  - ${s.siteUrl} (${s.permissionLevel})`);
    });
    console.log('\nYou can now run: node scripts/search-console/fetch-data.js');
  } catch (err) {
    console.error('Token exchange failed:', err.message);
    if (err.response?.data) console.error(err.response.data);
    process.exit(1);
  }
}

main().catch(console.error);
