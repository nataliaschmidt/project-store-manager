const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromModel, salesSuccessful, salesByIdSuccessful, salesFoundById, salesByIdNotFound, newSalesCreated, newSaleFromService, saleNotFound, updateQuantity } = require('../mocks/sales.mock');

describe('Realizando testes - SALES CONTROLLER', function () {
  it('Recuperando todas as vendas com sucesso - status 200', async function () {
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

  it('Recuperando vendas pelo id de venda com sucesso - status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdSuccessful);

    const req = { params: { id: 10 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFoundById);
  });

  it('Recuperando vendas pelo id de venda sem sucesso - status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdNotFound);

    const req = { params: { id: 10 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Inserindo uma nova venda com sucesso - status 201', async function () {
    sinon.stub(salesService, 'insert').resolves(newSalesCreated);

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

    const req = { params: { }, body: { newSale } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleFromService);
  });

  it('Deletando uma venda - status 204', async function () {
    sinon.stub(salesService, 'remove').resolves({ status: 'DELETED' });

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.remove(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  
  it('Deletando uma venda inexistente - status 404', async function () {
    sinon.stub(salesService, 'remove').resolves(saleNotFound);

    const req = { params: { id: 10 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.remove(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleNotFound.data);
  });

  it('Alterando a quantidade de uma venda com sucesso - status 200', async function () {
    sinon.stub(salesService, 'updateQuantity').resolves(updateQuantity);

    const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 50 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateQuantity(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateQuantity.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});