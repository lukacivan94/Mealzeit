const mongoose = require("mongoose");
const Recipe = require('../models/recipe');
const User = require("../models/user");

/** (✓)
 * This function handles recipe POST requests
 * It first checks if the user exists
 * then creates new Recipe object, saves it to database 
 * and updates the user's created_recipes field with recipe's id
 */
exports.recipes_add_recipe = (req, res) => {
    const userId = req.body.userId;
    let recipeId;
    const today = new Date();
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const recipe = new Recipe({
                _id: new mongoose.Types.ObjectId(),
                userId: userId,
                recipe_title: req.body.recipe_title,
                date_of_publish: today,
                food_type: req.body.food_type,
                cuisine_type: req.body.cuisine_type,
                preparation_time: req.body.preparation_time,
                instructions: req.body.instructions,
                calorie_count: req.body.calorie_count,
                ingredients: req.body.ingredients,
                recipe_rating: 0,
                number_of_ratings: 0,
                is_public: req.body.is_public,
                shared_with_friends: [userId]
            });
            recipeId = recipe._id;
            return recipe
                .save()
                .then(doc =>
                    User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { created_recipes: [doc._id] } }
                    )
                );
        })
        .then(result => {
            res.status(201).json({
                message: "Recipe saved",
                recipeId: recipeId,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/recipes/"
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

/** (✓)
 * This function handles recipe GET requests
 * It finds all recipe entries in the database 
 * and returns them in the response
 */
exports.recipes_get_all = (req, res) => {
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

/** (✓)
 * This function handles recipe GET requests
 * It finds recipe entry in the database with the matching id 
 * and returns it in the response
 */
exports.recipes_get_recipe = (req, res) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .select('_id recipe_title food_type cuisine_type preparation_time instructions calorie_count recipe_rating number_of_ratings ingredients is_public shared_with_friends ')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    recipe: doc,
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

/** (✓)
 * This function handles cookroom GET requests
 * It finds all cookroom entries in the database of the specified user
 * and returns them in the response
 */
exports.recipes_get_recipes_of_user = (req, res) => {
    let userId = req.params.userId
    Recipe.find({ userId: userId })
        .select('_id userId recipe_title')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                cookrooms: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        title: doc.recipe_title,
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

/** (✓)
 * This function handles recipe PATCH requests
 * It finds recipe entry in the database with the matching id 
 * and updates the recipe's properties
 */
exports.recipes_edit_recipe = (req, res) => {
    const id = req.params.recipeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };
    Recipe.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe is updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipes/' + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles recipe DELETE requests
 * It removes the recipe entry from the database with the matching id 
 */
exports.recipes_delete_recipe = (req, res) => {
    const id = req.params.recipeId;
    Recipe.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe is deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/recipes/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

/** (✓)
 * This function handles recipe DELETE requests
 * It removes all the recipe entries from the database
 */
exports.recipes_delete_all = (req, res) => {
    Recipe.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All recipes are deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/recipes/',
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};