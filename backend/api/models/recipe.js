const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipe_title: { type: String },
    food_type: { type: String },
    cuisine_type: { type: String },
    preparation_time: { type: String },
    instructions: { type: String },
    date_of_birth: { type: Date },
    calorie_count: { type: Number },
    recipe_rating: { type: Number },
    ingredients: [{
        food_name: String,
        service_size: Number,
        number_of_servings: Number
    }],
    is_public: { type: Boolean },
    shared_friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    message: { type: String }
});

module.exports = mongoose.model('Recipe', recipeSchema);