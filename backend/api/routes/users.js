const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);
router.get('/', UsersController.users_get_all);
router.get('/:userId', UsersController.users_get_user);
router.get('/friends/:userId', UsersController.users_get_friends_of_user);
router.patch('/:userId', UsersController.users_patch_user);
router.patch('/addfriendreq/:userId/:friendId', UsersController.users_add_friend_request);
router.patch('/acceptfriendreq/:userId/:friendId', UsersController.users_accept_friend_request);
router.patch('/rejectfriendreq/:userId/:friendId', UsersController.users_reject_friend_request);
router.delete('/:userId', UsersController.users_delete_user);
router.delete('/', UsersController.users_delete_all);

module.exports = router;