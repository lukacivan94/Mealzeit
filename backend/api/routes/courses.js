const express = require('express');
const router = express.Router();

const CoursesController = require('../controllers/courses');

router.get('/', CoursesController.courses_get_all);
router.get('/:courseId', CoursesController.courses_get_course);
router.get('/ofuser/:userId', CoursesController.courses_get_courses_of_user);
router.post('/', CoursesController.courses_add_course);
router.patch('/:courseId', CoursesController.courses_patch_course);
router.patch('/join/:courseId/:userId', CoursesController.courses_join_course);
router.patch('/leave/:courseId/:userId', CoursesController.courses_leave_course);
router.delete('/:courseId', CoursesController.courses_delete_course);
router.delete('/', CoursesController.courses_delete_all);

module.exports = router;