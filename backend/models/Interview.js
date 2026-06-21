const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    jobRole: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    numberOfQuestions: {
      type: Number,
      default: 10,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);