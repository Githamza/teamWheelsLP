#!/usr/bin/env node
/**
 * YouTube channel — OAuth2 client (read-only).
 *
 *   node scripts/youtube/auth.js        sign in once, saves tokens.json
 *
 * Credentials: scripts/youtube/client_secret.json (Desktop OAuth client,
 * git-ignored). Local tooling only: the site build never needs them.
 * Other scripts use `getClient()`, which signs in on demand.
 */

const { google } = require('googleapis');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CLIENT_SECRET_PATH = path.join(__dirname, 'client_secret.json');
const TOKEN_PATH = path.join(__dirname, 'tokens.json');
const PORT = 3003;
const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

function signIn(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  console.log('\nOpen this URL to authorize (pick the TeamWheels channel):\n');
  console.log(authUrl + '\n');

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const params = new URL(req.url, REDIRECT_URI).searchParams;
      if (params.get('error')) {
        res.writeHead(400).end('Authorization denied: ' + params.get('error'));
        server.close();
        return reject(new Error(params.get('error')));
      }
      if (!params.get('code')) return res.writeHead(204).end();
      try {
        const { tokens } = await oauth2Client.getToken(params.get('code'));
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), { mode: 0o600 });
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<p style="font-family:sans-serif;padding:3rem;text-align:center">TeamWheels YouTube: signed in. You can close this tab.</p>');
        server.close();
        resolve(oauth2Client);
      } catch (err) {
        res.writeHead(500).end('Authentication failed: ' + err.message);
        server.close();
        reject(err);
      }
    });
    server.listen(PORT, async () => {
      try {
        const open = (await import('open')).default;
        await open(authUrl);
      } catch {
        /* URL is printed above */
      }
    });
  });
}

async function getClient() {
  const raw = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, 'utf8'));
  const key = raw.installed || raw.web;
  const oauth2Client = new google.auth.OAuth2(key.client_id, key.client_secret, REDIRECT_URI);
  if (fs.existsSync(TOKEN_PATH)) {
    oauth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
    try {
      await oauth2Client.getAccessToken();
      return oauth2Client;
    } catch {
      console.log('Saved tokens expired, signing in again...');
    }
  }
  return signIn(oauth2Client);
}

module.exports = { getClient };

if (require.main === module) {
  getClient().then(
    () => console.log('Authenticated.'),
    (err) => {
      console.error('Authentication failed:', err.message);
      process.exit(1);
    }
  );
}
