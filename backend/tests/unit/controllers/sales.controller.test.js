const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromModel, salesSuccessful } = require('../mocks/sales.mock');

describe('Realizando testes - SALES CONTROLLER', function () {
  it('Recuperando tas as vendas com sucesso - status 200', async function () {
    sinon.stub(salesService, 'findAll').resolves(salesSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});