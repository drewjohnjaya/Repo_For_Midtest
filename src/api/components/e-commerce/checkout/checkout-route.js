const express = require('express');

const checkoutControllers = require('./checkout-controller');
const checkoutValidators = require('./checkout-validator');
const celebrate = require('../../../../core/celebrate-wrappers');
const { category } = require('../../../../models/items-schema');
const route = express.Router();

module.exports = (app) => {
  app.use('/checkout', route);

  route.post(
    '/purchase',
    celebrate(checkoutValidators.purchase),
    checkoutControllers.purchase,
  );

  route.put(
    '/purchase/:id',
    checkoutControllers.updatePurchase(id),
  )

  route.delete(
    '/purchase/:id',
    checkoutControllers.deletePurchase(id),
  )
};
