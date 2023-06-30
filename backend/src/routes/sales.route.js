const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSalesFields = require('../middlewares/validateSalesFields');

route.get('/', salesController.findAllSales);
route.get('/:id', salesController.findById);
route.post('/', validateSalesFields, salesController.insert);
module.exports = route;