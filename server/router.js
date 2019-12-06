const express = require('express');
const { login } = require('./controllers/login.js');
const { logout } = require('./controllers/login.js');
const { getEvents } = require('./controllers/getEvents.js');
const { postEvent } = require('./controllers/postEvent.js');
const { approveEvent } = require('./controllers/approveEvent.js');
const { getEvent } = require('./controllers/getEvent.js');
const { checkAuth } = require('./controllers/checkAuth.js');
const { auth } = require('./middlewares/auth.js');
const validate = require('./middlewares/validate.js');
const { loginValidation } = require('./middlewares/validation.js');
const { bookevent } = require('./middlewares/validation.js');
const { getService } = require('./controllers/getService.js');

const router = express.Router();

router.get('/events/:id', auth, getEvents);
router.get('/checkauth', auth, checkAuth);
router.post('/login', validate(loginValidation), login);
router.get('/logout', logout);
router.get('/event/:id', auth, getEvent);
router.put('/event/:id', auth, approveEvent);
router.get('/service', auth, getService);
router.post('/event/:serviceId', auth, validate(bookevent), postEvent);
module.exports = router;
