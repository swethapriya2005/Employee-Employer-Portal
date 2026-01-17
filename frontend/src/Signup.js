import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    setSuccessMsg('');

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/signup', values)
        .then(res => {
          if (res.data.status === "success") {
            setSuccessMsg('Signup successful! Redirecting...');
            setTimeout(() => navigate('/login'), 1500);
          } else {
            alert("Signup failed");
          }
        })
        .catch(() => alert("Error during signup"));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to right, #020617, #0f172a)',
      }}
    >
      <div
        className="bg-white p-4 rounded position-relative"
        style={{
          width: '380px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Close */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#64748b',
          }}
        >
          &times;
        </button>

        <h2 className="mb-4 text-center" style={{ color: '#0f172a' }}>
          Signup
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="form-control"
            />
            {errors.name && <div className="text-danger small">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control"
            />
            {errors.email && <div className="text-danger small">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInput}
              className="form-control"
            />
            {errors.confirmPassword && (
              <div className="text-danger small">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleInput}
              className="form-select"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-100 text-white border-0 mb-3"
            style={{
              background: '#2563eb',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '600',
            }}
          >
            Sign Up
          </button>

          {successMsg && (
            <p className="text-success text-center small">{successMsg}</p>
          )}

          <div className="text-center">
            <Link
              to="/login"
              className="btn w-100"
              style={{
                border: '2px solid #2563eb',
                color: '#2563eb',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
