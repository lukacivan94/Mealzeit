const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator: function (v) {
                let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email. Please enter a valid email address.`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    first_name: {
        type: String,
        validate: {
            validator: function (v) {
                let lettersRegex = /[a-zA-Z]/;
                return lettersRegex.test(v);
            },
            message: `First name should only include letters.`
        }
    },
    last_name: {
        type: String,
        validate: {
            validator: function (v) {
                let lettersRegex = /[a-zA-Z]/;
                return lettersRegex.test(v);
            },
            message: `Last name should only include letters.`
        }
    },
    phone_number: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{12}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Phone number should have 12 digits.`
        }
    },
    gender: { type: String },
    date_of_birth: { type: Date },
    languages: { type: Array },
    created_cookrooms: { type: Array },
    joined_cookrooms: { type: Array },
    created_courses: { type: Array },
    joined_courses: { type: Array },
    created_recipes: { type: Array },
    is_expert_user: { type: Boolean },
    is_premium_user: { type: Boolean },
    is_verified: { type: Boolean },
    notifications: { type: Array },
    sent_friend_requests: { type: Array },
    received_friend_requests: { type: Array },
    friends: { type: Array },
    date_joined: { type: Date },
    last_login: { type: Date },
    profile_picture: { type: String }
});

module.exports = mongoose.model('User', userSchema);
// we export the model which we give the name - User
// and choose the schema which the model will use as a blueprint - userSchema
// in the mongoose.model function