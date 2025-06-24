import React, { useEffect, useState } from 'react';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [teamSizeFilter, setTeamSizeFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  const perPage = 8;

  useEffect(() => {
    fetch('http://localhost:5000/api/jobSeekerProjects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
      })
      .catch((err) => console.error('Error fetching:', err));
  }, []);

  const resetFilters = () => {
    setSearch('');
    setTechFilter('');
    setDurationFilter('');
    setTeamSizeFilter('');
    setSortOption('');
    setCurrentPage(1);
  };

  const filtered = projects
    .filter((p) => {
      const matchTitle = p.project_title?.toLowerCase().includes(search.toLowerCase());
      const matchTech = techFilter ? p.technologies_used?.toLowerCase().includes(techFilter.toLowerCase()) : true;
      const matchDuration = durationFilter ? p.duration?.toLowerCase().includes(durationFilter.toLowerCase()) : true;
      const matchTeamSize = teamSizeFilter ? p.team_size?.toString() === teamSizeFilter : true;
      return matchTitle && matchTech && matchDuration && matchTeamSize;
    })
    .sort((a, b) => {
      if (sortOption === 'teamSize') return Number(a.team_size) - Number(b.team_size);
      if (sortOption === 'duration') return a.duration.localeCompare(b.duration);
      if (sortOption === 'title') return a.project_title.localeCompare(b.project_title);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentProjects = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const sendNotification = async () => {
    if (!notificationMessage.trim()) return alert('Enter a message');
    try {
      const res = await fetch('http://localhost:5000/api/notify-jobseeker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedContact.email,
          phone: selectedContact.phone,
          message: notificationMessage
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNotificationStatus('✅ Notification sent!');
        setNotificationMessage('');
      } else {
        setNotificationStatus('❌ Failed to send');
      }
    } catch (err) {
      setNotificationStatus('❌ Error sending notification');
      console.error('Notification error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Job Seeker Projects</h1>

      <div style={styles.filters}>
        <input type="text" placeholder="Search by Title" value={search} onChange={(e) => setSearch(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Filter by Technology" value={techFilter} onChange={(e) => setTechFilter(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Filter by Duration" value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} style={styles.input} />
        <input type="number" placeholder="Filter by Team Size" value={teamSizeFilter} onChange={(e) => setTeamSizeFilter(e.target.value)} style={styles.input} />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={styles.input}>
          <option value="">Sort By</option>
          <option value="teamSize">Team Size</option>
          <option value="duration">Duration</option>
          <option value="title">Title</option>
        </select>
        <button onClick={resetFilters} style={styles.resetBtn}>Reset</button>
      </div>

      <div style={styles.grid}>
        {currentProjects.map((p, i) => (
          <div key={i} style={styles.card}>
            <h2 style={styles.title}>{p.project_title}</h2>
            <p><strong>Description:</strong> {p.description}</p>
            <p><strong>Technologies:</strong> {p.technologies_used}</p>
            <p><strong>Duration:</strong> {p.duration}</p>
            <p><strong>Role:</strong> {p.role}</p>
            <p><strong>Team Size:</strong> {p.team_size}</p>
            <p><strong>Project Link:</strong> <a href={p.project_link} target="_blank" rel="noreferrer" style={styles.link}>{p.project_link}</a></p>

            <div style={styles.buttonRow}>
              {p.project_document && (
                <a
                  href={`http://localhost:5000/uploads/project_documents/${p.project_document}`}
                  download
                  style={styles.downloadLink}
                >
                  📄 Download
                </a>
              )}
              <button
                style={styles.contactBtn}
                onClick={() => {
                  setSelectedContact(p);
                  setShowModal(true);
                }}
              >
                📧 Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === i + 1 ? '#fff' : '#ddd',
                color: currentPage === i + 1 ? '#000' : '#333',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {(showModal && selectedContact) && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Contact Job Seeker</h2>
            <p><strong>Email:</strong> {selectedContact.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> {selectedContact.phone || 'Not provided'}</p>
            <textarea
              placeholder="Write your message here..."
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              style={styles.textArea}
            />
            <button onClick={sendNotification} style={styles.notifyBtn}>🚀 Send Notification</button>
            {notificationStatus && <p>{notificationStatus}</p>}
            <button
              style={styles.closeBtn}
              onClick={() => {
                setShowModal(false);
                setNotificationMessage('');
                setNotificationStatus('');
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
    justifyContent: 'center',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    minWidth: '180px',
    fontSize: '1rem',
  },
  resetBtn: {
    padding: '0.75rem 1.2rem',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
    color: '#2c3e50',
  },
  link: {
    color: '#3498db',
    textDecoration: 'underline',
    wordBreak: 'break-word',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    gap: '0.5rem',
  },
  downloadLink: {
    flex: 1,
    textAlign: 'center',
    padding: '0.5rem 0.8rem',
    borderRadius: '6px',
    backgroundColor: '#f1c40f',
    color: '#000',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
  },
  contactBtn: {
    flex: 1,
    padding: '0.5rem 0.8rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
  },
  pagination: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  pageButton: {
    margin: '0 5px',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '320px',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
  },
  closeBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  textArea: {
    width: '100%',
    minHeight: '80px',
    padding: '10px',
    marginTop: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  notifyBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default AllProjects;
