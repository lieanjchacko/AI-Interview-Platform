import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaArrowRight,
  FaClipboardList,
  FaPlus,
} from "react-icons/fa";

import API from "../services/api";

import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";
import GlassCard from "../components/GlassCard";
import GradientButton from "../components/GradientButton";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await API.get("/interviews");

      setInterviews(res.data.interviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuroraBackground>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-gray-300 mt-3 text-lg">
            Manage all your AI Generated Interviews
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* Total Interviews */}
          <GlassCard>
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-300">
                  Total Interviews
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {interviews.length}
                </h2>
              </div>

              <FaClipboardList
                size={42}
                className="text-cyan-400"
              />

            </div>
          </GlassCard>

          {/* AI Engine */}
          <GlassCard>
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-300">
                  AI Engine
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  Gemini
                </h2>
              </div>

              <FaLaptopCode
                size={42}
                className="text-purple-400"
              />

            </div>
          </GlassCard>

          {/* Create Interview */}
          <GlassCard>
            <Link to="/create-interview">
              <GradientButton>
                <div className="flex justify-center items-center gap-3">
                  <FaPlus />
                  Create Interview
                </div>
              </GradientButton>
            </Link>
          </GlassCard>

        </div>

        {/* Interview Section */}
        <h2 className="text-3xl text-white font-bold mt-14 mb-8">
          Your Interviews
        </h2>

        {interviews.length === 0 ? (

          <GlassCard>
            <div className="py-16 text-center">

              <FaClipboardList
                size={70}
                className="mx-auto text-cyan-400"
              />

              <h2 className="text-3xl text-white mt-6">
                No Interviews Yet
              </h2>

              <p className="text-gray-300 mt-3">
                Create your first AI Interview to get started.
              </p>

              <div className="mt-8">
                <Link to="/create-interview">

                  <GradientButton>
                    <div className="flex justify-center items-center gap-2">
                      <FaPlus />
                      Create Interview
                    </div>
                  </GradientButton>

                </Link>
              </div>

            </div>
          </GlassCard>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {interviews.map((interview) => (

              <motion.div
                key={interview._id}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <Link to={`/interview/${interview._id}`}>

                  <GlassCard>

                    {/* Job Role */}
                    <h2 className="text-2xl font-bold text-white">
                      {interview.jobRole}
                    </h2>

                    {/* Tech Stack */}
                    <p className="text-cyan-300 mt-3">
                      {interview.techStack?.join(" • ") ||
                        "No Tech Stack"}
                    </p>

                    {/* Status */}
                    <div className="mt-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          interview.evaluationCompleted
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {interview.evaluationCompleted
                          ? "Completed"
                          : "Pending"}
                      </span>

                    </div>

                    {/* Interview Information */}
                    <div className="mt-6 space-y-2 text-gray-300">

                      <p>
                        Experience :

                        <span className="text-white ml-2">
                          {interview.experience}
                        </span>
                      </p>

                      <p>
                        Questions :

                        <span className="text-white ml-2">
                          {interview.numberOfQuestions ||
                            interview.questions?.length ||
                            0}
                        </span>
                      </p>

                    </div>

                    {/* View Interview */}
                    <div className="flex justify-end mt-8">

                      <span className="flex items-center gap-2 text-cyan-400 font-semibold">

                        View Interview

                        <FaArrowRight />

                      </span>

                    </div>

                  </GlassCard>

                </Link>

              </motion.div>

            ))}

          </div>
        )}

      </div>
    </AuroraBackground>
  );
}

export default Dashboard;