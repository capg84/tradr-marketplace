const sequelize = require('../config/connection');
const { User, Category, Payment, Product, Address, Purchase, Wishlist, Cart } = require('../models')


const userData = require('./user.json');
const categoryData = require('./category.json');
const productData = require('./product.json');
const paymentData = require('./payment.json');
const addressData = require('./address.json');
const wishlistData = require('./wishlist.json');
const cartData = require('./cart.json');
const purchaseData = require('./purchase.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USERS SEEDED -----\n');
  await Category.bulkCreate(categoryData);
  console.log('\n----- CATEGORIES SEEDED -----\n');
  await Product.bulkCreate(productData);
  console.log('\n----- PRODUCTS SEEDED -----\n');
  await Payment.bulkCreate(paymentData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- PAYMENTS SEEDED -----\n');
  await Address.bulkCreate(addressData);
  console.log('\n----- ADDRESSES SEEDED -----\n');
  await Wishlist.bulkCreate(wishlistData);
  console.log('\n----- WISHLISTS SEEDED -----\n');
  await Cart.bulkCreate(cartData);
  console.log('\n----- CARTS SEEDED -----\n');
  await Purchase.bulkCreate(purchaseData);
  console.log('\n----- PURCHASES SEEDED -----\n');

  process.exit(0);
}
seedDatabase();