const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipes');

router.get('/', RecipeController.recipes_get_all);
router.get('/:recipeId', RecipeController.recipes_get_recipe);

module.exports = router;