const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },
    title: { 
        type: String,
        validate: {
            validator: function (v) {
                let lettersRegex = /[a-zA-Z]/;
                return lettersRegex.test(v);
            },
            message: `Title cannot only be a number.`
        } },
    location: { type: String },
    date_of_publish: { type: Date },
    description: { type: String },
    members: { type: Array },
    number_of_members: { 
        type: Number,
        min: [0, "Minimum number of members is 0."], 
        max: [100, "Maximum number of members is 100 due to Corona restrictions."], 
        default: 0
    },
    is_cancelled: { type: Boolean }
});

module.exports = mongoose.model('Event', eventSchema);
// we export the model which we give the name - Event
// and choose the schema which the model will use as a blueprint - eventSchema
// in the mongoose.model function
