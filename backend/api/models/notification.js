const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId},
    eventID:{type: mongoose.Schema.Types.ObjectId},
    memberId: {type: mongoose.Schema.Types.ObjectId},
    date_created:  {type:Date},
    text: {type:String},
    is_read: {type: Boolean}
});

module.exports = mongoose.model('Notification', notificationSchema);