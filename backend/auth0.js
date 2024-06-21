const request = require('request');
const { CLIENT_ID, CLIENT_SECRET, AUTH0_DOMAIN } = require('./auth0config');

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

const startTokenRefresh = () => {
  setInterval(getManagementApiToken, 24 * 60 * 60 * 1000);
};

const getToken = () => managementApiToken;

module.exports = {
  getManagementApiToken,
  startTokenRefresh,
  getToken
};
