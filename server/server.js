const app = require('./app.js');
const { sequelize } = require('./database/models/');

sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
  console.log('Our app running on port', app.get('port')); //eslint-disable-line
  });
});