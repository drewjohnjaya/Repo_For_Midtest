const checkoutRepository = require('./checkout-repository');

/**
 * Check item name for purchase.
 * @param {string} name - Name
 * @returns {object} An object containing the item data if the name in purchase and the name in item are matched. Otherwise returns null.
 */
async function checkPurchaseCredentials(name) {
  const item = await checkoutRepository.getItemByName(name);

  // returns all the data in an item if the purchase name matches the item name
  if (name == item.name)
    return {
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      available: item.available,
    }

  return null;
}

module.exports = {
  checkPurchaseCredentials,
};
