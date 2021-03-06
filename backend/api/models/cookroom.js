const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Event = require('../models/event');
// we import the Event model first and then access its schema so that it can be extended

const cookroomSchema = extendSchema(Event.schema, {
    date_time: { type: Date },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'Recipe is required.']
    },
    invited_friends: { type: Array },
    instant_join: { type: Boolean },
    requests: { type: Array }, // Array of users who requested to join the cookroom
    is_volunteering: { type: Boolean },
    required_items: { type: Array },
    suggested_price: {
        type: Number,
        min: [0, "Minimum price is 0."],
        max: [200, "Maximum price is 200. You shouldn't be making money on this."],
        default: 0
    }
});

module.exports = mongoose.model('Cookroom', cookroomSchema);
// we export the model which we give the name - Cookroom
// and choose the schema which the model will use as a blueprint - cookroomSchema
// in the mongoose.model function