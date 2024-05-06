const express = require('express');

const checkoutControllers = require('./checkout-controller');
const checkoutValidators = require('./checkout-validator');
const celebrate = require('../../../../core/celebrate-wrappers');
const { category } = require('../../../../models/items-schema');
const route = express.Router();

module.exports = (app) => {
  app.use('/checkout', route);
  // route for create purchase
  route.post(
    '/purchase',
    celebrate(checkoutValidators.purchase),
    checkoutControllers.purchase,
  );
  // route for update purchase
  route.put(
    '/purchase/:id',
    checkoutControllers.updatePurchase(id),
  )
  // route for delete purchase
  route.delete(
    '/purchase/:id',
    checkoutControllers.deletePurchase(id),
  )
};
