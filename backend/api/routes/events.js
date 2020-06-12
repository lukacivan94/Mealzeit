const express = require('express');
const router = express.Router();

const EventsController = require('../controllers/events');

/// event_add_request
/// event_accept_request
/// event_reject_request
router.get('/', EventsController.events_get_all);
router.get('/:eventId', EventsController.events_get_event);
router.post('/', EventsController.events_add_event);
router.patch('/:eventId', EventsController.events_patch_event);
router.delete('/:eventId', EventsController.events_delete_event);
router.delete('/', EventsController.events_delete_all);

module.exports = router;