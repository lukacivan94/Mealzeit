const Recipe = require('../models/recipe');

exports.recipes_get_all = (req, res, next) => {
    Recipe.find()
        .select('recipe_title _id ')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        recipe_title: doc.recipe_title,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/recipes/' + doc._id
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

exports.recipes_get_recipe = (req, res, next) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .select('_id recipe_title food_type cuisine_type preparation_time instructions calorie_count recipe_rating ingredients is_public shared_friends message')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/recipes/'
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