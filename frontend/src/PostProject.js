import React, { useState } from 'react';

const PostProject = () => {
  const [option, setOption] = useState('');

  const handleOptionSelect = (selectedOption) => {
    setOption(selectedOption);
  };

  const handleGoBack = () => {
    setOption('');
  };

  const renderForm = () => {
    if (option === 'jobSeeker') return <JobSeekerForm goBack={handleGoBack} />;
    return null;
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={styles.card}>
        <h1 style={styles.heading}>Post a Project</h1>
        <p style={styles.subHeading}>What brings you here today?</p>

        {!option && (
          <div style={styles.optionGrid}>
            <div style={styles.optionCard} onClick={() => handleOptionSelect('jobSeeker')}>
              <div style={styles.icon}>🧑‍💻</div>
              <h3 style={styles.optionTitle}>Post Your Work</h3>
              <p style={styles.optionDesc}>Submit your best project and showcase your skills.</p>
              <button style={styles.cardButton}>Submit Work</button>
            </div>
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
};

// === JobSeekerForm Component ===
const JobSeekerForm = ({ goBack }) => {
  const [errors, setErrors] = useState({});
  const [projectFile, setProjectFile] = useState(null);

  const validate = (data) => {
    const errs = {};
    if (!data.project_title) errs.project_title = 'Required';
    if (!data.description) errs.description = 'Required';
    if (!data.technologies_used) errs.technologies_used = 'Required';
    if (!data.duration) errs.duration = 'Required';
    if (!data.role) errs.role = 'Required';
    if (!data.team_size) errs.team_size = 'Required';
    if (!data.email) errs.email = 'Email required';
    if (!data.phone) errs.phone = 'Phone required';
    if (!projectFile) errs.project_document = 'File required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      project_title: form.project_title.value,
      description: form.description.value,
      technologies_used: form.technologies_used.value,
      project_link: form.project_link.value,
      duration: form.duration.value,
      role: form.role.value,
      team_size: form.team_size.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    const errs = validate(data);
    if (Object.keys(errs).length > 0) return setErrors(errs);

    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => formData.append(key, val));
    formData.append('project_document', projectFile);

    try {
      const res = await fetch('http://localhost:5000/api/jobSeekerProjects', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        alert('Submitted!');
        form.reset();
        setProjectFile(null);
        setErrors({});
        goBack();
      } else {
        alert('Failed to submit!');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
      <h2 style={styles.centerHeading}>Submit Project</h2>

      {['project_title', 'description', 'technologies_used', 'project_link', 'duration', 'role', 'team_size', 'email', 'phone'].map((field, i) => (
        <label key={i} style={styles.label}>
          {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
          {field === 'description' ? (
            <textarea name={field} style={styles.textarea}></textarea>
          ) : (
            <input
              type={
                field === 'team_size' ? 'number'
                : field === 'email' ? 'email'
                : field === 'phone' ? 'tel'
                : 'text'
              }
              name={field}
              style={styles.input}
            />
          )}
          {errors[field] && <span style={styles.error}>{errors[field]}</span>}
        </label>
      ))}

      <label style={styles.label}>
        Project Document:
        <input type="file" name="project_document" onChange={(e) => setProjectFile(e.target.files[0])} style={styles.input} accept=".pdf,.doc,.docx" />
        {errors.project_document && <span style={styles.error}>{errors.project_document}</span>}
      </label>

      <div style={styles.buttonGroup}>
        <button type="button" onClick={goBack} style={styles.backButton}>⬅ Back</button>
        <button type="submit" style={styles.submitButton}>Submit Project</button>
      </div>
    </form>
  );
};

// === Styles ===
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8fafc', // matches Welcome page background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    background: '#fff', // card stays white like Welcome page
    borderRadius: '15px',
    padding: '2rem',
    width: '100%',
    maxWidth: '1200px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)', // slightly stronger shadow
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    fontWeight: '700',
  },
  centerHeading: {
    gridColumn: '1 / -1',
    fontSize: '1.7rem',
    color: '#2d3436',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '700',
  },
  subHeading: {
    fontSize: '1.5rem',
    color: '#333',
    borderBottom: '2px solid #2563eb', // changed to blue for consistency
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    textAlign: 'center',
  },
  optionGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: '2rem',
  },
  optionCard: {
    background: '#f9fafb', // lighter card background
    borderRadius: '15px',
    padding: '1.5rem',
    width: '280px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  optionTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  optionDesc: {
    fontSize: '0.95rem',
    margin: '1rem 0',
  },
  cardButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#2563eb', // matches Welcome page primary button
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '700',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    color: '#333',
  },
  input: {
    padding: '0.5rem',
    marginTop: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    padding: '0.5rem',
    marginTop: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
  submitButton: {
    backgroundColor: '#2563eb', // matches Welcome page button
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#64748b', // subtle gray-blue
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#fff',
    fontWeight: '700',
  },
  buttonGroup: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem',
  },
  error: {
    color: 'red',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
};

export default PostProject;
