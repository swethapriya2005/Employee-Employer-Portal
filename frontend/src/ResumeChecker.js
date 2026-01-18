import React, { useState } from "react";
import axios from "axios";

const ResumeChecker = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobTitle || !jobDescription) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("profileId", 1);

      const res = await axios.post(
        "http://localhost:5000/api/check-resume",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Resume check failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📄 ATS Resume Checker</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            style={styles.fileInput}
            onChange={(e) => setResume(e.target.files[0])}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Checking..." : "Check Resume"}
          </button>
        </form>

        {result && (
          <div style={styles.resultBox}>
            <h3>ATS Score: {result.score}%</h3>
            <p><b>Matched:</b> {result.matched.join(", ") || "None"}</p>
            <p><b>Missing:</b> {result.missing.join(", ") || "None"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeChecker;

/* ===== Inline Styles ===== */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", // Updated professional light gradient
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
  },
  card: {
    background: "#ffffff",
    padding: 40,
    borderRadius: 15,
    width: "100%",
    maxWidth: 500,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
    fontSize: 28,
    fontWeight: 600,
  },
  error: {
    color: "#e74c3c",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 500,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 15,
  },
  textarea: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 15,
    minHeight: 100,
    resize: "vertical",
  },
  fileInput: {
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#667eea",
    color: "#fff",
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  resultBox: {
    marginTop: 25,
    padding: "15px 20px",
    borderRadius: 10,
    backgroundColor: "#f4f6ff",
    borderLeft: "5px solid #667eea",
  },
};
