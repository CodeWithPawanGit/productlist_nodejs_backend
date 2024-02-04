// auth.js

const express = require('express');
const app = express();
const { auth } = require('express-openid-connect');
const router = express.Router();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'OrkeWYVqihPqAyYv9C8XU4GqppSEF4lv',
    issuerBaseURL: 'https://dev-yahhmbulg6t28xya.us.auth0.com'
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
  
  // req.isAuthenticated is provided from the auth router
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

module.exports = router;
