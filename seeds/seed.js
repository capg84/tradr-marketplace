const sequelize = require("../config/connection");
const { User, Product, Category, Payment, Address } = require("../models");

const userData = require("./user.json");
const productData = require("./product.json");
const addressData = require("./address.json");
const paymentData = require("./payment.json");
const categoryData = require("./category.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const products = await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  const addresses = await Address.bulkCreate(addressData, {
    individualHooks: true,
    returning: true,
  });

  const payments = await Payment.bulkCreate(paymentData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};
seedDatabase();
