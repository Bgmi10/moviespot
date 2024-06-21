const request = require('request');
const { AUTH0_DOMAIN } = require('../auth0config');
const { getToken } = require('../auth0');

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const options = {
    method: 'PATCH',
    url: `https://${AUTH0_DOMAIN}/api/v2/users/${id}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
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
};

module.exports = {
  updateUser
};
