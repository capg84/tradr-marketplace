const sequelize = require('../config/connection');
const { User, Category, Payment, Product, Address, Purchase, Order } = require('../models');

const userData = require('./user.json');
const categoryData = require('./category.json');
const productData = require('./product.json');
const paymentData = require('./payment.json');
const addressData = require('./address.json');
const purchaseData = require('./purchase.json');
const orderData = require('./order.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SYNCED -----\n');
  await Category.bulkCreate(categoryData);
  console.log('\n----- CATEGORIES SYNCED -----\n');
  await Payment.bulkCreate(paymentData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- PAYMENTS SYNCED -----\n');
  await Address.bulkCreate(addressData);
  console.log('\n----- ADDRESSES SYNCED -----\n');
  await Product.bulkCreate(productData);
  console.log('\n----- PRODUCTS SYNCED -----\n');
  await Purchase.bulkCreate(purchaseData);
  console.log('\n----- PURCHASES SYNCED -----\n');
  await Order.bulkCreate(orderData);
  console.log('\n----- ORDERS SYNCED -----\n');
  process.exit(0);
}
seedDatabase();