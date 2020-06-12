const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notifications');

<<<<<<< HEAD
router.get('/', NotificationController.notification_get_all);
router.get('/:notificationId', NotificationController.notification_get_notification);
=======
/// notifications_delete_notification
/// notifications_delete_all
/// notifications_get_unread_notifications_of_user
router.get('/', NotificationController.notifications_get_all);
router.get('/:notificationId', NotificationController.notifications_get_notification);
>>>>>>> 0cfdd3f37b5f050407cd1cf193778d54bf534013

module.exports = router;