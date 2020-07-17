const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CookroomsController = require('../controllers/cookrooms');

router.post('/',checkAuth, CookroomsController.cookrooms_add_cookroom);
router.get('/', CookroomsController.cookrooms_get_all);
router.get('/ofuser/:userId',checkAuth, CookroomsController.cookrooms_get_cookrooms_of_user);
router.get('/:cookroomId', CookroomsController.cookrooms_get_cookroom);
router.patch('/:cookroomId',checkAuth, CookroomsController.cookrooms_patch_cookroom);
router.patch('/addreq/:cookroomId/:userId',checkAuth, CookroomsController.cookroom_add_request);
router.patch('/accreq/:cookroomId/:userId',checkAuth, CookroomsController.cookroom_accept_request);
router.patch('/rejectreq/:cookroomId/:userId',checkAuth, CookroomsController.cookroom_reject_request);
router.patch('/leave/:cookroomId/:userId',checkAuth, CookroomsController.cookroom_leave_cookroom);
router.patch('/cancel/:cookroomId/',checkAuth, CookroomsController.cookrooms_cancel_cookroom);
router.delete('/:cookroomId',checkAuth, CookroomsController.cookrooms_delete_cookroom);
router.delete('/',checkAuth, CookroomsController.cookrooms_delete_all);

module.exports = router;