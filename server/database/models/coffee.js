const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const Coffee = sequelize.define('coffee', {
  price: {
    type: Sequelize.FLOAT,
  },
  note: {
    type: Sequelize.TEXT,
  },
  time: {
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
});
module.exports = Coffee;
