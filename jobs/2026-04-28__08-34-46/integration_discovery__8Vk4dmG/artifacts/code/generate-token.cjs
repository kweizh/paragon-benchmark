const jwt = require('jsonwebtoken');

const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY.replace(/\\n/g, '\n');

if (!PARAGON_PROJECT_ID || !PARAGON_SIGNING_KEY) {
  console.error('Missing PARAGON_PROJECT_ID or PARAGON_SIGNING_KEY');
  process.exit(1);
}

const userId = 'user-123'; // Example user ID
const currentTime = Math.floor(Date.now() / 1000);

const payload = {
  sub: userId,
  iat: currentTime,
  exp: currentTime + 60 * 60, // 1 hour expiration
};

try {
  const token = jwt.sign(payload, PARAGON_SIGNING_KEY, { algorithm: 'RS256' });
  console.log(token);
} catch (err) {
  console.error('Error signing token:', err.message);
  process.exit(1);
}
