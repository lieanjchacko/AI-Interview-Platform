const express = require("express");

const router = express.Router();

const {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  deleteInterview,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

// Create interview
router.post("/", protect, createInterview);

// Get all interviews
router.get("/", protect, getInterviews);

// Get interview by ID
router.get("/:id", protect, getInterviewById);

// Submit answers and evaluate interview
router.post("/:id/submit", protect, submitInterview);

// Delete interview
router.delete("/:id", protect, deleteInterview);

module.exports = router;