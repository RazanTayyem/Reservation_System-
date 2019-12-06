const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const Service = sequelize.define('services', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  equipment: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE(),
    defaultValue: sequelize.literal('NOW()'),
  },
  updatedAt: {
    type: Sequelize.DATE(),
    defaultValue: sequelize.literal('NOW()'),
  },

}, { freezeTableName: true });
module.exports = Service;
