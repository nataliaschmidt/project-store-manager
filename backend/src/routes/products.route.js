const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.findAllProducts);

module.exports = route;