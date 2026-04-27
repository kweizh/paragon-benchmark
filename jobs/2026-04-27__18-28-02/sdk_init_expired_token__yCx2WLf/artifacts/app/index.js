const jwt = require('jsonwebtoken');
const { paragon } = require('@useparagon/connect');
const fs = require('fs');

async function main() {
  try {
    const token = jwt.sign(
      {
        sub: 'test-user',
        exp: Math.floor(Date.now() / 1000) - 3600
      },
      'test-secret'
    );

    await paragon.authenticate('test-project-id', token);
  } catch (error) {
    fs.writeFileSync('/home/user/app/error.log', error.message || String(error));
  }
}

main();
