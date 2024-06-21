const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const { getManagementApiToken, startTokenRefresh } = require('./auth0');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Get a new token at server start
getManagementApiToken();

// Refresh token periodically (e.g., every 24 hours)
startTokenRefresh();

// Use the user routes
app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
