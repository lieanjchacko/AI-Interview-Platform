const Interview = require("../models/Interview");
const {
  generateInterviewQuestions,
} = require("../services/geminiService");

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

    const questions = await generateInterviewQuestions(
      jobRole,
      experience,
      techStack,
      numberOfQuestions
    );

    const interview = await Interview.create({
      jobRole,
      experience,
      techStack,
      numberOfQuestions,
      questions,
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
//Get Interview By ID
const getInterviewById = async (req, res) => {
  try {

    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    res.status(200).json({
      success: true,
      interview
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
//Delete Interview API
const deleteInterview = async (req, res) => {
  try {

    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    await interview.deleteOne();

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully"
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
  getInterviewById,
  deleteInterview,
};