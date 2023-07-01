const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAllSales);
route.get('/:id', salesController.findById);
route.post('/', validateSalesFields, salesController.insert);
route.delete('/:id', salesController.remove);
route.put('/:saleId/products/:productId/quantity', salesController.updateQuantity);
module.exports = route;