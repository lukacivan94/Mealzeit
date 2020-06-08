const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_created:  {type:Date},
    text: {type:String},
    is_read: {type: Boolean}
});

module.exports = mongoose.model('Notification', notificationSchema);