const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromModel } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL', function () {
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromModel]);

    const responseModel = await salesModel.findAll();

    expect(responseModel).to.be.an('array');
    expect(responseModel).to.have.length(3);
    expect(responseModel).to.be.deep.equal(salesFromModel);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});