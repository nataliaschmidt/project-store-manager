const connection = require('./connection');

const findAll = async () => {
const query = 'SELECT * FROM products ORDER BY id;';

const [products] = await connection.execute(query);

return products;
};

const findyById = async (productId) => {
const query = 'SELECT * FROM products WHERE id = ?';

const [[product]] = await connection.execute(query, [productId]);

return product;
};

module.exports = {
  findAll,
  findyById,
};