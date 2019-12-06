const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./router');
require('env2')('config.env');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.set('port', process.env.PORT || 3002);
module.exports = app;
