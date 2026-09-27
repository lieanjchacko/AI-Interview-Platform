const Interview = require("../models/Interview");

const {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
} = require("../services/geminiService");

// ==========================================
// CREATE INTERVIEW
// ==========================================

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
    console.error("Create Interview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL INTERVIEWS
// ==========================================

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET INTERVIEW BY ID
// ==========================================

const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
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

// ==========================================
// SUBMIT AND EVALUATE INTERVIEW
// ==========================================

const submitInterview = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be provided as an array",
      });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (!interview.questions || interview.questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No questions found for this interview",
      });
    }

    if (answers.length !== interview.questions.length) {
      return res.status(400).json({
        success: false,
        message: "Number of answers does not match number of questions",
      });
    }

    // Save candidate answers
    interview.questions.forEach((question, index) => {
      question.answer = answers[index] || "";
    });

    // Evaluate answers using Gemini
    const evaluation = await evaluateInterviewAnswers(
      interview.jobRole,
      interview.experience,
      interview.techStack,
      interview.questions
    );

    // Save score and feedback
    evaluation.results.forEach((result) => {
      const index = result.questionNumber - 1;

      if (
        index >= 0 &&
        index < interview.questions.length
      ) {
        interview.questions[index].score = result.score;
        interview.questions[index].feedback = result.feedback;
      }
    });

    interview.totalScore = evaluation.totalScore;
    interview.evaluationCompleted = true;

    await interview.save();

    res.status(200).json({
      success: true,
      message: "Interview evaluated successfully",
      interview,
      evaluation,
    });
  } catch (error) {
    console.error("Submit Interview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE INTERVIEW
// ==========================================

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    await interview.deleteOne();

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
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
  getInterviews,
  getInterviewById,
  submitInterview,
  deleteInterview,
};