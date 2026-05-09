const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;
const USER_ID = 'zealt-user01';

function getParagonToken() {
  const createdAt = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      sub: USER_ID,
      iat: createdAt,
      exp: createdAt + 60 * 60,
    },
    PARAGON_SIGNING_KEY.replace(/\\n/g, '\n'),
    { algorithm: 'RS256' }
  );
}

app.get('/api/paragon-token', (req, res) => {
  try {
    const token = getParagonToken();
    res.json({ token, projectId: PARAGON_PROJECT_ID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/send-message', async (req, res) => {
  try {
    const { accountId, message, channel } = req.body;
    
    let trialId = '';
    try {
      trialId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
    } catch (e) {
      console.error('Could not read trial_id', e);
    }
    
    let finalMessage = message;
    if (trialId) {
      finalMessage += ` Trial: ${trialId}`;
    }
    
    const token = getParagonToken();
    
    const response = await fetch('https://proxy.useparagon.com/slack/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Paragon-Credential': accountId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: channel || '#general',
        text: finalMessage
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
