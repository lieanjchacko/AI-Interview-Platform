import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";

function StartInterview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const res = await api.get(`/interviews/${id}`);
      setInterview(res.data.interview);
    } catch (err) {
      console.log(err);
    }
  };

  if (!interview) {
    return (
      <>
        <Navbar />
        <div className="text-white p-10">Loading interview...</div>
      </>
    );
  }

  const questions = interview.questions;
  const currentQuestion = questions[currentIndex];

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentIndex]: e.target.value,
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Navbar />

      <AuroraBackground>
        <div className="min-h-screen flex justify-center items-center px-6 py-10">

          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-8 rounded-2xl text-white shadow-lg">

            {/* Header */}
            <h1 className="text-2xl font-bold mb-2">
              {interview.jobRole} Interview
            </h1>

            <p className="text-gray-300 mb-6">
              Question {currentIndex + 1} of {questions.length}
            </p>

            {/* Question Box */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/20 mb-6">
              <p className="text-lg">
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Box */}
            <textarea
              className="w-full h-40 p-4 rounded-xl bg-black/30 border border-white/20 text-white outline-none"
              placeholder="Type your answer here..."
              value={answers[currentIndex] || ""}
              onChange={handleAnswerChange}
            />

            {/* Buttons */}
            <div className="flex justify-between mt-6">

              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="px-5 py-2 rounded-lg bg-gray-600 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentIndex === questions.length - 1}
                className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                Next
              </button>

            </div>

          </div>

        </div>
      </AuroraBackground>
    </>
  );
}

export default StartInterview;