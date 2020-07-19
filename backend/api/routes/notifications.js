const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const NotificationsController = require('../controllers/notifications');

router.get('/', NotificationsController.notifications_get_all);
router.get('/:notificationId', checkAuth, NotificationsController.notifications_get_notification);
router.get('/unread/:userId', checkAuth, NotificationsController.notifications_get_unread_notifications_of_user);
router.patch('/:notificationId', checkAuth, NotificationsController.notifications_edit_notification);
router.delete('/:notificationId', checkAuth, NotificationsController.notifications_delete_notification);
router.delete('/', checkAuth, NotificationsController.notifications_delete_all);

module.exports = router;