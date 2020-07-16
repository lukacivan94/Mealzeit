const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { //the user for which the notification is created - receiver
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    eventId: { type: mongoose.Schema.Types.ObjectId },
    memberId: { type: mongoose.Schema.Types.ObjectId }, //the user which causes notification - trigger
    date_created: { type: Date },
    type: { type: String },
    text: { type: String },
    is_read: { type: Boolean }
});

module.exports = mongoose.model('Notification', notificationSchema);
// we export the model which we give the name - Notification
// and choose the schema which the model will use as a blueprint - notificationSchema
// in the mongoose.model function