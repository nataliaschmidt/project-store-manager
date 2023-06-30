const joi = require('joi');

const nameSchema = joi.object({
  name: joi.string().min(5),
});

const newSaleQuantitySchema = joi.object({
  productId: joi.number().min(1),
  quantity: joi.number().min(1),
});

module.exports = {
  nameSchema,
  newSaleQuantitySchema,
};