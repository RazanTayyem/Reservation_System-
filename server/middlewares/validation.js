const Joi = require('joi');

const loginValidation = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

const bookevent = {
  title: Joi.string().required(),
  start_date: Joi.date().required(),
  note: Joi.string().required(),
  capacity: Joi.number().required(),
  lunch_note: Joi.string().required(),
  coffee_note: Joi.string().required(),
  equipment_note: Joi.string().required(),
  org_name: Joi.string().required(),
  end_date: Joi.date().required(),
  price: Joi.number().required(),
  lunch_price: Joi.number().required(),
  lunch_time: Joi.string().required(),
  coffee_price: Joi.number().required(),
  coffee_time: Joi.string().required(),
  equipment_price: Joi.number().required(),
};
module.exports = {
  loginValidation,
  bookevent,
};
