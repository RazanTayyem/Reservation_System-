const {
  Event, Coffee, Lunch, Equipment,
} = require('../database/models');

exports.getEvent = (req, res) => {
  const { id } = req.params;
  const { userRole } = req;

  Event.findOne({ where: { id }, raw: true })
    .then((event) => {
      Coffee.findOne({ where: { eventId: id }, raw: true }).then((coffee) => {
        Lunch.findOne({ where: { eventId: id }, raw: true }).then((lunch) => {
          Equipment.findOne({ where: { eventId: id }, raw: true }).then((equipment) => {
            if (!event) {
              return res.status(401).json({ message: 'no event exists' });
            }
            return res.json({
              userRole,
              event,
              coffee,
              lunch,
              equipment,
            });
          });
        });
      });
    })
    .catch(err => res.status(500).json({ message: err }));
};
