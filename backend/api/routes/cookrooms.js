const express = require('express');
const router = express.Router();

const CookroomsController = require('../controllers/cookrooms');

/// cookroom_add_request
/// cookroom_accept_request
/// cookroom_reject_request
router.post('/', CookroomsController.cookrooms_add_cookroom);
router.get('/', CookroomsController.cookrooms_get_all);
router.get('/:cookroomId', CookroomsController.cookrooms_get_cookroom);
router.patch('/:cookroomId', CookroomsController.cookrooms_patch_cookroom);
router.patch('/addreq/:cookroomId/:userId', CookroomsController.cookroom_add_request);
router.patch('/accreq/:cookroomId/:userId', CookroomsController.cookroom_accept_request);
router.delete('/:cookroomId', CookroomsController.cookrooms_delete_cookroom);
router.delete('/', CookroomsController.cookrooms_delete_all);

module.exports = router;