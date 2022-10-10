const sequelize = require('../config/connection');
const { User, Payment, Address } = require('../models');

const userData = require('./user.json');
const addressData = require('./address.json');
const paymentData = require('./payment.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const addresses = await Address.bulkCreate(addressData, {
    returning: true,
  });

  const payments = await Payment.bulkCreate(paymentData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
}


seedDatabase();