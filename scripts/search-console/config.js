/**
 * Google Search Console API Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.cloud.google.com/
 * 2. Enable the "Google Search Console API" for your project
 * 3. Create OAuth 2.0 credentials (Desktop application type)
 * 4. Download the client secret JSON and save it as 'client_secret.json' in this directory
 *    OR fill in CLIENT_ID and CLIENT_SECRET below
 * 5. Run: node scripts/search-console/auth.js
 * 6. After authenticating, run: node scripts/search-console/fetch-data.js
 */

const path = require('path');

module.exports = {
  // Google Cloud Project API Key (for project identification)
  API_KEY: process.env.GSC_API_KEY || 'AIzaSyBAZJe87-UoHVg66RfwgRK0wcXD3KbkWwI',

  // OAuth 2.0 Credentials - REQUIRED for Search Console API access
  // Get these from Google Cloud Console > APIs & Services > Credentials
  CLIENT_ID: process.env.GSC_CLIENT_ID || '',
  CLIENT_SECRET: process.env.GSC_CLIENT_SECRET || '',

  // Your verified site URL in Search Console
  SITE_URL: 'https://www.teamwheelsapp.com/',

  // OAuth settings
  REDIRECT_URI: 'http://localhost:3001/oauth2callback',
  SCOPES: ['https://www.googleapis.com/auth/webmasters.readonly'],

  // File paths
  TOKEN_PATH: path.join(__dirname, 'tokens.json'),
  CLIENT_SECRET_PATH: path.join(__dirname, 'client_secret.json'),
  DATA_DIR: path.join(__dirname, 'data'),

  // Default date range (September 2025)
  DEFAULT_START_DATE: '2025-09-01',
  DEFAULT_END_DATE: '2025-09-30',
};
