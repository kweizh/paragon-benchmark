const { paragon } = require('@useparagon/connect');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const secret = 'test-secret';
const payload = {
  sub: 'test-user',
  // exp set to 1 hour ago
  exp: Math.floor(Date.now() / 1000) - 3600
};

const token = jwt.sign(payload, secret);

async function run() {
  try {
    await paragon.authenticate('test-project-id', token);
  } catch (error) {
    const errorMessage = error.message || error.toString();
    fs.writeFileSync(path.join(__dirname, 'error.log'), errorMessage);
    console.log('Error caught and logged to error.log');
  }
}

run();
