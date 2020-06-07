const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');

const User = require('../models/user');

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);
router.get('/', UsersController.users_get_all);
router.get('/:userId', UsersController.users_get_user);
router.patch('/:userId', UsersController.users_patch_user);
router.delete('/:userId', UsersController.users_delete_user);
router.delete('/', UsersController.users_delete_all);

module.exports = router;