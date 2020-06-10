const Event = require('../models/event');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.events_get_all = (req, res, next) => {
    event.find()
    .select('users _id ')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
                return {
                    first_name: doc.first_name,
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


exports.events_get_event =  (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
    .select('location date_time date_of_publish list_of_recipes course_rating is_virtual price_of_course is_included_in_premium number_of_participants users instant_join description is_volunteering required_items suggested_price')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                event: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/events/'
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found '});
        }
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err});
    });
};

exports.events_patch_event =  (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    };
    Event.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'event updated',
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

exports.events_delete_event =  (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'event deleted',
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

exports.events_delete_all =  (req, res, next) => {
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