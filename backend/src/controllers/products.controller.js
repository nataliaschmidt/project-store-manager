const { productsService } = require('../services');

const findAllProducts = async (_req, res) => {
  const { data } = await productsService.findAll();
  return res.status(200).json(data);
};

module.exports = {
  findAllProducts,
};