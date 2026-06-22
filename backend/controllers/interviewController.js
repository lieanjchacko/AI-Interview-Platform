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
// GET ALL INTERVIEWS
const getInterviews = async (req, res) => {
  try {

    const interviews = await Interview.find({
      createdBy: req.user.id
    });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
module.exports = {
  createInterview,
  getInterviews,
};