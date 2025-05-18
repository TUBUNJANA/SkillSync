import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import "../index.css";

export default function ResumeUploader() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job", jobText);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/match",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Data received:", res.data.course_recommendations);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Safely parse course recommendations (stringified object)
  const parseCourses = (json) => {
    try {
      return JSON.parse(json);
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src={logo} alt="SkillSync Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-3xl font-bold text-blue-700">
            SkillSync Resume Matcher
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Job Description</label>
            <textarea
              rows="5"
              required
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Paste the job description here..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Matching..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md">
              <h2 className="font-bold text-blue-800 text-lg">
                🔍 Similarity Score
              </h2>
              <p className="text-blue-900 text-xl font-semibold">
                {parseFloat(result.similarity).toFixed(2)} %
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
              <h2 className="font-bold text-yellow-800 text-lg">
                ⚠️ Missing Skills
              </h2>
              <p className="text-yellow-900 whitespace-pre-wrap">
                {result.missing_skills}
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-md">
              <h2 className="font-bold text-green-800 text-lg mb-2">
                🎓 Course Recommendations
              </h2>
              {Object.entries(parseCourses(result.course_recommendations)).map(
                ([skill, courses]) => (
                  <div key={skill} className="mb-4">
                    <h3 className="font-semibold text-green-700 mb-1">
                      {skill}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {courses.map((course, index) => (
                        <li
                          key={index}
                          className="text-sm text-green-800 bg-green-100 p-2 rounded-md"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
