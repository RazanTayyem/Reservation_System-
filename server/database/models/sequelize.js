const Sequelize = require('sequelize');

require('env2')('config.env');

// init sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

module.exports = sequelize;
