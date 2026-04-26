const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;

const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;

app.use(express.static('public'));

app.get('/api/token', (req, res) => {
  if (!PARAGON_SIGNING_KEY || !PARAGON_PROJECT_ID) {
    return res.status(500).json({ error: 'Paragon configuration missing' });
  }

  const sub = 'test-user-1';
  const iat = Math.floor(Date.now() / 1000);
  
  const token = jwt.sign(
    {
      sub: sub,
      iat: iat,
    },
    PARAGON_SIGNING_KEY,
    { algorithm: 'RS256' }
  );

  res.json({
    token: token,
    projectId: PARAGON_PROJECT_ID
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
