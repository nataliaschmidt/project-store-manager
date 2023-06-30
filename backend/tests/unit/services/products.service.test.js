const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { productsFromDB, productsFromModel, productByIdFromModel, createdProduct, updatedProduct } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS SERVICE', function () {
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);

    const responseService = await productsService.findAll();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService.data).to.be.deep.equal(productsFromModel);
  });
  it('Recuperando um produto por id com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(productByIdFromModel);

    const id = 1;
    const responseService = await productsService.findById(id);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(productByIdFromModel);
  });
  it('Recuperando um produto por id sem sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const id = 100;
    const responseService = await productsService.findById(id);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Inserindo um novo produto', async function () {
    sinon.stub(productModel, 'insert').resolves(4);
    sinon.stub(productModel, 'findById').resolves(createdProduct);

    const newProduct = {
      name: 'ProdutoX',
    };

    const responseService = await productsService.insert(newProduct);

    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(createdProduct);
  });

  it('Erro ao inserir um novo produto com o o nome menor do que 5 caracteres', async function () {
    const newProduct = {
      name: 'Pr',
    };

    const responseService = await productsService.insert(newProduct);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Atualizando um produto', async function () {
    sinon.stub(productModel, 'update').resolves(updatedProduct);
    sinon.stub(productModel, 'findById').resolves(updatedProduct);

    const updateProduct = {
      name: 'Martelo do Batman',
    };
    const productId = 1;

    const responseService = await productsService.update(productId, updateProduct);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(updatedProduct);
  });

  it('Erro ao atualizar um novo produto com o o nome menor do que 5 caracteres', async function () {
    const updateProduct = {
      name: 'Ma',
    };
    const productId = 1;

    const responseService = await productsService.update(productId, updateProduct);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Atualizando um produto não existente', async function () {
    sinon.stub(productModel, 'update').resolves(undefined);
    sinon.stub(productModel, 'findById').resolves(undefined);

    const updateProduct = {
      name: 'Martelo do Batman',
    };
    const productId = 10;

    const responseService = await productsService.update(productId, updateProduct);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Deletando um produto', async function () {
    sinon.stub(productModel, 'findById').resolves(updatedProduct);
    sinon.stub(productModel, 'remove').resolves();
    const productId = 1;

    const responseService = await productsService.remove(productId);

    expect(responseService.status).to.be.equal('DELETED');
  });

  it('Deletando um produto inexistente', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    sinon.stub(productModel, 'remove').resolves();
    const productId = 10;

    const responseService = await productsService.remove(productId);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});