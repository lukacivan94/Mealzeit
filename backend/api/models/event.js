const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type: String},
    location: {type: String},
    date_time: {type: Date},
    date_of_publish: {type: Date},

    list_of_recipes: {type: Array},
    course_rating: {type: Number},
    number_of_ratings: {type: Number},
    is_virtual: {type: Boolean},
    price_of_course: {type: Number},
    is_included_in_premium: {type: Boolean},
    number_of_members: {type: Number},

    members: {type: Array},
    instant_join: {type: Boolean},
    requests: {type: Array},
    description: {type: String},
    is_volunteering: {type: Boolean},
    required_items: {type: Array},
    suggested_price: {type: Number}
});

module.exports = mongoose.model('Event', eventSchema);