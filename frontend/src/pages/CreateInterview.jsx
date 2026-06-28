import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateInterview() {
  const navigate = useNavigate();

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
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
        <h1>Create Interview</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={form.jobRole}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={form.techStack}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="number"
            name="numberOfQuestions"
            value={form.numberOfQuestions}
            onChange={handleChange}
          />

          <br /><br />

          <button type="submit">
            Generate Interview
          </button>

        </form>
      </div>
    </>
  );
}

export default CreateInterview;