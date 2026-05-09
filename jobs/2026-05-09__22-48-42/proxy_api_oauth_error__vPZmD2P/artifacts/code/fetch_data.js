const fs = require('fs');

async function fetchData() {
    const response = await fetch('https://proxy.useparagon.com/projects/TEST_PROJECT/sdk/proxy/slack/users.identity', {
        headers: {
            'Authorization': 'Bearer invalid_token'
        }
    });

    if (response.status === 401) {
        fs.writeFileSync('/home/user/app/error.log', 'User needs to reconnect');
        return;
    }

    const data = await response.json();
    console.log(data);
}

fetchData().catch(console.error);
