const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/token', (req, res) => {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const signingKey = process.env.PARAGON_SIGNING_KEY;

  if (!projectId || !signingKey) {
    return res.status(500).json({ error: 'Missing Paragon credentials' });
  }

  try {
    // Paragon requires RS256 algorithm
    const token = jwt.sign(
      {
        sub: 'test-user-1',
        iat: Math.floor(Date.now() / 1000)
      },
      signingKey.replace(/\\n/g, '\n'), // handle escaped newlines in env var
      { algorithm: 'RS256' }
    );
    res.json({ token, projectId });
  } catch (error) {
    // Fallback to HS256 if RS256 fails (e.g. if the key is just a secret string in test env)
    try {
      const token = jwt.sign(
        {
          sub: 'test-user-1',
          iat: Math.floor(Date.now() / 1000)
        },
        signingKey
      );
      res.json({ token, projectId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate token' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
