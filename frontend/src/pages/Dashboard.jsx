import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await api.get("/interviews");
      setInterviews(res.data.interviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Dashboard</h1>

      <hr />

      <h2>Your Interviews</h2>

      {interviews.length === 0 ? (
        <p>No interviews found.</p>
      ) : (
        interviews.map((interview) => (
          <Link
            key={interview._id}
            to={`/interview/${interview._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid gray",
                margin: "15px",
                padding: "15px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              <h3>{interview.jobRole}</h3>

              <p>
                <strong>Experience:</strong> {interview.experience}
              </p>

              <p>
                <strong>Tech Stack:</strong>{" "}
                {interview.techStack.join(", ")}
              </p>

              <p>
                <strong>Questions:</strong>{" "}
                {interview.numberOfQuestions}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Dashboard;