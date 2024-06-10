const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const PORT = process.env.PORT || 5000;

let managementApiToken = '';

const getManagementApiToken = () => {
  const options = {
    method: 'POST',
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    })
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error getting management API token:', error);
      return;
    }

   

    try {
      const parsedBody = JSON.parse(body);
      managementApiToken = parsedBody.access_token;
    
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
    }
  });
};

// Get a new token at server start
getManagementApiToken();

// Refresh token periodically (e.g., every 24 hours)
setInterval(getManagementApiToken, 24 * 60 * 60 * 1000);

app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const options = {
    method: 'PATCH',
    url: `https://${AUTH0_DOMAIN}/api/v2/users/${id}`,
    headers: {
      Authorization: `Bearer ${managementApiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error updating user info:', error);
      return res.status(500).send('Error updating user info');
    }

    res.json(JSON.parse(body));
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
