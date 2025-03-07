import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse,editCourse,getCourseById, getCreatorCourses,createCourseLecture, getCourseLecture, editLecture, removeLecture, getLectureById, togglePublishCourse, getPublishedCourse } from '../controllers/course.controller.js';
import  upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse); 
router.route("/published-courses").get(isAuthenticated,getPublishedCourse);//publish course
router.route("/").get(isAuthenticated,getCreatorCourses); 
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createCourseLecture); // ✅ Add this route
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture); // ✅ Add this route
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture); // ✅ Add this route
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);//delete lec
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById); // ✅ Add this route
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);




export default router;
