import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const navigate = useNavigate();

  const validate = (vals) => {
    const errs = {};
    if (!vals.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = 'Email is invalid';

    if (!vals.password) errs.password = 'Password is required';
    else if (vals.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (!vals.role) errs.role = 'Role is required';

    return errs;
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:5000/login', values)
        .then((res) => {
          if (res.data.status === 'success') {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('role', values.role);

            alert('Login successful!');
            navigate(values.role === 'employee' ? '/employee-profile' : '/employer-dashboard');
          } else {
            alert('Invalid credentials.');
          }
        })
        .catch(() => alert('Something went wrong.'));
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
          width: '360px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Close Button */}
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
          Login
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password with eye toggle */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleInput}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

            {/* Eye Icon: appears only if user typed a password */}
            {values.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showPassword ? (
                  // Open Eye SVG
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Closed Eye SVG
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.92 10.92 0 0 1 12 20c-7 0-11-8-11-8a21.64 21.64 0 0 1 5.47-6.16" />
                    <path d="M1 1l22 22" />
                    <path d="M10.47 10.47a3 3 0 0 0 4.24 4.24" />
                  </svg>
                )}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleInput}
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          {/* Login Button */}
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
            Log in
          </button>

          <p className="text-center small text-muted">
            By logging in, you agree to our terms.
          </p>

          {/* Forgot Password */}
          <div className="text-center mb-3">
            <Link to="/forgot-password" className="small text-decoration-none" style={{ color: '#2563eb' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Signup */}
          <Link
            to="/signup"
            className="btn w-100"
            style={{
              border: '2px solid #2563eb',
              color: '#2563eb',
              borderRadius: '8px',
              fontWeight: '600',
            }}
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
