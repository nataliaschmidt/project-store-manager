const { salesModel } = require('../models'); // importar novamente o productModel
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return {
    status: 'SUCCESSFUL',
    data: sales,
  };
};

const findById = async (salesId) => {
  const salesFoundById = await salesModel.findById(salesId);

  if (salesFoundById.length !== 0) {
    return {
      status: 'SUCCESSFUL',
      data: salesFoundById,
    };
  }

  return {
    status: 'NOT_FOUND',
    data: { message: 'Sale not found' },
  };
};

const insert = async (newSale) => {
  const errorQuantity = schema.validateQuantitySalesField(newSale);
  if (errorQuantity) {
    return { status: errorQuantity.status, data: errorQuantity.message };
  }

  // const foundProduct = await Promise.all(newSale.map(async ({ productId, _quantity }) => {
  //   const checkExistProduct = await productModel.findyById(productId);
  //   return checkExistProduct;
  // }));

  // if (foundProduct.includes(undefined)) {
  //   return { status: 'NOT_FOUND', data: { message: 'Product not found' },
  //   };
  // }

  const salesId = await salesModel.insertSales(newSale);
  return { status: 'CREATED', data: { id: salesId, itemsSold: newSale },
  };
};

module.exports = {
  findAll,
  findById,
  insert,
};