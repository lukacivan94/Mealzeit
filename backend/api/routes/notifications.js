const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notifications');

/// notifications_delete_notification
/// notifications_delete_all
/// notifications_get_unread_notifications_of_user
router.get('/', NotificationController.notifications_get_all);
router.get('/:notificationId', NotificationController.notifications_get_notification);

module.exports = router;