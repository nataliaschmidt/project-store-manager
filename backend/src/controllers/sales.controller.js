const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllSales = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  try {
    const salesId = Number(req.params.id);
    const { status, data } = await salesService.findById(salesId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

const insert = async (req, res) => {
  try {
    const newSale = req.body;
    const { status, data } = await salesService.insert(newSale);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  findAllSales,
  findById,
  insert,
};