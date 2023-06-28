const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsFromServiceSuccessful, productsFromModel } = require('../mocks/products.mock');

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
  afterEach(function () {
    sinon.restore();
  });
});