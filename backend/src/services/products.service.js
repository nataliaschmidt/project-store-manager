const { productModel } = require('../models');
const { validateNameProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return {
    status: 'SUCCESSFUL',
    data: products,
  };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (product) {
    return {
      status: 'SUCCESSFUL',
      data: product,
    };
  }
  return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
};

const insert = async (newProduct) => {
  const error = validateNameProduct(newProduct);
  if (error) return { status: error.status, data: { message: error.message } };

  const insertId = await productModel.insert(newProduct);

  const newProductInserted = await productModel.findById(insertId);
  if (newProductInserted) {
    return {
      status: 'CREATED',
      data: newProductInserted,
    };
  }
};

const update = async (productId, productToUpdate) => {
  const error = validateNameProduct(productToUpdate);
  if (error) return { status: error.status, data: { message: error.message } };

  await productModel.update(productId, productToUpdate);

  const updatedProduct = await productModel.findById(productId);
  if (updatedProduct) {
    return { status: 'SUCCESSFUL', data: updatedProduct };
  } return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
};

const remove = async (productId) => {
  const isProductValid = await productModel.findById(productId);
console.log(isProductValid);
  if (!isProductValid) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await productModel.remove(productId);
  return { status: 'DELETED' };
};

const search = async (searchProduct) => {
  const searchedProduct = await productModel.search(searchProduct);
  return { status: 'SUCCESSFUL',
  data: searchedProduct };
  };
  
module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  search,
};