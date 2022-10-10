const sequelize = require('../config/connection');
const { User, Category, Payment, Address, Product } = require('../models');

const userData = require('./user.json');
const categoryData = require('./category.json');
const productData = require('./product.json');
const paymentData = require('./payment.json');
const addressData = require('./address.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const categories = await Category.bulkCreate(categoryData, {
  //   returning: true,
  // });

  // const products = await Product.bulkCreate(productData, {
  //   returning: true,
  // });

  // const address = await Address.bulkCreate(addressData, {
  //   returning: true,
  // });

  // const payments = await Payment.bulkCreate(paymentData, {
  //   individualHooks: true,
  //   returning: true,
  // });


  process.exit(0);
}
seedDatabase();