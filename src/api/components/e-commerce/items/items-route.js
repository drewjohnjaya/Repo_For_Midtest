const express = require('express');
const celebrate = require('../../../../core/celebrate-wrappers');
const itemsControllers = require('./items-controller');
const itemsValidator = require('./items-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/items', route);

  // Get list of items
  route.get('/',itemsControllers.getItems);

  // Create item
  route.post(
    '/',
    celebrate(itemsValidator.createItem),
    itemsControllers.createItem
  );

  // Get item detail
  route.get('/:id', itemsControllers.getItem);

  // Update item
  route.put(
    '/:id',
    itemsControllers.updateItem
  );

  // Delete item
  route.delete('/:id', itemsControllers.deleteItem);
};
