const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Payment extends Model { }

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
   hooks: {
    beforeCreate: async (obj) => {
      obj.card_number = await bcrypt.hash(obj.card_number, 10);
      obj.expiry_date = await bcrypt.hash(obj.expiry_date, 10);
      return obj;
    },
    beforeUpdate: async (obj) => {
      obj.card_number = await bcrypt.hash(obj.card_number, 10);
      obj.expiry_date = await bcrypt.hash(obj.expiry_date, 10);
      return obj;
    },
      // beforeCreate: async (newExpiry) => {
      //   newExpiry.expiry_date = await bcrypt.hash(newExpiry.expiry_date, 10);
      //   return newExpiry;
      // },
      // beforeUpdate: async (updatedExpiry) => {
      //   updatedExpiry.expiry_date = await bcrypt.hash(updatedExpiry.expiry_date, 10);
      //   return updatedExpiry;
      // },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'payment',
  }
);

module.exports = Payment;