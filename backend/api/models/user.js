const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String}, //add address?
    gender: {type: String}, //maybe char?
    date_of_birth: {type: Date},
    languages: {type: Array},
    created_cookrooms: {type: Array},
    joined_cookrooms: {type: Array},
    created_courses: {type: Array},
    joined_courses: {type: Array},
    created_recipes: {type: Array},
    is_expert_user: {type: Boolean},
    is_premium_user: {type: Boolean},
    is_verified: {type: Boolean},
    notifications: {type: Array},
    followers: {type: Array},
    following: {type: Array},
    date_joined: {type: Date},
    last_login: {type: Date}
});

module.exports = mongoose.model('User', userSchema);
// we export the model which we give the name - User 
// and choose the schema which the model will use as a blueprint - userSchema
// in the mongoose.model function