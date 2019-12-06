const {
  Event, Coffee, Lunch, Equipment,
} = require('../database/models');

exports.postEvent = (req, res) => {
  const { userId } = req;
  const { serviceId } = req.params;
  const {
    title,
    start_date,
    end_date,
    org_name,
    price,
    capacity,
    note,
    coffee_note,
    coffee_price,
    coffee_time,
    lunch_note,
    lunch_price,
    lunch_time,
    equipment_price,
    equipment_note,
  } = req.body;

  Event.create({
    title,
    start_date,
    end_date,
    org_name,
    price,
    capacity,
    note,
    serviceId,
    status: 0,
    userId,
    raw: true,
  })
    .then(result => Coffee.create({
      price: coffee_price,
      note: coffee_note,
      time: coffee_time,
      eventId: result.dataValues.id,
    }))
    .then(result => Lunch.create({
      price: lunch_price,
      note: lunch_note,
      time: lunch_time,
      eventId: result.dataValues.eventId,
    }))
    .then(result => Equipment.create({
      price: equipment_price,
      note: equipment_note,
      eventId: result.dataValues.eventId,
    }))
    .then(() => {
      res.json({ success: 'event has been added' });
    })
    .catch(() => res.status(500).json({ error: 'something wrong in query ' }));
};
