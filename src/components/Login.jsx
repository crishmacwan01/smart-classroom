import React, { useState } from 'react';
import { User, Lock, UserCheck } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock authentication - in real app, this would be an API call
    const userData = {
      id: Date.now(),
      name: formData.email.split('@')[0],
      email: formData.email,
      role: formData.role
    };

    onLogin(userData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <UserCheck size={48} className="login-icon" />
          <h1>Welcome to EduClass</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="role">Login as:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="btn login-btn">
            Sign In
          </button>
        </form>

        <div className="login-demo">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: any@email.com | Password: any</p>
        </div>
      </div>
    </div>
  );
};

export default Login;