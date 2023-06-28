const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return {
    status: 'SUCCESSFUL',
    data: sales,
  };
};

module.exports = {
  findAll,
};