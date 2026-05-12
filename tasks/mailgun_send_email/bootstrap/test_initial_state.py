import os

def test_initial_state():
    assert not os.path.exists("/home/user/mailgun_task/send_email.js"), "Script should not exist yet"
