const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const RecipeController = require('../controllers/recipes');

router.get('/', RecipeController.recipes_get_all);
router.get('/:recipeId', checkAuth, RecipeController.recipes_get_recipe);
router.get('/ofuser/:userId', checkAuth, RecipeController.recipes_get_recipes_of_user);
router.post('/', checkAuth, RecipeController.recipes_add_recipe);
router.patch('/:recipeId', checkAuth, RecipeController.recipes_edit_recipe);
router.patch('/cancel/:recipeId', checkAuth, RecipeController.recipes_cancel_recipe);
router.delete('/:recipeId', checkAuth, RecipeController.recipes_delete_recipe);
router.delete('/', checkAuth, RecipeController.recipes_delete_all);

module.exports = router;