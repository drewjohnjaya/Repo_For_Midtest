const itemsService = require('./items-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { Item } = require('../../../models');

/**
 * Handle get list of items request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getItems(request, response, next) {
  try {
    const search = request.query.search || "";
    //let sort = request.query.sort;
    let { page_size, page_number, sort } = request.query;
    //request.query.search ? (search = request.query.search.split(':')) : (search = [search]);
    //let searched = ({email:{$regex:search, $options: "i"}});

    request.query.sort ? (sort = request.query.sort.split(':')) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    }
    else {
      sortBy[sort[0]] = "asc";
    }
    const skip = (page_number - 1) * 10;
    // const users = await usersService.getUsers();
    const items = await Item.find(
      {
      $or:[
      {email:{$regex: '.*'+search+'.*',$options:'i'}},
      {name:{$regex:'.*'+search+'.*',$options:'i'}}
      ]
      })
      //.sort(sortBy)
      .skip(skip)
      .limit(page_size);
    return response.status(200).json(items);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get item detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getItem(request, response, next) {
  try {
    const item = await itemsService.getItem(request.params.id);

    if (!item) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown item');
    }

    return response.status(200).json(item);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create item request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createItem(request, response, next) {
  try {
    const name = request.body.name;
    const category = request.body.category;
    const price = request.body.price;
    const stock = request.body.stock;
    const available = request.body.available;

    const success = await itemsService.createItem(name, category, price, stock, available);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create item'
      );
    }

    return response.status(200).json({ name, category, price, stock, available });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update item request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateItem(request, response, next) {
  try {
    const id = request.body.id;
    const name = request.body.name;
    const category = request.body.category;
    const price = request.body.price;
    const stock = request.body.stock;
    const available = request.body.stock;

    const success = await itemsService.updateItem(id, name, category, price, stock, available);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update item'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete item request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteItem(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteItem(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete item'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
