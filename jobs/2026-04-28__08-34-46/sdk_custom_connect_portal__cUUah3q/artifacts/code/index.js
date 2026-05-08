const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;

const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY.replace(/\\n/g, '\n');

app.get('/config', (req, res) => {
  const userId = 'user-123';
  const token = jwt.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
    },
    PARAGON_SIGNING_KEY,
    { algorithm: 'RS256' }
  );

  res.json({
    projectId: PARAGON_PROJECT_ID,
    token: token
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
