const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/token', (req, res) => {
  if (!PARAGON_SIGNING_KEY || !PARAGON_PROJECT_ID) {
    return res.status(500).json({ error: 'Paragon configuration missing' });
  }

  const userId = 'test-user-1';
  const currentTime = Math.floor(Date.now() / 1000);

  const token = jwt.sign(
    {
      sub: userId,
      iat: currentTime,
      exp: currentTime + 60 * 60, // 1 hour expiration
    },
    PARAGON_SIGNING_KEY,
    { algorithm: 'RS256' }
  );

  res.json({
    token,
    projectId: PARAGON_PROJECT_ID,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
