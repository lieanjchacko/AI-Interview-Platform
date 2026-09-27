import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaRobot,
} from "react-icons/fa";

import api from "../services/api";

import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";
import GlassCard from "../components/GlassCard";

function StartInterview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ==========================================
  // LOAD INTERVIEW
  // ==========================================

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/interviews/${id}`);

      const interviewData = res.data.interview;

      setInterview(interviewData);

      setAnswers(
        interviewData.questions.map((question) => {
          return question.answer || "";
        })
      );
    } catch (error) {
      console.error("Failed to load interview:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load interview."
      );

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ANSWER CHANGE
  // ==========================================

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = e.target.value;

    setAnswers(updatedAnswers);
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNext = () => {
    if (
      currentQuestion <
      interview.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // ==========================================
  // PREVIOUS QUESTION
  // ==========================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // ==========================================
  // SUBMIT INTERVIEW
  // ==========================================

  const handleFinish = async () => {
    const unansweredQuestions = answers.filter(
      (answer) => !answer || !answer.trim()
    ).length;

    if (unansweredQuestions > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredQuestions} unanswered question(s).\n\nDo you still want to submit the interview?`
      );

      if (!confirmSubmit) {
        return;
      }
    } else {
      const confirmSubmit = window.confirm(
        "Are you sure you want to finish the interview?\n\nYour answers will be evaluated by AI."
      );

      if (!confirmSubmit) {
        return;
      }
    }

    try {
      setSubmitting(true);

      const res = await api.post(
        `/interviews/${id}/submit`,
        {
          answers,
        }
      );

      console.log("Evaluation Response:", res.data);

      navigate(`/interview/${id}/result`);
    } catch (error) {
      console.error(
        "Interview submission error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to submit interview."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <AuroraBackground>
          <div className="min-h-screen flex items-center justify-center px-5">
            <div className="text-center text-white">
              <div className="text-5xl mb-5 flex justify-center text-cyan-400 animate-pulse">
                <FaRobot />
              </div>

              <h2 className="text-2xl font-semibold">
                Preparing your interview...
              </h2>

              <p className="text-gray-400 mt-2">
                Loading your AI-generated questions
              </p>
            </div>
          </div>
        </AuroraBackground>
      </>
    );
  }

  // ==========================================
  // NO QUESTIONS
  // ==========================================

  if (
    !interview ||
    !interview.questions ||
    interview.questions.length === 0
  ) {
    return (
      <>
        <Navbar />

        <AuroraBackground>
          <div className="min-h-screen flex items-center justify-center px-5">
            <GlassCard>
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold">
                  No Questions Found
                </h2>

                <p className="text-gray-400 mt-3">
                  This interview does not contain any
                  questions.
                </p>

                <button
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </GlassCard>
          </div>
        </AuroraBackground>
      </>
    );
  }

  const question =
    interview.questions[currentQuestion];

  const totalQuestions =
    interview.questions.length;

  const progress =
    ((currentQuestion + 1) /
      totalQuestions) *
    100;

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
      <Navbar />

      <AuroraBackground>
        <div className="min-h-screen px-5 py-12">
          <div className="max-w-4xl mx-auto">

            {/* HEADER */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                  <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                    AI Interview
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
                    {interview.jobRole}
                  </h1>

                  <p className="text-gray-400 mt-2">
                    Answer each question carefully.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <FaClock className="text-cyan-400" />

                  <span>
                    Interview Session
                  </span>
                </div>
              </div>
            </motion.div>

            {/* PROGRESS */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-2">

                <span className="text-sm text-gray-300">
                  Question {currentQuestion + 1} of{" "}
                  {totalQuestions}
                </span>

                <span className="text-sm text-cyan-400 font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* QUESTION CARD */}
            <motion.div
              key={currentQuestion}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <GlassCard>

                {/* QUESTION HEADER */}
                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {currentQuestion + 1}
                  </div>

                  <div>
                    <p className="text-cyan-400 text-sm font-semibold">
                      Interview Question
                    </p>

                    <h2 className="text-white text-xl font-bold">
                      Question {currentQuestion + 1}
                    </h2>
                  </div>
                </div>

                {/* QUESTION */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-7">

                  <p className="text-white text-lg md:text-xl leading-8">
                    {question.question}
                  </p>

                </div>

                {/* ANSWER */}
                <div>

                  <label className="block text-white font-semibold mb-3">
                    Your Answer
                  </label>

                  <textarea
                    value={
                      answers[currentQuestion] || ""
                    }
                    onChange={handleAnswerChange}
                    placeholder="Type your answer here..."
                    rows={8}
                    disabled={submitting}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 text-white placeholder-gray-500 px-5 py-4 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition disabled:opacity-50"
                  />

                  <p className="text-gray-500 text-sm mt-2">
                    Explain your answer clearly and
                    include relevant examples where
                    possible.
                  </p>

                </div>

                {/* NAVIGATION BUTTONS */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">

                  {/* PREVIOUS */}
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={
                      currentQuestion === 0 ||
                      submitting
                    }
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                      currentQuestion === 0 ||
                      submitting
                        ? "bg-white/5 text-gray-600 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  {/* NEXT / FINISH */}
                  {currentQuestion ===
                  totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={handleFinish}
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span className="animate-spin">
                            ⟳
                          </span>

                          Evaluating...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle />
                          Finish Interview
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                      Next Question
                      <FaArrowRight />
                    </button>
                  )}

                </div>

              </GlassCard>
            </motion.div>

            {/* QUESTION NAVIGATION */}
            <div className="flex justify-center gap-2 mt-7 flex-wrap">

              {interview.questions.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCurrentQuestion(index)
                    }
                    disabled={submitting}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition ${
                      index === currentQuestion
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
                        : answers[index]
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

            </div>

          </div>
        </div>
      </AuroraBackground>
    </>
  );
}

export default StartInterview;