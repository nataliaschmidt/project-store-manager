const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsFromServiceSuccessful, productsFromModel, productsIDFromServiceSuccessful, productsFromServiceNotFound, productFromServiceCreated, createdProduct } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS CONTROLLER', function () {
  it('Recuperando todos os produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'findAll').resolves(productsFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });
  it('Recuperando um produto pelo id com sucesso - status 200', async function () {
    sinon.stub(productsService, 'findById').resolves(productsIDFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });
  });

  it('Recuperando um produto pelo id sem sucesso - status 200', async function () {
    sinon.stub(productsService, 'findById').resolves(productsFromServiceNotFound);

    const req = { params: { id: 10 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Inserindo um novo produto - status 201', async function () {
    sinon.stub(productsService, 'insert').resolves(productFromServiceCreated);

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createdProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});
