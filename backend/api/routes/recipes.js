const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipes');

router.get('/', RecipeController.recipes_get_all);
router.get('/:recipeId', RecipeController.recipes_get_recipe);
router.get('/ofuser/:userId', RecipeController.recipes_get_recipes_of_user);
router.post('/', RecipeController.recipes_add_recipe);
router.patch('/:recipeId', RecipeController.recipes_edit_recipe);
router.delete('/:recipeId', RecipeController.recipes_delete_recipe);
router.delete('/', RecipeController.recipes_delete_all);

module.exports = router;