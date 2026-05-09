#!/bin/bash
curl -s -X GET "https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions" \
  -H "Authorization: Bearer ${PARAGON_USER_TOKEN}" \
  -H "Content-Type: application/json" \
  -o /home/user/actions.json
