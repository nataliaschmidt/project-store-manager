const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { productsFromDB, productsFromModel } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS SERVICE', function () {
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);

    const responseService = await productsService.findAll();
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(productsFromModel);
  });
  afterEach(function () {
    sinon.restore();
  });
});