const route = require('express').Router();
const { productsController } = require('../controllers');
const validadeNameExist = require('../middlewares/validateName');

route.get('/', productsController.findAllProducts);
route.get('/:id', productsController.findProductById);
route.post('/', validadeNameExist, productsController.insert);

module.exports = route;