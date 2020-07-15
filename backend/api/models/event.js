const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String },
    location: { type: String },
    date_of_publish: { type: Date },
    description: { type: String },
    members: { type: Array },
    number_of_members: { type: Number },
});

module.exports = mongoose.model('Event', eventSchema);
// we export the model which we give the name - Event
// and choose the schema which the model will use as a blueprint - eventSchema
// in the mongoose.model function
