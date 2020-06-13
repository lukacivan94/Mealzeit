const Notification = require('../models/notification');

exports.notifications_get_all = (req, res, next) => {
    Notification.find()
        .select('_id notificationId userId eventId memberId date_created text is_read')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                notification: docs.map(doc => {
                    return {
                        notificationId: doc.notificationId,
                        _id: doc._id,
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

exports.notifications_get_notification = (req, res, next) => {
    const id = req.params.userID;
    Notification.findById(id)
        .select('_id notificationId userId eventID memberId date_created text is_read')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    notificationId: doc.notificationId,
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