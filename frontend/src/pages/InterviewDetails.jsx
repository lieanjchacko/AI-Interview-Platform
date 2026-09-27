import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlay,
  FaTrash,
  FaBriefcase,
  FaCode,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";

import api from "../services/api";
import Navbar from "../components/Navbar";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/interviews/${id}`);

      setInterview(res.data.interview);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Unable to load interview"
      );
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const deleteInterview = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await api.delete(`/interviews/${id}`);

      alert("Interview deleted successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete interview"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="text-slate-500">
                Loading interview...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!interview) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">

          {/* Back */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <FaArrowLeft size={13} />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>
                <p className="mb-2 text-sm font-medium text-blue-600">
                  Interview
                </p>

                <h1 className="text-2xl font-semibold text-slate-900">
                  {interview.jobRole}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Review your interview configuration and
                  generated questions.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/interview/${id}/start`)
                }
                className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaPlay size={12} />
                Start Interview
              </button>
            </div>
          </div>

          {/* Interview Information */}
          <section className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Interview Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Job Role */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <FaBriefcase size={14} />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Job Role
                  </span>
                </div>

                <p className="font-medium text-slate-900">
                  {interview.jobRole}
                </p>
              </div>

              {/* Experience */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <FaClock size={14} />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Experience
                  </span>
                </div>

                <p className="font-medium text-slate-900">
                  {interview.experience}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <FaCode size={14} />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Tech Stack
                  </span>
                </div>

                <p className="font-medium text-slate-900">
                  {interview.techStack.join(", ")}
                </p>
              </div>

              {/* Questions */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <FaQuestionCircle size={14} />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Questions
                  </span>
                </div>

                <p className="font-medium text-slate-900">
                  {interview.questions.length}
                </p>
              </div>

            </div>
          </section>

          {/* Questions */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Interview Questions
              </h2>

              <span className="text-sm text-slate-500">
                {interview.questions.length} questions
              </span>
            </div>

            <div className="space-y-3">
              {interview.questions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-sm font-semibold text-blue-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-6 text-slate-800">
                        {item.question}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Dashboard
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() =>
                  navigate(`/interview/${id}/start`)
                }
                className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaPlay size={12} />
                Start Interview
              </button>

              <button
                onClick={deleteInterview}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTrash size={12} />

                {deleting
                  ? "Deleting..."
                  : "Delete Interview"}
              </button>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}

export default InterviewDetails;