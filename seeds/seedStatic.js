const sequelize = require('../config/connection');
const { Product, Category } = require('../models');

const categoryData = require('./category.json');
const productData = require('./product.json');

const seedStaticDb = async () => {
    await sequelize.sync({ force: true });
  
  
    const categories = await Category.bulkCreate(categoryData, {
      individualHooks: true,
      returning: true,
    });
  
    const products = await Product.bulkCreate(productData, {
      individualHooks: true,
      returning: true,
    });
  
  
  
    process.exit(0);
  }
  
  seedStaticDb();