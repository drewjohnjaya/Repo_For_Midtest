const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const itemsControllers = require('./items-controller');
const itemsValidator = require('./items-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/items', route);

  // Get list of items
  route.get('/', authenticationMiddleware, itemsControllers.getItems);

  // Create item
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(itemsValidator.createItem),
    itemsControllers.createItem
  );

  // Get item detail
  route.get('/:id', authenticationMiddleware, itemsControllers.getItem);

  // Update item
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(itemsValidator.updateItem),
    itemsControllers.updateItem
  );

  // Delete item
  route.delete('/:id', authenticationMiddleware, itemsControllers.deleteItem);
};
