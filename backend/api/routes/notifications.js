const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notifications');

router.get('/', NotificationController.notification_get_all);
router.get('/:notificationId', NotificationController.notification_get_notification);

module.exports = router;