const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  PORT: process.env.PORT || 5000
};
