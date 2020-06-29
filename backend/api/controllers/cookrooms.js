const mongoose = require("mongoose");
const Cookroom = require('../models/cookroom');
const User = require("../models/user");
const Notification = require('../models/notification');

/** (✓)
 * This function handles cookroom POST requests
 * It first checks if the user exists
 * then creates new Cookroom object, saves it to database 
 * and updates the user's created_cookrooms field with cookroom's id
 */
exports.cookrooms_add_cookroom = (req, res) => {
    const userId = req.body.userId;
    let cookroomId;
    const today = new Date();
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const cookroom = new Cookroom({
                _id: new mongoose.Types.ObjectId(),
                userId: userId,
                title: req.body.title,
                location: req.body.location,
                date_of_publish: today,
                description: req.body.description,
                members: [],
                number_of_members: req.body.number_of_members,
                date_time: req.body.date_time,
                recipe: req.body.recipe,
                invited_friends: req.body.invited_friends,
                instant_join: req.body.instant_join,
                requests: [],
                is_volunteering: req.body.is_volunteering,
                required_items: req.body.required_items,
                suggested_price: req.body.suggested_price
            });
            cookroomId = cookroom._id;
            return cookroom
                .save()
                .then(doc =>
                    User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { created_cookrooms: [doc._id] } }
                    )
                );
        })
        .then(result => {
            res.status(201).json({
                message: "Cookroom saved",
                cookroomId: cookroomId,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/cookrooms/" + cookroomId
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

/** (✓)
 * This function handles cookroom GET requests
 * It finds all cookroom entries in the database 
 * and returns them in the response
 */
exports.cookrooms_get_all = (req, res) => {
    Cookroom.find()
        .select('_id userId title')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                cookrooms: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        title: doc.title,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cookrooms/' + doc._id
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
 * This function handles cookroom GET requests
 * It finds cookroom entry in the database with the matching id 
 * and returns it in the response
 */
exports.cookrooms_get_cookroom = (req, res) => {
    const id = req.params.cookroomId;
    Cookroom.findById(id)
        .select('_id userId title location date_of_publish description members number_of_members date_time recipe invited_friends instant_join requests is_volunteering required_items suggested_price')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    cookroom: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/cookrooms/'
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

/** (✓)
 * This function handles cookroom PATCH requests
 * It finds cookroom entry in the database with the matching id 
 * and updates the cookroom's properties
 */
exports.cookrooms_patch_cookroom = (req, res) => {
    const id = req.params.cookroomId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };
    Cookroom.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Cookroom updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/cookrooms/' + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// After the user requested to join the cookroom, adds the user id to cookroom's requests
// and adds the request notification to the host of the cookroom
exports.cookroom_add_request = (req, res) => {
    const cookroomId = req.params.cookroomId;
    const userId = req.params.userId; //User who requested to join the cookroom
    Cookroom.update({ _id: cookroomId }, { $addToSet: { requests: [userId] } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Cookroom updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/cookrooms/" + cookroomId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    makeRequestNotification(cookroomId, userId);
};

async function makeRequestNotification(cookroomId, userId) {
    let hostId;
    let title;
    // We first find the cookroom which the user requested to join
    try {
        await Cookroom.findById(cookroomId)
            .then(function (data) {
                hostId = data.userId; // User who created the cookroom
                title = data.title; // Title of the cookroom
                console.log(hostId, title);
            });
    } catch (error) {
        console.log("Following error happened: " + error);
    }
    console.log(hostId);
    // We create a new notification for the host (hostId), triggered by a member (userId)
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: hostId,
        eventId: cookroomId,
        memberId: userId,
        date_created: new Date(),
        type: "request",
        text: "You have a new request for " + title,
        isRead: false,
    });
    return notification
        .save()
        .then(doc =>
            // We add the notification id to host's notification array
            User.findOneAndUpdate(
                { _id: hostId },
                { $addToSet: { notifications: [doc._id] } }
            )
        );
}


/*
 * After the cookroom host accepted the request, removes the user id from 
 * cookroom's requests array and adds it to cookroom's members array, 
 * additionally makes accept notification for the user that was accepted
 */
exports.cookroom_accept_request = (req, res) => {
    const cookroomId = req.params.cookroomId;
    const userId = req.params.userId; //User which is accepted to join
    Cookroom.update(
      { _id: cookroomId },
      { $pull: { requests: { $in: [userId] } }, $addToSet: { members: [userId] } }
    )
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Cookroom updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/cookrooms/" + cookroomId
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
    makeAcceptNotification(cookroomId, userId);
  };
  
  async function makeAcceptNotification(cookroomId, userId) {
    let hostId;
    let title;
    try {
        await Cookroom.findById(cookroomId)
            .then(function (data) {
                hostId = data.userId; // User who created the cookroom
                title = data.title; // Title of the cookroom
                console.log(hostId, title);
            });
    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
      _id: new mongoose.Types.ObjectId(),
      userId: userId, //User which is accepted to join
      cookroomId: cookroomId,
      memberId: hostId, //Host who accepted the join request
      date: new Date(),
      type: "acceptance",
      text: "Your request to join " + title + " was accepted.",
      isRead: false,
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { joined_cookrooms: [cookroomId] } }
    );
    return notification
      .save()
      .then(doc =>
        User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { notifications: [doc._id] } }
        )
      );
  }
  /*
 * After the cookroom host rejected the request, removes the user id from
 * cookrooms's requests array and makes a rejection notification for user
 * that was reject to join
 */
exports.cookroom_reject_request = (req, res) => {
    const cookroomId = req.params.cookroomId;
    const userId = req.params.userId;
    Cookroom.update({ _id: cookroomId }, { $pull: { requests: { $in: [userId] } } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Cookroom updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/cookrooms/" + cookroomId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    makeRejectionNotification(cookroomId, userId);
};
async function makeRejectionNotification(cookroomId, userId) {
    let hostId, title;
    try {
        await Cookroom.findById(cookroomId)
            .then(function (data) {
                hostId = data.userId; // User who created the cookroom
                title = data.title; // Title of the cookroom
                console.log(hostId, title);
            });
    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        eventId: cookroomId,
        memberId: hostId,
        date_created: new Date(),
        type: "rejection",
        text:
            "Your request to join " + title + " was rejected.",
        isRead: false,
    });
    return notification
        .save()
        .then(doc =>
            User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { notifications: [doc._id] } }
            )
        );
}


/** (✓)
 * This function handles cookroom DELETE requests
 * It removes the cookroom entry from the database with the matching id 
 */
exports.cookrooms_delete_cookroom = (req, res) => {
    const id = req.params.cookroomId;
    Cookroom.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Cookroom deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/cookrooms/',
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
 * This function handles cookroom DELETE requests
 * It removes all the cookroom entries from the database
 */
exports.cookrooms_delete_all = (req, res) => {
    Cookroom.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All cookrooms deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/cookrooms/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};