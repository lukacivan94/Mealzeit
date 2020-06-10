const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    location: { type: String, required: true },
    date_time: {type: Date},
    date_of_publish: {type: Date},

    list_of_recipes: {type: Array},
    course_rating: {type: Number},
    is_virtual: {type: Boolean},
    price_of_course: {type: Number},
    is_included_in_premium: {type: Boolean},
    number_of_participants: {type: Number},

    users: {type: Array},
    instant_join: {type: Boolean},
    description: {type: String},
    is_volunteering: {type: Boolean},
    required_items: {type: Array},
    suggested_price: {type: Number}
});

module.exports = mongoose.model('Event', eventSchema);