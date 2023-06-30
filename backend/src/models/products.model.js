const camelize = require('camelize');
const connection = require('./connection');
const { formattedColumnNames, formattedPlaceholders,
  formattedUpdateColumns } = require('../utils/formattedQuery');

const findAll = async () => {
const query = 'SELECT * FROM products ORDER BY id;';

const [products] = await connection.execute(query);

return camelize(products);
};

const findById = async (productId) => {
const query = 'SELECT * FROM products WHERE id = ?';

const [[product]] = await connection.execute(query, [productId]);

return camelize(product);
};

const insert = async (newProduct) => {
const collumns = formattedColumnNames(newProduct);
const placeholders = formattedPlaceholders(newProduct);

const query = `INSERT INTO products (${collumns}) VALUE (${placeholders});`;

const [{ insertId }] = await connection.execute(query, [...Object.values(newProduct)]);

return insertId;
};

const update = async (productId, productToUpdate) => {
  const formattedUpdateColumnsToQuery = formattedUpdateColumns(productToUpdate);
const query = `UPDATE products SET ${formattedUpdateColumnsToQuery} WHERE id = ?;`;

return connection.execute(query, [...Object.values(productToUpdate), productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};