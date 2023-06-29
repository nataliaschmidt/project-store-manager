// const salesFromDB = [
//   {
//     sale_id: 1,
//     date: '2023-06-28T23:40:51.000Z',
//     product_id: 1,
//     quantity: 5,
//   },
//   {
//     sale_id: 1,
//     date: '2023-06-28T23:40:51.000Z',
//     product_id: 2,
//     quantity: 10,
//   },
//   {
//     sale_id: 2,
//     date: '2023-06-28T23:40:51.000Z',
//     product_id: 3,
//     quantity: 15,
//   },
// ];

const salesFromModel = [
  {
    saleId: 1,
    date: '2023-06-28T23:40:51.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-28T23:40:51.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-28T23:40:51.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

module.exports = {
  salesFromModel,
  salesSuccessful,
};