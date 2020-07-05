const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');

exports.users_signup = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            phone_number: req.body.phone_number,
                            gender: req.body.gender,
                            date_of_birth: new Date(req.body.date_of_birth),
                            languages: req.body.languages,
                            created_events: [],
                            joined_events: [],
                            created_recipes: [],
                            is_expert_user: req.body.is_expert_user,
                            is_premium_user: req.body.is_premium_user,
                            is_verified: false,
                            notifications: [],
                            followers: [],
                            following: [],
                            date_joined: new Date(),
                            profile_picture: req.body.profile_picture
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        });
};

exports.users_login = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "MealZeit",
                        {
                            expiresIn: "1h"
                        }
                    );
                    User.findOne({ email: req.body.email }, function (err, doc) {
                        doc.last_login = new Date();
                        doc.save();
                    })
                    //.then(result => {})
                    //.catch(err => {});
                    return res.status(200).json({
                        message: 'Login successful',
                        token: token,
                        userId: user[0]._id
                    });
                }
                return res.status(401).json({
                    message: 'Login failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.users_get_all = (req, res) => {
    User.find()
        .select('_id first_name last_name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        first_name: doc.first_name,
                        last_name: doc.last_name,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/users/' + doc._id
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


exports.users_get_user = (req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .select('_id email first_name last_name phone_number gender date_of_birth languages created_cookrooms joined_cookrooms created_courses joined_courses created_recipes is_expert_user is_premium_user is_verified notifications sent_friend_requests received_friend_requests friends date_joined last_login')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/'
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

exports.users_patch_user = (req, res) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/' + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles user PATCH requests
 * After the user sent the friend request it adds id of requested user to his sent requests
 * and adds his id to requested user's received requests
 * additionally creates new friend request notification
 */
exports.users_add_friend_request = (req, res) => {
    const userId = req.params.userId; // ID of a user that is sending the request
    const friendId = req.params.friendId; // ID of a user who will receive the request
    addToSentRequests(userId, friendId);
    addToReceivedRequests(userId, friendId);
    makeNewFriendRequestNotification(userId, friendId);
    res.status(200).json({
        message: "User updated",
        request: {
            type: "GET",
            url: "http://localhost:3000/users/" + userId
        }
    });
};

async function addToSentRequests(userId, friendId) {
    try {
        await User.findOneAndUpdate({ _id: userId }, { $addToSet: { sent_friend_requests: [friendId] } })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

async function addToReceivedRequests(userId, friendId) {
    try {
        await User.findOneAndUpdate({ _id: friendId }, { $addToSet: { received_friend_requests: [userId] } })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}
async function makeNewFriendRequestNotification(userId, friendId) {
    let name;
    try {
        await User.findById(userId)
            .then(function (data) {
                name = data.first_name;
            });

    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: friendId,
        memberId: userId,
        date_created: new Date(),
        type: "newfriendrequest",
        text: "You have a new request friend request from " + name,
        isRead: false,
    });
    return notification
        .save()
        .then(doc =>
            // We add the notification id to friend's notification array
            User.findOneAndUpdate(
                { _id: friendId },
                { $addToSet: { notifications: [doc._id] } }
            )
        );
}

/** (✓)
 * This function handles user PATCH requests
 * After the user accepted the friend request it updates the user who sent the request
 * and clears his sent request.
 * Next, clears user's received request and adds them to friends
 * additionally creates accepted friend request notification
 */
exports.users_accept_friend_request = (req, res) => {
    const userId = req.params.userId; // ID of a user that is accepting the request
    const friendId = req.params.friendId; // ID of a user who will be accepted
    removeFromSentRequests(userId, friendId);
    removeFromReceivedRequests(userId, friendId);
    addToFriends(userId, friendId);
    addToFriends(friendId, userId)
    makeAcceptedRequestNotification(userId, friendId);
    res.status(200).json({
        message: "User updated",
        request: {
            type: "GET",
            url: "http://localhost:3000/users/" + userId
        }
    });
};

async function makeAcceptedRequestNotification(userId, friendId) {
    let name;
    try {
        await User.findById(userId)
            .then(function (data) {
                name = data.first_name;
            });

    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: friendId,
        memberId: userId,
        date_created: new Date(),
        type: "acceptedfriendrequest",
        text: name + " accepted your friend request.",
        isRead: false,
    });
    return notification
        .save()
        .then(doc =>
            // We add the notification id to friend's notification array
            User.findOneAndUpdate(
                { _id: friendId },
                { $addToSet: { notifications: [doc._id] } }
            )
        );
}


/** (✓)
 * This function handles user PATCH requests
 * After the user rejected the friend request it updates the user who sent the request
 * and clears his sent request.
 * Next, clears user's received requests and 
 * additionally creates rejected friend request notification
 */
exports.users_reject_friend_request = (req, res) => {
    const userId = req.params.userId; // ID of a user that is rejecting the request
    const friendId = req.params.friendId; // ID of a user who will be rejected
    removeFromSentRequests(userId, friendId);
    removeFromReceivedRequests(userId, friendId);
    makeRejectedRequestNotification(userId, friendId);
    res.status(200).json({
        message: "User updated",
        request: {
            type: "GET",
            url: "http://localhost:3000/users/" + userId
        }
    });
};

async function makeRejectedRequestNotification(userId, friendId) {
    let name;
    try {
        await User.findById(userId)
            .then(function (data) {
                name = data.first_name;
            });

    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: friendId, //for who the notification is
        memberId: userId, // user that triggers the notification
        date_created: new Date(),
        type: "rejectedfriendrequest",
        text: name + " rejected your friend request.",
        isRead: false,
    });
    return notification
        .save()
        .then(doc =>
            // We add the notification id to friend's notification array
            User.findOneAndUpdate(
                { _id: friendId },
                { $addToSet: { notifications: [doc._id] } }
            )
        );
}

async function removeFromSentRequests(userId, friendId) {
    try {
        await User.findOneAndUpdate({ _id: friendId },
            { $pull: { sent_friend_requests: { $in: [userId] } } })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

async function removeFromReceivedRequests(userId, friendId) {
    try {
        await User.findOneAndUpdate({ _id: userId },
            { $pull: { received_friend_requests: { $in: [friendId] } } })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

async function addToFriends(userId, friendId) {
    try {
        await User.findOneAndUpdate({ _id: userId },
            { $addToSet: { friends: [friendId] } })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

exports.users_delete_user = (req, res) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

exports.users_delete_all = (req, res) => {
    User.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All users deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};