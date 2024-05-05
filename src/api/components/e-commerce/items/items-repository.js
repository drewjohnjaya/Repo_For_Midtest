const { Item } = require('../../../../models');

/**
 * Get a list of items
 * @returns {Promise}
 */
async function getItems() {
  return Item.find({});
}

/**
 * Get item detail
 * @param {string} id - Item ID
 * @returns {Promise}
 */
async function getItem(id) {
  return Item.findById(id);
}

/**
 * Create new item
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {string} price - Price
 * @param {number} stock - Stock
 * @param {boolean} available - Available 
 * @returns {Promise}
 */
async function createItem(name, category, price, stock, available) {
  return Item.create({
    name,
    category,
    price,
    stock,
    available,
  });
}

/**
 * Update existing item
 * @param {string} id - Item ID
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {number} price - Price
 * @param {number} stock - Stock
 * @param {boolean} available - Available  
 * @returns {Promise}
 */
async function updateItem(id, name, category, price, stock, available) {
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
 * Delete an item
 * @param {string} id - Item ID
 * @returns {Promise}
 */
async function deleteItem(id) {
  return Item.deleteOne({ _id: id });
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
