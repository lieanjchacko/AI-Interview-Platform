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
      setInterviews(res.data.interviews);
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
            Manage all your AI generated interviews
          </p>
        </motion.div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

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
                className="text-cyan-400"
                size={42}
              />

            </div>

          </GlassCard>

          <GlassCard>

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-300">
                  AI Powered
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  Gemini
                </h2>

              </div>

              <FaLaptopCode
                className="text-purple-400"
                size={42}
              />

            </div>

          </GlassCard>

          <GlassCard>

            <Link to="/create-interview">

              <GradientButton>

                <div className="flex items-center justify-center gap-3">

                  <FaPlus />

                  Create Interview

                </div>

              </GradientButton>

            </Link>

          </GlassCard>

        </div>

        {/* Interviews */}

        <h2 className="text-3xl text-white font-bold mt-14 mb-8">
          Your Interviews
        </h2>

        {interviews.length === 0 ? (

          <GlassCard>

            <div className="text-center py-16">

              <FaClipboardList
                size={70}
                className="mx-auto text-cyan-400"
              />

              <h2 className="text-3xl text-white mt-6">
                No Interviews Yet
              </h2>

              <p className="text-gray-300 mt-3">
                Create your first AI Interview
              </p>

            </div>

          </GlassCard>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {interviews.map((interview) => (

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                key={interview._id}
              >

                <Link
                  to={`/interview/${interview._id}`}
                >

                  <GlassCard>

                    <h2 className="text-2xl font-bold text-white">

                      {interview.jobRole}

                    </h2>

                    <p className="text-cyan-300 mt-3">

                      {interview.techStack.join(" • ")}

                    </p>

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
                          {interview.numberOfQuestions}
                        </span>

                      </p>

                    </div>

                    <div className="flex justify-end mt-8">

                      <span className="text-cyan-400 flex items-center gap-2">

                        View

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