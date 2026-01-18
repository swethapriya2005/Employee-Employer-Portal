import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const EmployeeProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    professionalTitle: "",
    qualification: "",
    experience: "",
    phone: "",
    alternatePhone: "",
    email: "",
    technicalLanguages: "",
    githubLink: "",
    profilePhoto: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) data.append(key, val);
    });

    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: data,
      });
      if (res.ok) alert("Profile submitted successfully!");
      else alert("Failed to submit profile.");
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  const handleLogout = () => {
    alert("Logged out.");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "Inter, Arial", background: "#f8fafc" }}>
      {/* HEADER */}
      <header
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
          <h1>Employee Dashboard</h1>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            className="btn-outline"
            onClick={() => navigate("/employee-profile")}
          >
            Add Profile
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate("/my-profiles")}
          >
            My Profiles
          </button>

          {/* ATS Resume Checker Link */}
          <Link
            to="/resume-checker"
            className="btn-primary"
            style={{ background: "#10b981" }}
          >
            Check Your Resume
          </Link>

          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* FORM SECTION */}
      <section
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "2rem",
          borderRadius: "14px",
          background: "#fff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2563eb" }}>
          Add Your Profile
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Personal Info */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <input
              style={inputStyle}
              placeholder="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              style={inputStyle}
              placeholder="Age"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
            />
            <select
              style={inputStyle}
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Professional Info */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <input
              style={inputStyle}
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <select
              style={inputStyle}
              name="professionalTitle"
              value={form.professionalTitle}
              onChange={handleChange}
            >
              <option value="">Professional Title</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Project Manager">Project Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
            <select
              style={inputStyle}
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
            >
              <option value="">Qualification</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Contact Info */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              placeholder="Alternate Phone"
              name="alternatePhone"
              value={form.alternatePhone}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Technical Info */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Technical Languages"
              name="technicalLanguages"
              value={form.technicalLanguages}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              placeholder="GitHub Link"
              name="githubLink"
              value={form.githubLink}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <input
              style={inputStyle}
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="btn-primary" type="submit">
              Submit Profile
            </button>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#020617",
          color: "#cbd5e1",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <p>📍 Hyderabad, Telangana – 500000</p>
        <p>📧 employeeemployer@gmail.com</p>
        <p>📞 +91 XXXXX XXXXX</p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          © 2025 Employee Employer. All Rights Reserved.
        </p>
      </footer>

      {/* BUTTON + INPUT STYLES */}
      <style>{`
        .btn-primary {
          background: #2563eb;
          border: none;
          color: white;
          padding: 0.7rem 1.8rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }
        .btn-outline {
          background: transparent;
          border: 2px solid #2563eb;
          color: #2563eb;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }
        input, select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  flex: "1 1 200px",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

export default EmployeeProfile;
