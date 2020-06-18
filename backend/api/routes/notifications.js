const express = require('express');
const router = express.Router();

const NotificationsController = require('../controllers/notifications');

/// notifications_delete_notification
/// notifications_delete_all
/// notifications_get_unread_notifications_of_user
router.delete('/:notificationId', NotificationsController.notifications_delete_notification);
router.delete('/', NotificationsController.notifications_delete_all);
router.get('/', NotificationsController.notifications_get_all);
router.get('/:notificationId', NotificationsController.notifications_get_notification);

module.exports = router;