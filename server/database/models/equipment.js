const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const Equipment = sequelize.define('equipment', {
  price: {
    type: Sequelize.FLOAT,
  },
  note: {
    type: Sequelize.TEXT,
  },
  createdAt: {
    type: Sequelize.DATE(),
    defaultValue: sequelize.literal('NOW()'),
  },
  updatedAt: {
    type: Sequelize.DATE(),
    defaultValue: sequelize.literal('NOW()'),
  },
});
module.exports = Equipment;
