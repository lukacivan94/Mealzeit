const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe_title: { type: String },
    date_of_publish: {type: Date},
    food_type: { type: String },
    cuisine_type: { type: String },
    preparation_time: { type: String },
    instructions: { type: String },
    calorie_count: { type: Number },
    recipe_rating: { type: Number },
    number_of_ratings: {type: Number},
    ingredients: {type: Array},
    is_public: { type: Boolean },
    shared_with_friends: { type: Array },
});

module.exports = mongoose.model('Recipe', recipeSchema);