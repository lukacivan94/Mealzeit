const mongoose = require("mongoose");
const Course = require('../models/course');
const User = require("../models/user");
const Notification = require('../models/notification');

/** (✓)
 * This function handles course POST requests
 * It first checks if the user exists
 * then creates new Course object, saves it to database 
 * and updates the user's created_courses field with course's id
 */
exports.courses_add_course = (req, res) => {
    const userId = req.body.userId;
    let courseId;
    const today = new Date();
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const course = new Course({
                _id: new mongoose.Types.ObjectId(),
                userId: userId,
                title: req.body.title,
                location: req.body.location,
                date_of_publish: today,
                description: req.body.description,
                members: [],
                number_of_members: req.body.number_of_members,
                dates: req.body.dates,
                list_of_recipes: req.body.list_of_recipes,
                course_rating: -1,
                number_of_ratings: 0,
                is_virtual: req.body.is_virtual,
                price_of_course: req.body.price_of_course,
                is_included_in_premium: req.body.is_included_in_premium,
                is_cancelled: false
            });
            courseId = course._id;
            return course
                .save()
                .then(doc =>
                    User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { created_courses: [doc._id] } }
                    )
                );
        })
        .then(result => {
            res.status(201).json({
                message: "Course saved",
                courseId: courseId,
                request: {
                    type: "GET",
                    url: "https://mealzeit.herokuapp.com/courses/" + courseId
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
 * This function handles course GET requests
 * It finds all course entries in the database 
 * and returns them in the response
 */
exports.courses_get_all = (req, res) => {
    Course.find()
        .select('_id userId title')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        title: doc.title,
                        request: {
                            type: 'GET',
                            url: 'https://mealzeit.herokuapp.com/courses/' + doc._id
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
 * This function handles course GET requests
 * It finds course entry in the database with the matching id 
 * and returns it in the response
 */
exports.courses_get_course = (req, res) => {
    const id = req.params.courseId;
    Course.findById(id)
        .select('_id userId title location date_of_publish description members number_of_members dates list_of_recipes course_rating number_of_ratings is_virtual price_of_course is_included_in_premium is_cancelled')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    course: doc,
                    request: {
                        type: 'GET',
                        url: 'https://mealzeit.herokuapp.com/courses/'
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
 * This function handles courses GET requests
 * It finds all course entries in the database of the specified user
 * and returns them in the response
 */
exports.courses_get_courses_of_user = (req, res) => {
    let userId = req.params.userId
    Course.find({ is_cancelled: false, userId: userId })
        .select('_id userId title')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        title: doc.title,
                        request: {
                            type: 'GET',
                            url: 'https://mealzeit.herokuapp.com/courses/' + doc._id
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
 * This function handles course PATCH requests
 * It finds course entry in the database with the matching id 
 * and updates the course's properties
 */
exports.courses_patch_course = (req, res) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };
    Course.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Course updated',
                request: {
                    type: 'GET',
                    url: 'https://mealzeit.herokuapp.com/courses/' + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/*
 * After the user clicked on join course we add his id to course's members array.
 * Next we add the course id to user's joined_courses array
 * and we make a notification for the host of the course
 */
exports.courses_join_course = (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    Course.update(
        { _id: courseId },
        { $addToSet: { members: [userId] } }
    )
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course updated",
                request: {
                    type: "GET",
                    url: "https://mealzeit.herokuapp.com/courses/" + courseId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    addToJoinedCourses(courseId, userId);
    makeJoinNotification(courseId, userId);
}

async function addToJoinedCourses(courseId, userId) {
    try {
        await User.update(
            { _id: userId },
            { $addToSet: { joined_courses: [courseId] } }
        )
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "User updated",
                    request: {
                        type: "GET",
                        url: "https://mealzeit.herokuapp.com/courses/" + userId
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

async function makeJoinNotification(courseId, userId) {
    let hostId;
    let title;
    try {
        await Course.findById(courseId)
            .then(function (data) {
                hostId = data.userId,
                    title = data.title
            })
    } catch (error) {
        console.log("Following error happened: " + error);
    }
    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        userId: hostId, //creator of course
        eventId: courseId,
        memberId: userId, //user that joined
        date_created: new Date(),
        type: "join",
        text: "New user joined your " + title + " course",
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
* After the user leaves the course, removes the user id from course's members array
* and removes the course id from user's joined_courses array
*/
exports.courses_leave_course = (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId; //User who is leaving the course
    Course.update({ _id: courseId }, { $pull: { members: { $in: [userId] } } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course updated",
                request: {
                    type: "GET",
                    url: "https://mealzeit.herokuapp.com/courses/" + courseId
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    removeFromJoinedCourses(courseId, userId);
};

async function removeFromJoinedCourses(courseId, userId) {
    try {
        return User.update(
            { _id: userId },
            { $pull: { joined_courses: { $in: [courseId] } } }
        )
    } catch (error) {
        console.log("Following error happened: " + error);
    }
}

/*
* After the user cancels the course, updates the is_cancelled value of course
*/
exports.courses_cancel_course = (req, res) => {
    const courseId = req.params.courseId;
    Course.update({ _id: courseId }, { $set: { is_cancelled: true } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Course cancelled",
                request: {
                    type: "GET",
                    url: "https://mealzeit.herokuapp.com/courses/" + courseId
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
 * This function handles course DELETE requests
 * It removes the course entry from the database with the matching id 
 */
exports.courses_delete_course = (req, res) => {
    const id = req.params.courseId;
    Course.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Course deleted',
                request: {
                    type: 'POST',
                    url: 'https://mealzeit.herokuapp.com/courses/',
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
 * This function handles course DELETE requests
 * It removes all the course entries from the database
 */
exports.courses_delete_all = (req, res) => {
    Course.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All courses deleted',
                request: {
                    type: 'POST',
                    url: 'https://mealzeit.herokuapp.com/courses/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};