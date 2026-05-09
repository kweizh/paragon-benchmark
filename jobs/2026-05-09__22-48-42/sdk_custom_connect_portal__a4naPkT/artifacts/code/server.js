const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/token', (req, res) => {
  const signingKey = process.env.PARAGON_SIGNING_KEY;
  const projectId = process.env.PARAGON_PROJECT_ID;
  
  if (!signingKey) {
    return res.status(500).json({ error: 'PARAGON_SIGNING_KEY is not set' });
  }

  const payload = {
    sub: 'test-user-123',
    iat: Math.floor(Date.now() / 1000)
  };

  try {
    // Try RS256 first, if it fails, maybe it's not a PEM key and we should try HS256?
    // Paragon keys are usually RS256 private keys.
    // Replace \n if needed? Usually keys might have \n escaped.
    const key = signingKey.replace(/\\n/g, '\n');
    const token = jwt.sign(payload, key, { algorithm: 'RS256' });
    res.json({ token, projectId });
  } catch (error) {
    console.error('Error signing token with RS256, trying HS256...', error.message);
    try {
      const token = jwt.sign(payload, signingKey, { algorithm: 'HS256' });
      res.json({ token, projectId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
