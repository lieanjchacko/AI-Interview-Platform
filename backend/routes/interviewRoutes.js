const express = require("express");
const router = express.Router();

const {
  createInterview,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createInterview);

module.exports = router;