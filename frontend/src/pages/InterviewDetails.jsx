import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaLaptopCode,
  FaCode,
  FaQuestionCircle,
  FaTrash,
} from "react-icons/fa";

import api from "../services/api";

import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";
import GlassCard from "../components/GlassCard";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const res = await api.get(`/interviews/${id}`);
      setInterview(res.data.interview);
    } catch (error) {
      console.log(error);
      alert("Interview not found");
      navigate("/dashboard");
    }
  };

  const deleteInterview = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/interviews/${id}`);

      alert("Interview deleted successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Unable to delete interview");
    }
  };

  if (!interview) {
    return (
      <>
        <Navbar />

        <AuroraBackground>
          <div className="min-h-screen flex justify-center items-center">
            <h2 className="text-2xl text-white font-semibold">
              Loading Interview...
            </h2>
          </div>
        </AuroraBackground>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <AuroraBackground>
        <div className="min-h-screen py-16 px-5 flex justify-center">

          <div className="w-full max-w-5xl">

            <GlassCard>

              {/* Heading */}

              <h1 className="text-5xl font-bold text-white mb-3">
                {interview.jobRole}
              </h1>

              <p className="text-gray-400 mb-10">
                AI Generated Interview Questions
              </p>

              {/* Interview Info */}

              <div className="grid md:grid-cols-2 gap-6 mb-10">

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">

                  <div className="flex items-center gap-3 text-cyan-400 mb-2">
                    <FaLaptopCode />
                    <span className="font-semibold">Experience</span>
                  </div>

                  <p className="text-white">
                    {interview.experience}
                  </p>

                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10">

                  <div className="flex items-center gap-3 text-cyan-400 mb-2">
                    <FaQuestionCircle />
                    <span className="font-semibold">
                      Total Questions
                    </span>
                  </div>

                  <p className="text-white">
                    {interview.numberOfQuestions}
                  </p>

                </div>

              </div>

              {/* Tech Stack */}

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-10">

                <div className="flex items-center gap-3 text-cyan-400 mb-4">
                  <FaCode />
                  <span className="font-semibold">
                    Tech Stack
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">

                  {interview.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

              </div>

              {/* Questions */}

              <h2 className="text-3xl font-bold text-white mb-6">
                AI Generated Questions
              </h2>

              <div className="space-y-6">

                {interview.questions.map((item, index) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300"
                  >

                    <div className="flex items-center gap-3 mb-4">

                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>

                      <h3 className="text-cyan-400 text-lg font-semibold">
                        Question {index + 1}
                      </h3>

                    </div>

                    <p className="text-gray-300 leading-8">
                      {item.question}
                    </p>

                  </div>

                ))}

              </div>

              {/* Delete Button */}

              <div className="flex justify-end mt-12">

                <button
                  onClick={deleteInterview}
                  className="
                    flex items-center gap-3
                    px-6 py-3
                    rounded-xl
                    border border-red-500/40
                    bg-red-500/10
                    text-red-400
                    font-semibold
                    backdrop-blur-md
                    hover:bg-red-500
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-red-500/40
                    hover:scale-105
                    active:scale-95
                    transition-all
                    duration-300
                  "
                >
                  <FaTrash />

                  Delete Interview

                </button>

              </div>

            </GlassCard>

          </div>

        </div>

      </AuroraBackground>
    </>
  );
}

export default InterviewDetails;