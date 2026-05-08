const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const SIGNING_KEY = process.env.PARAGON_SIGNING_KEY.replace(/\\n/g, '\n');
const USER_ID = 'zealt-user01';

let trialId = '';
try {
  trialId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
} catch (err) {
  console.error('Error reading trial_id:', err);
}

app.get('/api/config', (req, res) => {
  res.json({ projectId: PROJECT_ID });
});

app.get('/api/token', (req, res) => {
  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      sub: USER_ID,
      iat: now,
      exp: now + 60 * 60, // 1 hour
    },
    SIGNING_KEY,
    { algorithm: 'RS256' }
  );
  res.json({ token });
});

app.post('/api/send-message', async (req, res) => {
  const { credentialId, message, channel } = req.body;
  
  if (!credentialId || !message || !channel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const userToken = jwt.sign(
    {
      sub: USER_ID,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    SIGNING_KEY,
    { algorithm: 'RS256' }
  );

  const fullMessage = `${message} Trial: ${trialId}`;

  try {
    const response = await axios.post(
      `https://proxy.useparagon.com/projects/${PROJECT_ID}/sdk/proxy/slack/chat.postMessage`,
      {
        channel: channel,
        text: fullMessage,
      },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'X-Paragon-Credential': credentialId,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to send message', details: error.response ? error.response.data : error.message });
  }
});

// Helper to list channels for the frontend
app.get('/api/channels/:credentialId', async (req, res) => {
  const { credentialId } = req.params;
  const userToken = jwt.sign(
    {
      sub: USER_ID,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    SIGNING_KEY,
    { algorithm: 'RS256' }
  );

  try {
    const response = await axios.get(
      `https://proxy.useparagon.com/projects/${PROJECT_ID}/sdk/proxy/slack/conversations.list?types=public_channel,private_channel`,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'X-Paragon-Credential': credentialId,
        },
      }
    );
    res.json(response.data.channels || []);
  } catch (error) {
    console.error('Error fetching channels:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
