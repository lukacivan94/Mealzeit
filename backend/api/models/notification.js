const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    notificationId: {type: mongoose.Schema.Types.ObjectId},
    userId: {type: mongoose.Schema.Types.ObjectId},
=======
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
>>>>>>> 0cfdd3f37b5f050407cd1cf193778d54bf534013
    eventId: {type: mongoose.Schema.Types.ObjectId},
    memberId: {type: mongoose.Schema.Types.ObjectId},
    date_created:  {type:Date},
    text: {type:String},
    is_read: {type: Boolean}
});

module.exports = mongoose.model('Notification', notificationSchema);