const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
FROM sales_products AS sp
INNER JOIN sales AS s ON sp.sale_id = s.id
ORDER BY sale_id, product_id;`;

const [sales] = await connection.execute(query);

return camelize(sales);
};

module.exports = {
  findAll,
};