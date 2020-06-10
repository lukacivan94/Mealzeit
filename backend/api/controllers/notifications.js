const Notification = require('../models/notification');

exports.notification_get_all = (req, res, next) => {
    Notification.find()
        .select('userId _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                notification: docs.map(doc => {
                    return {
                        userId: doc.userId,
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

exports.notification_get_recipe = (req, res, next) => {
    const id = req.params.userID;
    Recipe.findById(id)
        .select('')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/recipes/'
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