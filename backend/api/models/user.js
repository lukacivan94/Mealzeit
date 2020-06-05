const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String},
    gender: {type: String},
    date_of_birth: {type: Date},
    languages: {type: Array},
    created_events: {type: Array},
    joined_events: {type: Array},
    created_recipes: {type: Array},
    is_expert_user: {type: Boolean},
    is_premium_user: {type: Boolean},
    is_verified: {type: Boolean},
    notifications: {type: Array},
    date_joined: {type: Date},
    last_login: {type: Date}
});

module.exports = mongoose.model('User', userSchema);