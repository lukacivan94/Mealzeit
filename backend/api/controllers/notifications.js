const Notification = require('../models/notification');

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
                            url: 'http://localhost:3000/notifications/' + doc._id
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
                        url: 'http://localhost:3000/notifications/'
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
exports.notifications_delete_notification = (req, res) => {
    const id = req.params.notificationId;
    Notification.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Notification deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/notifications/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

exports.notifications_delete_all = (req, res) => {
    Notification.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All Notifications deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/notifications/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};