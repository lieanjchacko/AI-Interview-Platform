const express = require("express");
const router = express.Router();


const {
  createInterview,
  getInterviews,
  getInterviewById,
  deleteInterview
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createInterview);
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterviewById);
router.delete("/:id", protect, deleteInterview);

module.exports = router;