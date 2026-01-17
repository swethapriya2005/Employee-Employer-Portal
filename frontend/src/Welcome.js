import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    title: 'Software Developer',
    icon: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
    line1: 'Seeks growth opportunities, work-life balance, and challenges.',
    line2: 'Looks for technical skills, teamwork, and reliability.',
  },
  {
    title: 'Marketing Specialist',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    line1: 'Desires creativity, recognition, and clear goals.',
    line2: 'Values data-driven strategies and communication skills.',
  },
  {
    title: 'Project Manager',
    icon: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
    line1: 'Focuses on delivery, timelines, and coordination.',
    line2: 'Values leadership, planning, and accountability.',
  },
  {
    title: 'UI / UX Designer',
    icon: 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png',
    line1: 'Seeks creative freedom and user-centered design challenges.',
    line2: 'Values usability, aesthetics, and collaboration.',
  },
  {
    title: 'Data Analyst',
    icon: 'https://cdn-icons-png.flaticon.com/512/4149/4149644.png',
    line1: 'Looks for data-driven decision-making opportunities.',
    line2: 'Values analytical thinking, accuracy, and insights.',
  },
  {
    title: 'DevOps Engineer',
    icon: 'https://cdn-icons-png.flaticon.com/512/919/919832.png',
    line1: 'Focuses on automation, scalability, and system reliability.',
    line2: 'Values cloud skills, CI/CD, and monitoring.',
  },
  {
    title: 'Business Analyst',
    icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087840.png',
    line1: 'Bridges business needs and technical solutions.',
    line2: 'Values communication, documentation, and analysis.',
  },
  {
    title: 'QA Engineer',
    icon: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
    line1: 'Ensures product quality and reliability.',
    line2: 'Values attention to detail and test automation.',
  },
  {
    title: 'Product Manager',
    icon: 'https://cdn-icons-png.flaticon.com/512/595/595067.png',
    line1: 'Defines product vision and roadmap.',
    line2: 'Values strategy, user feedback, and leadership.',
  },
];

function Welcome() {
  const navigate = useNavigate();
  const aboutRef = useRef(null);

  return (
    <div style={{ backgroundColor: '#f8fafc', fontFamily: 'Inter, Arial' }}>

      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(to right, #0f172a, #1e293b)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff'
      }}>
        <h1>Employee Employer</h1>

        <nav style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline" onClick={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })}>About</button>
          <button className="btn-outline" onClick={() => navigate('/login')}>Join</button>
          <button className="btn-outline" onClick={() => navigate('/allprofiles')}>All Profiles</button>
          <button className="btn-primary" onClick={() => navigate('/post-project')}>Post Project</button>
        </nav>
      </header>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(to right, #020617, #0f172a)',
        color: '#fff',
        textAlign: 'center',
        padding: '4rem 1rem'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '700' }}>Connect Talent with Opportunity</h2>
        <p style={{ color: '#cbd5e1' }}>A professional platform for employers and employees</p>
        <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/start-hiring')}>
          Start Hiring
        </button>
      </section>

      {/* ROLES */}
      <section style={{ padding: '4rem 2rem', background: '#fff' }}>
        <h2 style={{ textAlign: 'center' }}>Understand the Perspectives</h2>

        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '3rem',
          overflowX: 'auto'
        }}>
          {roles.map(role => (
            <div key={role.title} style={{
              minWidth: '300px',
              background: '#f9fafb',
              borderRadius: '14px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <img src={role.icon} alt="" width="60" />
              <h3 style={{ color: '#2563eb', marginTop: '1rem' }}>{role.title}</h3>
              <p style={{ color: '#475569' }}>{role.line1}</p>
              <p style={{ color: '#64748b' }}>{role.line2}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT CARDS */}
      <section ref={aboutRef} style={{ padding: '4rem 2rem', background: '#f8fafc', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem' }}>About Us</h2>
        <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#64748b' }}>
          At <b>Employee Employer</b>, we connect talented individuals with the right employers.
        </p>

        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '3rem'
        }}>
          {[ 
            { title: 'For Employees', icon: '👨‍💼', text: 'Find jobs aligned with your skills and goals.' },
            { title: 'For Employers', icon: '🏢', text: 'Hire top talent using smart tools.' },
            { title: 'Smart Matching', icon: '🤝', text: 'Right people for the right roles.' },
          ].map(card => (
            <div key={card.title} style={{
              background: '#fff',
              width: '260px',
              padding: '2rem',
              borderRadius: '14px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '2.5rem' }}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p style={{ color: '#64748b' }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN US */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
        color: '#fff',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <h2>Join Us</h2>
        <p style={{ maxWidth: '700px', margin: '1rem auto' }}>
          Build your profile, connect with opportunities, and grow together.
        </p>
        <button className="btn-primary" style={{ background: '#fff', color: '#2563eb' }}>
          <button className="btn-outline" onClick={() => navigate('/login')}>Join the Platform</button>
        </button>
      </section>



     

      {/* FOOTER */}
      <footer style={{
        background: '#020617',
        color: '#cbd5e1',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <p>📍 Hyderabad, Telangana – 500000</p>
        <p>📧 employeeemployer@gmail.com</p>
        <p>📞 +91 XXXXX XXXXX</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          © 2025 Employee Employer. All Rights Reserved.
        </p>
      </footer>

      {/* BUTTON STYLES */}
      <style>{`
        .btn-outline {
          background: transparent;
          border: 2px solid #2563eb;
          color: #2563eb;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700; /* Bold text */
        }
        .btn-primary {
          background: #2563eb;
          border: none;
          color: white;
          padding: 0.7rem 1.8rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700; /* Bold text */
        }
      `}</style>
    </div>
  );
}

export default Welcome;
