const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const items = require('./components/e-commerce/items/items-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  items(app);

  return app;
};
