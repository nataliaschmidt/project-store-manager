const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return {
    status: 'SUCCESSFUL',
    data: products,
  };
};

module.exports = {
  findAll,
};