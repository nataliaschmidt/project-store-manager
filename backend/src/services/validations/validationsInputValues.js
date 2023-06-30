const { nameSchema, newSaleQuantitySchema } = require('./schema');

const validateNameProduct = (newProduct) => {
  const { error } = nameSchema.validate(newProduct);
  if (error) {
    return {
      status: 'INVALID_VALUE',
      message: '"name" length must be at least 5 characters long',
    };
  }
};

const validateQuantitySalesField = (newSale) => {
  const errorQuantity = newSale.map((e) => {
    const { error } = newSaleQuantitySchema.validate(e);
    return error;
  });
  const verifyErrorQuantity = errorQuantity.filter((e) => e !== undefined);
  if (verifyErrorQuantity.length > 0) {
    return {
      status: 'INVALID_VALUE',
      message: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
};

module.exports = {
  validateNameProduct,
  validateQuantitySalesField,
};