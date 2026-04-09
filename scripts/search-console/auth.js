#!/usr/bin/env node
/**
 * Google Search Console - OAuth2 Authentication
 *
 * Run this script first to authenticate with Google:
 *   node scripts/search-console/auth.js
 *
 * It will open a browser for Google sign-in and save tokens locally.
 */

const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const fs = require('fs');
const config = require('./config');

async function getOAuth2Client() {
  let clientId = config.CLIENT_ID;
  let clientSecret = config.CLIENT_SECRET;

  // Try to load from client_secret.json if env vars not set
  if (!clientId && fs.existsSync(config.CLIENT_SECRET_PATH)) {
    const credentials = JSON.parse(fs.readFileSync(config.CLIENT_SECRET_PATH, 'utf8'));
    const key = credentials.installed || credentials.web;
    clientId = key.client_id;
    clientSecret = key.client_secret;
  }

  if (!clientId || !clientSecret) {
    console.error('\n=== SETUP REQUIRED ===');
    console.error('Google Search Console API requires OAuth 2.0 credentials.\n');
    console.error('Steps to set up:');
    console.error('1. Go to https://console.cloud.google.com/apis/credentials');
    console.error('2. Click "Create Credentials" > "OAuth client ID"');
    console.error('3. Choose "Desktop app" as the application type');
    console.error('4. Download the JSON file and save it as:');
    console.error(`   ${config.CLIENT_SECRET_PATH}`);
    console.error('\nOR set environment variables:');
    console.error('   export GSC_CLIENT_ID="your-client-id"');
    console.error('   export GSC_CLIENT_SECRET="your-client-secret"\n');
    process.exit(1);
  }

  return new google.auth.OAuth2(clientId, clientSecret, config.REDIRECT_URI);
}

async function authenticate() {
  const oauth2Client = await getOAuth2Client();

  // Check if we already have valid tokens
  if (fs.existsSync(config.TOKEN_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(config.TOKEN_PATH, 'utf8'));
    oauth2Client.setCredentials(tokens);

    // Test if token is still valid
    try {
      const webmasters = google.searchconsole({ version: 'v1', auth: oauth2Client });
      await webmasters.sites.list();
      console.log('Already authenticated! Tokens are valid.');
      console.log('Run: node scripts/search-console/fetch-data.js');
      return oauth2Client;
    } catch {
      console.log('Existing tokens expired. Re-authenticating...');
    }
  }

  // Generate auth URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: config.SCOPES,
    prompt: 'consent',
  });

  console.log('\n=== Google Search Console Authentication ===\n');
  console.log('Open this URL in your browser to authorize:\n');
  console.log(authUrl);
  console.log('\nWaiting for authorization...\n');

  // Try to open browser automatically
  try {
    const open = require('open');
    await open(authUrl);
    console.log('(Browser opened automatically)');
  } catch {
    console.log('(Please open the URL manually)');
  }

  // Start local server to receive the callback
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const queryParams = url.parse(req.url, true).query;

      if (queryParams.code) {
        try {
          const { tokens } = await oauth2Client.getToken(queryParams.code);
          oauth2Client.setCredentials(tokens);

          // Save tokens for future use
          fs.writeFileSync(config.TOKEN_PATH, JSON.stringify(tokens, null, 2));

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html><body style="font-family: Arial; text-align: center; padding: 50px;">
              <h1 style="color: #5b5fc7;">Authentication Successful!</h1>
              <p>You can close this window and return to the terminal.</p>
              <p>Run: <code>node scripts/search-console/fetch-data.js</code></p>
            </body></html>
          `);

          console.log('\nAuthentication successful! Tokens saved.');
          console.log('Now run: node scripts/search-console/fetch-data.js\n');

          server.close();
          resolve(oauth2Client);
        } catch (err) {
          res.writeHead(500);
          res.end('Authentication failed: ' + err.message);
          reject(err);
        }
      } else if (queryParams.error) {
        res.writeHead(400);
        res.end('Authorization denied: ' + queryParams.error);
        reject(new Error(queryParams.error));
      }
    });

    server.listen(3001, () => {
      console.log('Listening on http://localhost:3001 for OAuth callback...');
    });
  });
}

// Run if called directly
if (require.main === module) {
  authenticate().catch(console.error);
}

module.exports = { authenticate, getOAuth2Client };
