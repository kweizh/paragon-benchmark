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
    return res.status(500).json({ error: 'Missing Paragon environment variables' });
  }

  const token = jwt.sign(
    {
      sub: 'test-user-1',
      iat: Math.floor(Date.now() / 1000)
    },
    signingKey.replace(/\\n/g, '\n'),
    {
      algorithm: 'RS256'
    }
  );

  res.json({ token, projectId });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
