const Address = require('./Address');
const Cart = require('./Cart');
const Category = require('./Category')
const Payment = require('./Payment')
const Product = require('./Product')
const User = require('./User')
const Wishlist = require('./Wishlist')

User.belongsTo(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Cart.belongsTo(User, {
    foreignKey: 'user_id'
});


User.hasMany(Address, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Address.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Payment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Payment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Wishlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Wishlist.belongsTo(User, {
    foreignKey: 'user_id'
});


Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Cart.hasMany(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(Cart, {
    foreignKey: 'product_id'
});

Wishlist.hasMany(Product, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(Wishlist, {
    foreignKey: 'product_id'
});


module.exports = { Address, Cart, Category, Payment, Product, User, Wishlist };