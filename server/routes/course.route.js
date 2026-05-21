import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  createCourseLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishCourse,
  getPublishedCourse,
  searchCourse,
} from "../controllers/course.controller.js";

import upload from "../utils/multer.js";

const router = express.Router();

// ==============================
// Public Routes
// ==============================

// Get all published courses
router.get("/published-courses", getPublishedCourse);

// Search courses
router.get("/search", searchCourse);

// ==============================
// Protected Routes
// ==============================

// Create course
router.route("/").post(isAuthenticated, createCourse);

// Get creator courses
router.route("/").get(isAuthenticated, getCreatorCourses);

// Get single course by ID
router.route("/:courseId").get(isAuthenticated, getCourseById);

// Edit course
router
  .route("/:courseId")
  .put(
    isAuthenticated,
    upload.single("courseThumbnail"),
    editCourse
  );

// Publish / Unpublish course
router
  .route("/:courseId")
  .patch(isAuthenticated, togglePublishCourse);

// ==============================
// Lecture Routes
// ==============================

// Create lecture
router
  .route("/:courseId/lecture")
  .post(isAuthenticated, createCourseLecture);

// Get all lectures
router
  .route("/:courseId/lecture")
  .get(isAuthenticated, getCourseLecture);

// Edit lecture
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);

// Delete lecture
router
  .route("/lecture/:lectureId")
  .delete(isAuthenticated, removeLecture);

// Get lecture by ID
router
  .route("/lecture/:lectureId")
  .get(isAuthenticated, getLectureById);

export default router;