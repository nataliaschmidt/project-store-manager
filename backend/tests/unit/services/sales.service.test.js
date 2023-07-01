const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { salesFromModel, newSaleFromService, salesFoundById } = require('../mocks/sales.mock');
const { productByIdFromModel } = require('../mocks/products.mock');

describe('Realizando testes - SALES SERVICE', function () {
  it('Recuperando todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

    const responseService = await salesService.findAll();
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando vendas por id de vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFromModel);

    const saleId = 1;
    const responseService = await salesService.findById(saleId);
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando um produto por id sem sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const saleId = 10;
    const responseService = await salesService.findById(saleId);
    
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Inserindo uma nova venda com sucesso', async function () {
    sinon.stub(salesModel, 'insertSales').resolves(4);
    sinon.stub(productModel, 'findById').resolves(newSaleFromService);
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
    const responseService = await salesService.insert(newSale);
    
    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(newSaleFromService);
  });

  it('Deletando uma venda', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFoundById);
    sinon.stub(salesModel, 'remove').resolves();
    const salesId = 1;

    const responseService = await salesService.remove(salesId);

    expect(responseService.status).to.be.equal('DELETED');
  });

  it('Deletando uma venda inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const saleId = 10;

    const responseService = await salesService.remove(saleId);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Editando a quantidade de um produto na venda com sucesso', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    sinon.stub(salesModel, 'findById').resolves(salesFoundById);

    const stubDate = new Date('2023-07-01T13:53:09.015Z');
    sinon.stub(global, 'Date').returns(stubDate);

    const update = {
      saleId: 1,
      productId: 1,
      quantity: 50,
    };
    const responseService = await salesService.updateQuantity(update);
    
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({
      date: stubDate,
      productId: 1,
      quantity: 50,
      saleId: 1,
    });
  });

  it('Editando a quantidade de um produto passando um id de produto inválido', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    sinon.stub(productModel, 'findById').resolves(undefined);
   
    const update = {
      saleId: 1,
      productId: 10,
      quantity: 50,
    };
    const responseService = await salesService.updateQuantity(update);
    
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  it('Editando a quantidade de um produto passando um id de venda inválido', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    sinon.stub(salesModel, 'findById').resolves([]);

    const update = {
      saleId: 10,
      productId: 1,
      quantity: 50,
    };
    const responseService = await salesService.updateQuantity(update);
    
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Editando a quantidade de um produto na venda passando uma quantidade 0', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    sinon.stub(salesModel, 'findById').resolves(salesFoundById);

    const update = {
      saleId: 1,
      productId: 1,
      quantity: 0,
    };
    const responseService = await salesService.updateQuantity(update);
    
    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });
  
  it('Editando a quantidade de um produto na venda não informando o campo de quantidade', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves();
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);
    sinon.stub(salesModel, 'findById').resolves(salesFoundById);

    const update = {
      saleId: 1,
      productId: 1,
    };
    const responseService = await salesService.updateQuantity(update);
    
    expect(responseService.status).to.be.equal('REQUIRED_VALUE');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: '"quantity" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});