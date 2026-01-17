import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchExperience, setSearchExperience] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [contactProfile, setContactProfile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 8;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully.");
    navigate("/login");
  };

  const fetchProfiles = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/profiles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j) =>
        j.status === "success" ? setProfiles(j.data) : alert(j.message)
      )
      .catch(() => alert("Server unreachable"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((p) => {
    const expFilterNum = Number(searchExperience);
    const profileExp = Number(p.experience) || 0;

    return (
      (searchName === "" ||
        (p.fullName ?? "").toLowerCase().includes(searchName.toLowerCase())) &&
      (searchCity === "" ||
        (p.city ?? "").toLowerCase().includes(searchCity.toLowerCase())) &&
      (searchTitle === "" ||
        (p.professionalTitle ?? "")
          .toLowerCase()
          .includes(searchTitle.toLowerCase())) &&
      (searchEmail === "" ||
        (p.email ?? "").toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchPhone === "" ||
        (p.phone ?? "").toLowerCase().includes(searchPhone.toLowerCase())) &&
      (searchExperience === "" || profileExp >= expFilterNum)
    );
  });

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            style={styles.logo}
          />
          <h1 style={styles.headerTitle}>All Profiles</h1>
        </div>
        <div>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            🔙 Back
          </button>
        </div>
      </header>

      {/* Filters */}
      <div style={styles.filters}>
        <input placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} style={styles.input} />
        <input placeholder="Search by City" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} style={styles.input} />
        <input placeholder="Search by Title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} style={styles.input} />
        <input placeholder="Search by Email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} style={styles.input} />
        <input placeholder="Search by Phone" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} style={styles.input} />
        <input placeholder="Search by Experience" type="number" min="0" value={searchExperience} onChange={(e) => setSearchExperience(e.target.value)} style={styles.input} />
      </div>

      {/* Profiles */}
      {loading ? (
        <p style={styles.centerText}>Loading…</p>
      ) : paginatedProfiles.length === 0 ? (
        <p style={styles.centerText}>No profiles found.</p>
      ) : (
        <>
          <div style={styles.profileGrid}>
            {paginatedProfiles.map((p) => (
              <div key={p.id} style={styles.card}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {p.profilePhoto && (
                    <img
                      src={`http://localhost:5000/uploads/photos/${p.profilePhoto}`}
                      alt="Profile"
                      style={styles.profilePhoto}
                    />
                  )}
                </div>

                <h3 style={styles.cardTitle}>{p.fullName}</h3>
                <p><strong>Title:</strong> {p.professionalTitle}</p>
                <p><strong>Experience:</strong> {p.experience || 0} yr</p>
                <p><strong>City:</strong> {p.city || "—"}</p>
                <p><strong>Phone:</strong> {p.phone}</p>

                {p.resume && (
                  <a
                    href={`http://localhost:5000/uploads/resumes/${p.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.downloadLink}
                  >
                    📄 Download Resume
                  </a>
                )}

                <div style={styles.cardButtonRow}>
                  <button onClick={() => navigate(`/view-profile/${p.id}`)} style={styles.viewBtn}>👁 View</button>
                  <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/view-profile/${p.id}`); alert("Profile URL copied!"); }} style={styles.shareBtn}>🔗 Share</button>
                  <button onClick={() => { setContactProfile(p); setShowModal(true); }} style={styles.contactBtn}>📞 Contact</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={styles.pagination}>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={{ ...styles.pageBtn, opacity: currentPage === 1 ? 0.5 : 1 }}>◀ Prev</button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button key={pageNum} onClick={() => goToPage(pageNum)} style={{ ...styles.pageBtn, backgroundColor: pageNum === currentPage ? "#2563eb" : "#fff", color: pageNum === currentPage ? "#fff" : "#2563eb" }}>{pageNum}</button>
              );
            })}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ ...styles.pageBtn, opacity: currentPage === totalPages ? 0.5 : 1 }}>Next ▶</button>
          </div>
        </>
      )}

      {/* Contact Modal */}
      {showModal && contactProfile && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> {contactProfile.email}</p>
            <p><strong>Alternate Phone:</strong> {contactProfile.alternatePhone}</p>
            <button onClick={() => setShowModal(false)} style={styles.closeModalBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Styles
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, Arial, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "rgba(37,117,252,0.1)" },
  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  logo: { width: 40, height: 40, objectFit: "contain" },
  headerTitle: { fontWeight: "700", fontSize: "1.5rem", color: "#2563eb", margin: 0 },
  backBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, fontWeight: "700", cursor: "pointer", boxShadow: "0 3px 6px rgba(0,0,0,0.15)" },
  filters: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, padding: "1rem 2rem" },
  input: { padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontWeight: "700", boxShadow: "0 3px 6px rgba(0,0,0,0.05)" },
  centerText: { textAlign: "center", marginTop: "3rem", fontSize: "1.5rem", fontWeight: "700", color: "#2563eb" },
  profileGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, padding: "1rem 2rem" },
  card: { backgroundColor: "#fff", color: "#222", borderRadius: 12, padding: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 10 },
  profilePhoto: { width: 90, height: 90, borderRadius: "50%", objectFit: "cover", marginBottom: 8 },
  cardTitle: { margin: "0 0 6px", fontWeight: "700", color: "#2563eb", fontSize: "1.2rem" },
  downloadLink: { textDecoration: "none", color: "#2563eb", fontWeight: "700" },
  cardButtonRow: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
  viewBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: "700", cursor: "pointer", flexGrow: 1 },
  shareBtn: { backgroundColor: "#f39c12", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: "700", cursor: "pointer", flexGrow: 1 },
  contactBtn: { backgroundColor: "#8e44ad", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: "700", cursor: "pointer", flexGrow: 1 },
  pagination: { display: "flex", justifyContent: "center", gap: 10, margin: "1rem auto", flexWrap: "wrap" },
  pageBtn: { padding: "8px 14px", borderRadius: 8, border: "2px solid #2563eb", cursor: "pointer", fontWeight: "700" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", color: "#222", padding: "2rem", borderRadius: 12, width: "90%", maxWidth: 400, textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  closeModalBtn: { marginTop: 20, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: 10, borderRadius: 8, fontWeight: "700", cursor: "pointer", width: "100%" },
};
