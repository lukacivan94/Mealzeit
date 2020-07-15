const express = require('express');
const router = express.Router();

const CookroomsController = require('../controllers/cookrooms');

router.post('/', CookroomsController.cookrooms_add_cookroom);
router.get('/', CookroomsController.cookrooms_get_all);
router.get('/ofuser/:userId', CookroomsController.cookrooms_get_cookrooms_of_user);
router.get('/:cookroomId', CookroomsController.cookrooms_get_cookroom);
router.patch('/:cookroomId', CookroomsController.cookrooms_patch_cookroom);
router.patch('/addreq/:cookroomId/:userId', CookroomsController.cookroom_add_request);
router.patch('/accreq/:cookroomId/:userId', CookroomsController.cookroom_accept_request);
router.patch('/rejectreq/:cookroomId/:userId', CookroomsController.cookroom_reject_request);
router.patch('/leave/:cookroomId/:userId', CookroomsController.cookroom_leave_cookroom);
router.patch('/cancel/:cookroomId/', CookroomsController.cookrooms_cancel_cookroom);
router.delete('/:cookroomId', CookroomsController.cookrooms_delete_cookroom);
router.delete('/', CookroomsController.cookrooms_delete_all);

module.exports = router;