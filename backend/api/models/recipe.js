const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    },
    recipe_title: { 
        type: String,
        validate: {
            validator: function (v) {
                let lettersRegex = /[a-zA-Z]/;
                return lettersRegex.test(v);
            },
            message: `Title cannot only be a number.`
        }
    },
    date_of_publish: { type: Date },
    food_type: { type: String },
    cuisine_type: { type: String },
    preparation_time: { type: String },
    instructions: { type: String },
    calorie_count: { 
        type: Number,
        min: [0, "Minimum calorie count is 0."], 
        max: [10000, "Maximum calorie count is 10000."], 
        default: 0
    },
    recipe_rating: { type: Number },
    number_of_ratings: { type: Number },
    ingredients: { type: Array },
    is_public: { type: Boolean },
    shared_with_friends: { type: Array },
    is_cancelled: { type: Boolean }
});

module.exports = mongoose.model('Recipe', recipeSchema);
// we export the model which we give the name - Recipe
// and choose the schema which the model will use as a blueprint - recipeSchema
// in the mongoose.model function