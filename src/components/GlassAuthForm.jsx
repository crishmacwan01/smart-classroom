import React, { useState } from 'react';
import { User, Lock, UserCheck } from 'lucide-react';

/**
 * GlassAuthForm – a glassmorphic styled login form.
 * Props:
 *   onLogin: function(userData) – called after successful mock authentication.
 */
const GlassAuthForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    // Mock authentication – in a real app replace with API call
    const userData = {
      id: Date.now(),
      name: formData.email.split('@')[0],
      email: formData.email,
      role: formData.role,
    };
    onLogin(userData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Inline glassmorphic style – keeps the component self‑contained without extra CSS files.
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    color: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    marginTop: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.4)',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: '#fff',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  return (
    <div className="glass-auth-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-auth-card" style={glassStyle}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <UserCheck size={48} />
          <h2 style={{ marginTop: '0.5rem' }}>Welcome Back</h2>
          <p>Sign in to continue</p>
        </div>
        {error && (
          <div style={{ background: 'rgba(255,0,0,0.2)', padding: '0.5rem', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ ...inputStyle, appearance: 'none' }}
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <User size={18} style={{ position: 'absolute', marginLeft: '0.75rem' }} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{ ...inputStyle, paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', marginLeft: '0.75rem' }} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={{ ...inputStyle, paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <button type="submit" style={buttonStyle} onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseOut={e => (e.currentTarget.style.transform = 'none')}>
            Sign In
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: any@email.com | Password: any</p>
        </div>
      </div>
    </div>
  );
};

export default GlassAuthForm;
