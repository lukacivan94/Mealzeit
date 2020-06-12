const mongoose = require("mongoose");
const Event = require('../models/event');
const User = require("../models/user");

exports.events_add_event = (req, res, next) => {
    const userId = req.body.userId;
    let eventId;
    const today = new Date();
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const event = new Event({
                _id: new mongoose.Types.ObjectId(),
                userId: userId,
                title: req.body.title,
                location: req.body.location,
                date_time: req.body.date_time,
                date_of_publish: today,
                
                list_of_recipes: req.body.list_of_recipes,
                is_virtual: req.body.is_virtual,
                price_of_course: req.body.price_of_course,
                is_included_in_premium: req.body.is_included_in_premium,
                number_of_members: req.body.number_of_members,

                members: [userId],
                instant_join: req.body.instant_join,
                requests: [],
                description: req.body.description,
                is_volunteering: req.body.is_volunteering,
                required_items: req.body.required_items,
                suggested_price: req.body.suggested_price
            });
            eventId = event._id;
            return event
                .save()
                .then(doc =>
                    User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { created_events: [doc._id] } }
                    )
                );
        })
        .then(result => {
            res.status(201).json({
                message: "Event saved",
                eventId: eventId,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/events/"
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.events_get_all = (req, res, next) => {
    Event.find()
        .select('_id users')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                events: docs.map(doc => {
                    return {
                        userId: doc.userId,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/events/' + doc._id
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


exports.events_get_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
        .select('location date_time date_of_publish list_of_recipes course_rating is_virtual price_of_course is_included_in_premium number_of_members members instant_join description is_volunteering required_items suggested_price')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    event: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/events/'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found ' });
            }
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({ error: err });
        });
};

exports.events_patch_event = (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };
    Event.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/events/' + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.events_delete_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/events/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

exports.events_delete_all = (req, res, next) => {
    Event.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All events deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/events/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};