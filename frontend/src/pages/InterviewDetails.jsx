import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetchInterview();
  }, []);

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
        <h2 style={{ padding: "20px" }}>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <h1>{interview.jobRole}</h1>

        <hr />

        <p>
          <strong>Experience:</strong>{" "}
          {interview.experience}
        </p>

        <p>
          <strong>Tech Stack:</strong>{" "}
          {interview.techStack.join(", ")}
        </p>

        <p>
          <strong>Total Questions:</strong>{" "}
          {interview.numberOfQuestions}
        </p>

        <hr />

        <h2>AI Generated Questions</h2>

        {interview.questions.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <h3>Question {index + 1}</h3>

            <p>{item.question}</p>
          </div>
        ))}

        <br />

        <button
          onClick={deleteInterview}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete Interview
        </button>
      </div>
    </>
  );
}

export default InterviewDetails;