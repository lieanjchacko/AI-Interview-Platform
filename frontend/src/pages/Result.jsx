import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaTrophy,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

import api from "../services/api";

import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";
import GlassCard from "../components/GlassCard";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/interviews/${id}`);

      setInterview(res.data.interview);
    } catch (error) {
      console.error("Failed to load result:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load interview result."
      );

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <AuroraBackground>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center text-white">
              <FaRobot className="text-5xl text-cyan-400 mx-auto mb-5 animate-pulse" />

              <h2 className="text-2xl font-bold">
                Loading your results...
              </h2>

              <p className="text-gray-400 mt-2">
                Preparing your AI interview evaluation
              </p>
            </div>
          </div>
        </AuroraBackground>
      </>
    );
  }

  // ==========================================
  // RESULT NOT FOUND
  // ==========================================

  if (!interview) {
    return null;
  }

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const questions = interview.questions || [];

  const totalQuestions = questions.length;

  const totalPossibleScore = totalQuestions * 10;

  const totalScore = interview.totalScore || 0;

  const percentage =
    totalPossibleScore > 0
      ? Math.round(
          (totalScore / totalPossibleScore) * 100
        )
      : 0;

  // ==========================================
  // PERFORMANCE LABEL
  // ==========================================

  let performance = "Needs Improvement";

  if (percentage >= 80) {
    performance = "Excellent Performance";
  } else if (percentage >= 60) {
    performance = "Good Performance";
  } else if (percentage >= 40) {
    performance = "Average Performance";
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
      <Navbar />

      <AuroraBackground>
        <div className="min-h-screen px-5 py-12">
          <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <motion.div
              initial={{
                opacity: 0,
                y: -25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-center mb-10"
            >
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <FaTrophy className="text-white text-3xl" />
                </div>
              </div>

              <p className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">
                AI Interview Completed
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                Interview Results
              </h1>

              <p className="text-gray-400 mt-3">
                {interview.jobRole}
              </p>
            </motion.div>

            {/* SCORE CARD */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <GlassCard>
                <div className="grid md:grid-cols-3 gap-8 items-center">

                  {/* SCORE */}
                  <div className="text-center">

                    <div className="relative w-40 h-40 mx-auto flex items-center justify-center">

                      <div className="absolute inset-0 rounded-full border-8 border-white/10" />

                      <div
                        className="absolute inset-0 rounded-full border-8 border-cyan-400"
                        style={{
                          clipPath: `inset(${
                            100 - percentage
                          }% 0 0 0)`,
                        }}
                      />

                      <div>
                        <div className="text-4xl font-bold text-white">
                          {percentage}%
                        </div>

                        <div className="text-gray-400 text-sm">
                          Score
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* SCORE DETAILS */}
                  <div className="text-center md:text-left">

                    <p className="text-gray-400 text-sm">
                      Overall Score
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-1">
                      {totalScore}
                      <span className="text-gray-500 text-xl">
                        /{totalPossibleScore}
                      </span>
                    </h2>

                    <p className="text-cyan-400 font-semibold mt-3">
                      {performance}
                    </p>

                  </div>

                  {/* QUESTIONS */}
                  <div className="text-center md:text-right">

                    <p className="text-gray-400 text-sm">
                      Questions Completed
                    </p>

                    <h2 className="text-4xl font-bold text-white mt-1">
                      {totalQuestions}
                    </h2>

                    <div className="flex items-center justify-center md:justify-end gap-2 text-green-400 mt-3">
                      <FaCheckCircle />

                      <span>
                        Evaluation Complete
                      </span>
                    </div>

                  </div>

                </div>
              </GlassCard>
            </motion.div>

            {/* INTERVIEW DETAILS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="mt-8"
            >
              <GlassCard>

                <div className="flex items-center gap-3 mb-6">

                  <FaChartLine className="text-cyan-400 text-xl" />

                  <h2 className="text-2xl font-bold text-white">
                    Interview Overview
                  </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-sm">
                      Job Role
                    </p>

                    <p className="text-white font-semibold mt-2">
                      {interview.jobRole}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-sm">
                      Experience
                    </p>

                    <p className="text-white font-semibold mt-2">
                      {interview.experience}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-gray-400 text-sm">
                      Tech Stack
                    </p>

                    <p className="text-white font-semibold mt-2">
                      {interview.techStack.join(", ")}
                    </p>
                  </div>

                </div>

              </GlassCard>
            </motion.div>

            {/* QUESTION RESULTS */}
            <div className="mt-8">

              <div className="flex items-center gap-3 mb-6">

                <FaRobot className="text-cyan-400 text-xl" />

                <h2 className="text-2xl font-bold text-white">
                  AI Evaluation
                </h2>

              </div>

              <div className="space-y-5">

                {questions.map(
                  (question, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          index * 0.05,
                      }}
                    >
                      <GlassCard>

                        {/* QUESTION HEADER */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>

                            <div>
                              <p className="text-cyan-400 text-sm">
                                Question {index + 1}
                              </p>

                              <p className="text-white font-semibold">
                                AI Evaluation
                              </p>
                            </div>

                          </div>

                          {/* SCORE */}
                          <div className="text-right">

                            <span className="text-2xl font-bold text-white">
                              {question.score || 0}
                            </span>

                            <span className="text-gray-500">
                              /10
                            </span>

                          </div>

                        </div>

                        {/* QUESTION */}
                        <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-5">

                          <p className="text-gray-300 text-sm mb-2">
                            Question
                          </p>

                          <p className="text-white leading-7">
                            {question.question}
                          </p>

                        </div>

                        {/* ANSWER */}
                        <div className="mt-4 rounded-xl bg-black/20 border border-white/10 p-5">

                          <p className="text-gray-400 text-sm mb-2">
                            Your Answer
                          </p>

                          <p className="text-gray-200 leading-7 whitespace-pre-wrap">
                            {question.answer ||
                              "No answer provided."}
                          </p>

                        </div>

                        {/* FEEDBACK */}
                        <div className="mt-4 rounded-xl bg-cyan-500/5 border border-cyan-400/20 p-5">

                          <div className="flex items-center gap-2 mb-2">

                            <FaRobot className="text-cyan-400" />

                            <p className="text-cyan-400 font-semibold">
                              AI Feedback
                            </p>

                          </div>

                          <p className="text-gray-300 leading-7">
                            {question.feedback ||
                              "No feedback available."}
                          </p>

                        </div>

                      </GlassCard>
                    </motion.div>
                  )
                )}

              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

              <button
                onClick={() =>
                  navigate("/dashboard")
                }
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition"
              >
                <FaArrowLeft />
                Back to Dashboard
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/interview/${id}`
                  )
                }
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/20"
              >
                View Interview
              </button>

            </div>

          </div>
        </div>
      </AuroraBackground>
    </>
  );
}

export default Result;