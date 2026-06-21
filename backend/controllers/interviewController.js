const Interview = require("../models/Interview");

// CREATE INTERVIEW
const createInterview = async (req, res) => {
  try {


    console.log("req.user =", req.user);


    const {
      jobRole,
      experience,
      techStack,
      numberOfQuestions,
    } = req.body;

    const interview = await Interview.create({
      jobRole,
      experience,
      techStack,
      numberOfQuestions,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
};