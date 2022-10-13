const sequelize = require('../config/connection');
const { User, Category, Payment, Product, Address, Purchase, Order, Wishlist, Cart} = require('../models')


const userData = require('./user.json');
const categoryData = require('./category.json');
const productData = require('./product.json');
const paymentData = require('./payment.json');
const addressData = require('./address.json');
const wishlistData = require('./wishlist.json');
const cartData = require('./cart.json');
const purchaseData = require('./purchase.json');
const orderData = require('./order.json');



const seedDatabase = async () => {

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  const payments = await Payment.bulkCreate(paymentData, {
    individualHooks: true,
    returning: true,
  });

  const address = await Address.bulkCreate(addressData, {
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
    returning: true,
  });

  const products = await Product.bulkCreate(productData, {
    returning: true,
  });

  const wishlist = await Wishlist.bulkCreate(wishlistData, {
    returning: true,
  });

  const cart = await Cart.bulkCreate(cartData, {
    returning: true,
  });

  const order = await Order.bulkCreate(orderData, {
    returning: true,
  });

  const purchase = await Purchase.bulkCreate(purchaseData, {
    returning: true,
  });



  process.exit(0);
}
seedDatabase();