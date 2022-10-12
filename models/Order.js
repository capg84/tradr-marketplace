const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'purchase',
        key: 'id',
        // unique: false
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        // unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
  }
);

module.exports = Order;
