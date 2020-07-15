const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Event = require('../models/event');

const courseSchema = extendSchema(Event.schema, {
    dates: [{ type: Date }],
    list_of_recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    }],
    course_rating: { type: Number },
    number_of_ratings: { type: Number },
    is_virtual: { type: Boolean },
    price_of_course: { type: Number },
    is_included_in_premium: { type: Boolean },
});

module.exports = mongoose.model('Course', courseSchema);
// we export the model which we give the name - Course
// and choose the schema which the model will use as a blueprint - courseSchema
// in the mongoose.model function