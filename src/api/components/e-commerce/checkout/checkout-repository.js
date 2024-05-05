const { Item } = require('../../../../models');

/**
 * Get item by name for purchase information
 * @param {string} name - Name
 * @returns {Promise}
 */
async function getItemByName(name) {
  return Item.findOne({ name });
}

module.exports = {
  getItemByName,
};
