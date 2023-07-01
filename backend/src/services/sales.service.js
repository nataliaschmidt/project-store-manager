const { salesModel, productModel } = require('../models'); // importar novamente o productModel
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

  const foundProduct = await Promise.all(newSale.map(async ({ productId, _quantity }) => {
    const checkExistProduct = await productModel.findById(productId);
    return checkExistProduct;
  }));

  if (foundProduct.includes(undefined)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' },
    };
  }

  const salesId = await salesModel.insertSales(newSale);
  return { status: 'CREATED', data: { id: salesId, itemsSold: newSale },
  };
};

const remove = async (saleId) => {
  const isSaleValid = await salesModel.findById(saleId);
  if (isSaleValid.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  await salesModel.remove(saleId);
  return { status: 'DELETED' };
};

const validateIdProdutc = async (idProduct) => {
  const foundProduct = await productModel.findById(idProduct);
  if (!foundProduct) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
  return foundProduct;
};

const validateIdSale = async (idSale) => {
  const foundSale = await salesModel.findById(idSale);
  if (foundSale.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return foundSale;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) {
    return { status: 'INVALID_VALUE',
    data: { message: '"quantity" must be greater than or equal to 1' } };
  }
  
  if (!quantity) {
    return { status: 'REQUIRED_VALUE', data: { message: '"quantity" is required' } };
  }
};

const updateQuantity = async (updateQuantityInfos) => {
const errorQuantity = validateQuantity(updateQuantityInfos.quantity);
if (errorQuantity) return errorQuantity;

const foundProduct = await validateIdProdutc(updateQuantityInfos.productId);
if (foundProduct.status === 'NOT_FOUND') return foundProduct;

const foundSale = await validateIdSale(updateQuantityInfos.saleId);
if (foundSale.status === 'NOT_FOUND') return foundSale;

await salesModel.updateQuantity(updateQuantityInfos);

return { status: 'SUCCESSFUL',
data: { 
  date: new Date(),
  productId: updateQuantityInfos.productId,
  quantity: updateQuantityInfos.quantity,
  saleId: updateQuantityInfos.saleId,
 } };
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
  updateQuantity,
};