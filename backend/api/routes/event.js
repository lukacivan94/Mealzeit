const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');

const Event = require('../models/event');

const EventsController = require('../controllers/events');

router.get('/', EventsController.events_get_all);
router.get('/:eventId', EventsController.events_get_event);
router.patch('/:eventId', EventsController.events_patch_event);
router.delete('/:eventId', EventsController.events_delete_event);
router.delete('/', EventsController.events_delete_all);

module.exports = router;