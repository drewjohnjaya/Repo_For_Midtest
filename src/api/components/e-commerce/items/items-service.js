const itemsRepository = require('./items-repository');

/**
 * Get list of items
 * @returns {Array}
 */
async function getItems() {
  const items = await itemsRepository.getItems();

  const results = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    results.push({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      available: item.available,
    });
  }

  return results;
}

/**
 * Get item detail
 * @param {string} id - Item ID
 * @returns {Object}
 */
async function getItem(id) {
  const item = await itemsRepository.getItem(id);

  // Item not found
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    available: item.available,
  };
}

/**
 * Create new item
 * @param {string} name - Name
 * @param {string} category - Category 
 * @param {number} price - Price
 * @param {number} stock - Stock
 * @param {boolean} available - Available  
 * @returns {boolean}
 */
async function createItem(name, category, price, stock, available) {

  try {
    await itemsRepository.createItem(name, category, price, stock, available);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing item
 * @param {string} id - Item ID
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {number} price - Price
 * @param {number} stock - Stock
 * @param {boolean} available - Available 
 * @returns {boolean}
 */
async function updateItem(id, name, category, price, stock, available) {
  const item = await itemsRepository.getItem(id);

  // Item not found
  if (!item) {
    return null;
  }

  try {
    await itemsRepository.updateItem(id, name, category, price, stock, available);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete an item
 * @param {string} id - Item ID
 * @returns {boolean}
 */
async function deleteItem(id) {
  const item = await itemsRepository.getItem(id);

  // Item not found
  if (!item) {
    return null;
  }

  try {
    await itemsRepository.deleteItem(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
