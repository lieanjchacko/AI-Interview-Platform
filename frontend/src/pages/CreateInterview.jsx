import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaLaptopCode, FaListOl, FaArrowRight } from "react-icons/fa";

import API from "../services/api";

import Navbar from "../components/Navbar";
import AuroraBackground from "../components/AuroraBackground";
import GlassCard from "../components/GlassCard";
import GradientButton from "../components/GradientButton";
import InputField from "../components/InputField";

function CreateInterview() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    jobRole: "",
    experience: "",
    techStack: "",
    numberOfQuestions: 5,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/interviews", {
        jobRole: form.jobRole,
        experience: form.experience,
        techStack: form.techStack
          .split(",")
          .map((item) => item.trim()),
        numberOfQuestions: Number(form.numberOfQuestions),
      });

      alert("Interview Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <>
    <Navbar />

    <AuroraBackground>
      <div className="min-h-screen flex justify-center items-center px-5 py-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >

          <GlassCard>

            <h1 className="text-5xl font-bold text-white text-center">
              Create AI Interview
            </h1>

            <p className="text-center text-gray-300 mt-3 mb-10">
              Generate personalized AI interview questions in seconds.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="text-white mb-2 block">
                  Job Role
                </label>

                <InputField
                  icon={FaBriefcase}
                  name="jobRole"
                  placeholder="Frontend Developer"
                  value={form.jobRole}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-white mb-2 block">
                  Experience
                </label>

                <InputField
                  icon={FaLaptopCode}
                  name="experience"
                  placeholder="Fresher / 2 Years"
                  value={form.experience}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-white mb-2 block">
                  Tech Stack
                </label>

                <InputField
                  icon={FaCode}
                  name="techStack"
                  placeholder="React, Node.js, MongoDB"
                  value={form.techStack}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-white mb-2 block">
                  Number of Questions
                </label>

                <InputField
                  icon={FaListOl}
                  type="number"
                  name="numberOfQuestions"
                  value={form.numberOfQuestions}
                  onChange={handleChange}
                />
              </div>

              <GradientButton>

                <div className="flex justify-center items-center gap-3">

                  Generate Interview

                  <FaArrowRight />

                </div>

              </GradientButton>

            </form>

          </GlassCard>

        </motion.div>

      </div>
    </AuroraBackground>
  </>
);
}

export default CreateInterview;