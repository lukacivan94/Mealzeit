const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipe_title: { type: String },
    food_type: { type: String },
    cuisine_type: { type: String },
    preparation_time: { type: String },
    instructions: { type: String },
    calorie_count: { type: Number },
    recipe_rating: { type: Number },
    number_of_ratings: {type: Number},
    ingredients: {type: Array},
});

module.exports = mongoose.model('Recipe', recipeSchema);