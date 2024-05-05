const joi = require('joi');

module.exports = {
  createItem: {
    body: {
      name: joi.string().required().label('Name'),
      category: joi.string().required().label('Category'),
      price: joi.number().required().label('Price'),
      stock: joi.number().required().label('Stock'),
      available: joi.boolean().required().label('Available'),
    },
  },
};
