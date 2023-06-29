const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { salesFromModel } = require('../mocks/sales.mock');

describe('Realizando testes - SALES SERVICE', function () {
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseService = await salesService.findAll();
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(salesFromModel);
  });
  afterEach(function () {
    sinon.restore();
  });
});