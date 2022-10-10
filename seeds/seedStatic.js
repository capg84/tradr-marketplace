// const sequelize = require('../config/connection');
// const { Product, Category  } = require('../models');


// const productData = require('./product.json');
// const categoryData = require('./category.json');

// const seedDatabase = async () => {
//     await sequelize.sync({ force: true });
  
   
//     const categories = await Category.bulkCreate(categoryData, {
//       returning: true,
//     });
  
//     const products = await Product.bulkCreate(productData, {
//       returning: true,
//     });
  

  
//     process.exit(0);
//   }
//   seedDatabase();