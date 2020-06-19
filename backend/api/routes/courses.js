const express = require('express');
const router = express.Router();

const CoursesController = require('../controllers/courses');

/// course_add_request
/// course_accept_request
/// course_reject_request
router.get('/', CoursesController.courses_get_all);
router.get('/:courseId', CoursesController.courses_get_course);
router.post('/', CoursesController.courses_add_course);
router.patch('/:courseId', CoursesController.courses_patch_course);
router.delete('/:courseId', CoursesController.courses_delete_course);
router.delete('/', CoursesController.courses_delete_all);

module.exports = router;