require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;
const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;

if (!PARAGON_SIGNING_KEY || !PARAGON_PROJECT_ID) {
  console.error('Missing PARAGON_SIGNING_KEY or PARAGON_PROJECT_ID environment variables');
}

app.use(express.static('public'));

app.get('/auth/token', (req, res) => {
  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    sub: 'test-user-id',
    iat: iat
  };

  try {
    const token = jwt.sign(payload, PARAGON_SIGNING_KEY, { algorithm: 'RS256' });
    res.json({ token, projectId: PARAGON_PROJECT_ID });
  } catch (error) {
    console.error('Error signing JWT:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
