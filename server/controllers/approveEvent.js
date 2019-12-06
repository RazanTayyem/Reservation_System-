const { Event } = require('../database/models');

exports.approveEvent = (req, res) => {
  if (req.userRole === 'admin') {
    Event.update({ status: 1 }, { where: { id: req.params.id } })
      .then((result) => {
        if (result) {
          res.json({ success: true, message: 'status updated' });
        } else {
          res.json({ success: false, message: 'status did not get updated!' });
        }
      })
      .catch(() => res.status(500).json({ error: 'something wrong in query' }));
  } else {
    res.json({ error: 'not auth' });
  }
};
