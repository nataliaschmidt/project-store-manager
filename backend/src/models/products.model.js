const connection = require('./connection');

const findAll = async () => {
const query = 'SELECT * FROM products;';

const [products] = await connection.execute(query);
return products;
};

module.exports = {
  findAll,
};