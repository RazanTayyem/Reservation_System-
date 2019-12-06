const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('env2')('config.env');

exports.auth = (req, res, next) => {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).logged_in;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'something went wrong!' });
      }
      const { id, role } = decoded;
      if (role === 'admin' || role === 'user') {
        req.userId = id;
        req.userRole = role;
        return next();
      }
      return res.json({ error: 'not auth' });
    });
  }
};
