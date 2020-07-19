const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CoursesController = require('../controllers/courses');

router.get('/', CoursesController.courses_get_all);
router.get('/:courseId', CoursesController.courses_get_course);
router.get('/ofuser/:userId', checkAuth, CoursesController.courses_get_courses_of_user);
router.post('/', checkAuth, CoursesController.courses_add_course);
router.patch('/:courseId', checkAuth, CoursesController.courses_patch_course);
router.patch('/join/:courseId/:userId', checkAuth, CoursesController.courses_join_course);
router.patch('/leave/:courseId/:userId', checkAuth, CoursesController.courses_leave_course);
router.patch('/cancel/:courseId', checkAuth, CoursesController.courses_cancel_course);
router.delete('/:courseId', checkAuth, CoursesController.courses_delete_course);
router.delete('/', checkAuth, CoursesController.courses_delete_all);

module.exports = router;