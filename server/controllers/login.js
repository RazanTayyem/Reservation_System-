const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('env2')('config.env');

const { User } = require('../database/models');

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: { username },
    raw: true,
  })
    .then((result) => {
      if (!result) {
        return res.json({ error: 'user not found' });
      }

      bcrypt.compare(password, result.password, (err, result2) => {
        if (err) {
          return res.json({ error: 'something went wrong!' });
        }
        if (result2) {
          const { id, role } = result;
          const token = jwt.sign({ id, username, role }, process.env.SECRET);
          return res.cookie('logged_in', token, { maxAge: 999999999 }).json({ success: 'true', token });
        }
        return res.json({ error: 'password does not match' });
      });
    })
    .catch(() => res.status(500).json({ error: 'error in server' }));
};

exports.logout = (req, res) => {
  res.clearCookie('logged_in');
  res.end();
};
