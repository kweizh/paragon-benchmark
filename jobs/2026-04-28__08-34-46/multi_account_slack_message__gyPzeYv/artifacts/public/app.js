async function init() {
    const statusEl = document.getElementById('status');
    const authSection = document.getElementById('auth-section');
    const messageSection = document.getElementById('message-section');
    const accountSelect = document.getElementById('account-select');
    const channelSelect = document.getElementById('channel-select');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    function showStatus(msg, isError = false) {
        statusEl.textContent = msg;
        statusEl.className = isError ? 'error' : 'success';
        statusEl.style.display = 'block';
    }

    try {
        // 1. Get Config and Token from backend
        const [configRes, tokenRes] = await Promise.all([
            fetch('/api/config').then(r => r.json()),
            fetch('/api/token').then(r => r.json())
        ]);

        const { projectId } = configRes;
        const { token } = tokenRes;

        // 2. Initialize Paragon
        await paragon.authenticate(projectId, token);

        // 3. Get User and Connected Accounts
        const user = paragon.getUser();
        const slackIntegrations = user.authenticatedIntegrations.filter(i => i.type === 'slack');

        if (slackIntegrations.length === 0) {
            authSection.innerHTML = '<p>No Slack accounts connected. Please connect at least one Slack account.</p><button onclick="paragon.connect(\'slack\')">Connect Slack</button>';
            return;
        }

        authSection.style.display = 'none';
        messageSection.style.display = 'block';

        // Populate accounts
        slackIntegrations.forEach(integration => {
            const option = document.createElement('option');
            option.value = integration.credentialId;
            // Use name or workspace name if available, otherwise credentialId
            option.textContent = integration.name || `Slack (${integration.credentialId})`;
            accountSelect.appendChild(option);
        });

        // Load channels for the first account
        async function loadChannels(credentialId) {
            channelSelect.innerHTML = '<option value="">Loading channels...</option>';
            channelSelect.disabled = true;
            try {
                const res = await fetch(`/api/channels/${credentialId}`);
                const channels = await res.json();
                channelSelect.innerHTML = '';
                if (channels.length === 0) {
                    channelSelect.innerHTML = '<option value="">No channels found</option>';
                } else {
                    channels.forEach(c => {
                        const option = document.createElement('option');
                        option.value = c.id;
                        option.textContent = `#${c.name}`;
                        channelSelect.appendChild(option);
                    });
                    channelSelect.disabled = false;
                }
            } catch (err) {
                console.error(err);
                channelSelect.innerHTML = '<option value="">Error loading channels</option>';
            }
        }

        await loadChannels(accountSelect.value);

        accountSelect.addEventListener('change', (e) => {
            loadChannels(e.target.value);
        });

        // 4. Send Message
        sendBtn.addEventListener('click', async () => {
            const credentialId = accountSelect.value;
            const channel = channelSelect.value;
            const message = messageInput.value;

            if (!message || !channel) {
                alert('Please enter a message and select a channel');
                return;
            }

            sendBtn.disabled = true;
            showStatus('Sending...');

            try {
                const res = await fetch('/api/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ credentialId, message, channel })
                });

                const result = await res.json();
                if (res.ok) {
                    showStatus('Message sent successfully!');
                    messageInput.value = '';
                } else {
                    showStatus(`Error: ${result.details?.error || result.error || 'Unknown error'}`, true);
                }
            } catch (err) {
                showStatus(`Network error: ${err.message}`, true);
            } finally {
                sendBtn.disabled = false;
            }
        });

    } catch (err) {
        console.error(err);
        authSection.innerHTML = `<p class="error">Initialization failed: ${err.message}</p>`;
    }
}

init();
