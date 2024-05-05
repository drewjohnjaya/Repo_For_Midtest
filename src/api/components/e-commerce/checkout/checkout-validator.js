const joi = require('joi');

module.exports = {
  purchase: {
    body: {
      name: joi.string().required().label('Name'),
    },
  },

  updatePurchase: {
    body: {
      name: joi.string().required().label('Name'),
    },
  },
};
