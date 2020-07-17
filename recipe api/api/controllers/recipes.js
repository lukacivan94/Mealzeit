const mongoose = require("mongoose");
const Recipe = require('../models/recipe');

exports.recipes_add_recipe = (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        recipe_title: req.body.recipe_title,
        food_type: req.body.food_type,
        cuisine_type: req.body.cuisine_type,
        preparation_time: req.body.preparation_time,
        instructions: req.body.instructions,
        calorie_count: req.body.calorie_count,
        ingredients: req.body.ingredients,
        recipe_rating: req.body.recipe_rating,
        number_of_ratings: req.body.number_of_ratings
    });
    recipe.save()
        .then(doc =>
            res.status(201).json({
                message: "Recipe saved",
                recipeId: recipe._id,
                request: {
                    type: "GET",
                    url: "https://mealzeit-recipe-api.herokuapp.com/recipes/" + recipe._id
                }
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}

exports.recipes_get_all = (req, res) => {
    Recipe.find()
        .select('recipe_title _id food_type cuisine_type recipe_rating preparation_time')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        recipe_title: doc.recipe_title,
                        _id: doc._id,
                        food_type: doc.food_type,
                        cuisine_type: doc.cuisine_type,
                        recipe_rating: doc.recipe_rating,
                        preparation_time: doc.preparation_time,
                        request: {
                            type: 'GET',
                            url: 'https://mealzeit-recipe-api.herokuapp.com/recipes/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.recipes_get_recipe = (req, res) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .select('_id recipe_title food_type cuisine_type preparation_time instructions calorie_count recipe_rating number_of_ratings ingredients')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    recipe: doc,
                    request: {
                        type: 'GET',
                        url: 'https://mealzeit-recipe-api.herokuapp.com/recipes'
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found ' });
            }
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });
};
