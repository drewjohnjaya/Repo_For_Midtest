const { name } = require('../../../../models/items-schema');
const { errorResponder, errorTypes } = require('../../../../core/errors');
const checkoutServices = require('./checkout-service');

/**
 * Handle purchase request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function purchase(request, response, next) {
  const { name } = request.body;

  try {
    // Check purchase credentials
    const purchaseSuccess = await checkoutServices.checkPurchaseCredentials(
      name
    );

    if (!purchaseSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Purchase Unsuccessful'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update purchase
 * @param {string} id - Item ID
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {number} price - Price
 * @param {number} stock - Stock
 * @param {boolean} available - Available  
 * @returns {Promise}
 */
async function updatePurchase(id) {
  return Item.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        category,
        price,
        stock,
        available,
      },
    }
  );
}

/**
 * Delete a purchase
 * @param {string} id - Item ID
 * @returns {Promise}
 */
async function deletePurchase(id) {
  return Item.deleteOne({ _id: id });
}

module.exports = {
  purchase,
  updatePurchase,
  deletePurchase,
};
