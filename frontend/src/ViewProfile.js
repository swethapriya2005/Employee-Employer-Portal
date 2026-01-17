import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/profiles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "success" && json.data) setProfile(json.data);
        else {
          alert("Profile not found.");
          navigate("/employer-dashboard");
        }
      })
      .catch(() => {
        alert("Server unreachable");
        navigate("/employer-dashboard");
      });
  }, [id, navigate]);

  if (!profile)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "5rem",
          fontSize: "1.5rem",
          color: "#2563eb",
          fontWeight: 700,
        }}
      >
        Loading profile...
      </p>
    );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>{profile.fullName}'s Profile</h1>

        {profile.profilePhoto && (
          <div style={styles.photoWrapper}>
            <img
              src={`http://localhost:5000/uploads/photos/${profile.profilePhoto}`}
              alt="Profile"
              style={styles.profilePhoto}
            />
          </div>
        )}

        <div style={styles.infoGrid}>
          <p>
            <strong>Professional Title:</strong> {profile.professionalTitle || "—"}
          </p>
          <p>
            <strong>Experience:</strong> {profile.experience || 0} yr
          </p>
          <p>
            <strong>City:</strong> {profile.city || "—"}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>Alternate Phone:</strong> {profile.alternatePhone || "—"}
          </p>
          <p>
            <strong>Qualification:</strong> {profile.qualification || "—"}
          </p>
          <p>
            <strong>Technical Languages:</strong> {profile.technicalLanguages || "—"}
          </p>
          <p style={{ gridColumn: "span 2" }}>
            <strong>Github Link:</strong>{" "}
            {profile.githubLink ? (
              <a
                href={profile.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {profile.githubLink}
              </a>
            ) : (
              "—"
            )}
          </p>
        </div>

        {profile.resume && (
          <p style={{ marginTop: 30, textAlign: "center" }}>
            <a
              href={`http://localhost:5000/uploads/resumes/${profile.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.resumeBtn}
            >
              📄 View Resume
            </a>
          </p>
        )}

        <div style={styles.actionRow}>
          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}/view-profile/${id}`;
              navigator.clipboard.writeText(shareUrl);
              alert("Profile link copied to clipboard!");
            }}
            style={styles.shareBtn}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0b8043")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#34a853")}
          >
            📤 Share Profile
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check out this profile: ${window.location.origin}/view-profile/${id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.whatsappBtn}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#128C7E")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: 24, height: 24 }}
            />
            Share On WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ===== Styles =====
const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px 20px",
    backgroundColor: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    maxWidth: 700,
    width: "100%",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    color: "#2563eb",
    fontWeight: 700,
    fontSize: "2rem",
  },
  photoWrapper: { display: "flex", justifyContent: "center", marginBottom: 30 },
  profilePhoto: {
    width: 160,
    height: 160,
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #2563eb",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    rowGap: 15,
    columnGap: 40,
    fontSize: "1.1rem",
  },
  link: { color: "#2563eb", textDecoration: "underline" },
  resumeBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    boxShadow: "0 3px 10px rgba(37, 99, 235, 0.3)",
    display: "inline-block",
  },
  actionRow: {
    textAlign: "center",
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  shareBtn: {
    backgroundColor: "#34a853",
    color: "#fff",
    padding: "12px 28px",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 3px 10px rgba(52,168,83,0.4)",
    transition: "background-color 0.3s ease",
  },
  whatsappBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: "700",
    textDecoration: "none",
    boxShadow: "0 3px 10px rgba(37,211,102,0.4)",
    transition: "background-color 0.3s ease",
  },
};
