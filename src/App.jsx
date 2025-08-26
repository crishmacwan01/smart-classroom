import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import StudyMaterials from './components/StudyMaterials';
import Assignments from './components/Assignments';
import CodeEditor from './components/CodeEditor';
import VideoSummary from './components/VideoSummary';
import LiveClass from './components/LiveClass';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                user.role === 'student' ? 
                <StudentDashboard user={user} /> : 
                <ProfessorDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/materials" 
            element={user ? <StudyMaterials user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/assignments" 
            element={user ? <Assignments user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/code-editor" 
            element={user ? <CodeEditor user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/video-summary" 
            element={user ? <VideoSummary user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/live-class" 
            element={user ? <LiveClass user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;