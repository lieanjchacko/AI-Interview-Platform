const express = require("express");
const router = express.Router();

const {
  createInterview,
  getInterviews,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createInterview);
router.get("/", protect, getInterviews);

module.exports = router;