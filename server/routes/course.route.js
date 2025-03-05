import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse,editCourse,getCourseById, getCreatorCourses,createCourseLecture, getCourseLecture, editLecture, removeLecture, getLectureById } from '../controllers/course.controller.js';
import  upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse); 
router.route("/").get(isAuthenticated,getCreatorCourses); 
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createCourseLecture); // ✅ Add this route
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture); // ✅ Add this route
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture); // ✅ Add this route
router.route("/course/:courseId/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById); // ✅ Add this route




export default router;
