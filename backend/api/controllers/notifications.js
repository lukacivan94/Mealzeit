const Notification = require('../models/notification');

/** (✓)
 * This function handles notification GET requests
 * It finds all notification entries in the database 
 * and returns them in the response
 */
exports.notifications_get_all = (req, res) => {
    Notification.find()
        .select('_id userId eventId date_created type is_read')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                notifications: docs.map(doc => {
                    return {
                        notification: doc,
                        request: {
                            type: 'GET',
                            url: 'https://mealzeit.herokuapp.com/notifications/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles notification GET requests
 * It finds notification entry in the database with the matching id 
 * and returns it in the response
 */
exports.notifications_get_notification = (req, res) => {
    const id = req.params.notificationId;
    Notification.findById(id)
        .select('_id userId eventId memberId date_created type text is_read')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    notification: doc,
                    request: {
                        type: 'GET',
                        url: 'https://mealzeit.herokuapp.com/notifications/'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found ' });
            }
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
};

/** (✓)
 * This function handles notification GET requests
 * It finds notification entries in the database with the matching user id 
 * that are not yet read and returns them in the response
 */
exports.notifications_get_unread_notifications_of_user = (req, res) => {
    const userId = req.params.userId;
    Notification.find({ is_read: false, userId: userId })
        .select('_id userId eventId memberId date_created type text is_read')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                notifications: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        memberId: doc.memberId,
                        text: doc.text,
                        type: doc.type,
                        request: {
                            type: 'GET',
                            url: 'https://mealzeit.herokuapp.com/notifications/' + doc._id,
                            userUrl: 'https://mealzeit.herokuapp.com/users/' + doc.memberId
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles notification DELETE requests
 * It removes the notification entry from the database with the matching id 
 */
exports.notifications_delete_notification = (req, res) => {
    const id = req.params.notificationId;
    Notification.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Notification deleted',
                request: {
                    type: 'POST',
                    url: 'https://mealzeit.herokuapp.com/notifications/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles notification DELETE requests
 * It removes all the notification entries from the database
 */
exports.notifications_delete_all = (req, res) => {
    Notification.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All Notifications deleted',
                request: {
                    type: 'POST',
                    url: 'https://mealzeit.herokuapp.com/notifications/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};
