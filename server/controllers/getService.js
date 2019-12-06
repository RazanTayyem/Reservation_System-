const { Service } = require('../database/models');

exports.getService = (req, res) => {
  Service.findAll()
    .then((data) => {
      if (!data) return res.status(401).json({ massage: 'no services' });
      return res.json(data);
    })
    .catch(err => res.status(401).json({ message: err }));
};
