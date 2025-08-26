import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Code, Video, Calendar, Clock, Users } from 'lucide-react';

const StudentDashboard = ({ user }) => {
  // Mock data for student dashboard
  const upcomingAssignments = [
    { id: 1, title: 'Data Structures Assignment', course: 'CS 201', dueDate: '2025-01-15', status: 'pending' },
    { id: 2, title: 'Algorithm Analysis', course: 'CS 301', dueDate: '2025-01-20', status: 'pending' },
    { id: 3, title: 'Database Project', course: 'CS 401', dueDate: '2025-01-10', status: 'overdue' }
  ];

  const recentMaterials = [
    { id: 1, title: 'C++ Pointers and References', course: 'CS 201', uploadDate: '2025-01-05' },
    { id: 2, title: 'Binary Trees Lecture Notes', course: 'CS 301', uploadDate: '2025-01-03' },
    { id: 3, title: 'SQL Joins Tutorial', course: 'CS 401', uploadDate: '2025-01-02' }
  ];

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's what's happening in your classes today.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="mb-3">Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/materials" className="quick-action-card">
              <BookOpen size={24} />
              <span>Study Materials</span>
            </Link>
            <Link to="/assignments" className="quick-action-card">
              <ClipboardList size={24} />
              <span>Assignments</span>
            </Link>
            <Link to="/code-editor" className="quick-action-card">
              <Code size={24} />
              <span>C++ Editor</span>
            </Link>
            <Link to="/video-summary" className="quick-action-card">
              <Video size={24} />
              <span>Video Summary</span>
            </Link>
            <Link to="/live-class" className="quick-action-card">
              <Users size={24} />
              <span>Live Class</span>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-3">
            <Clock size={20} />
            Upcoming Assignments
          </h2>
          <div className="assignment-list">
            {upcomingAssignments.map(assignment => (
              <div key={assignment.id} className="assignment-item">
                <div className="assignment-info">
                  <h4>{assignment.title}</h4>
                  <p className="course-name">{assignment.course}</p>
                  <div className="assignment-meta">
                    <Calendar size={16} />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
                <span className={`badge badge-${assignment.status}`}>
                  {assignment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3">Recent Study Materials</h2>
        <div className="materials-grid">
          {recentMaterials.map(material => (
            <div key={material.id} className="material-card">
              <BookOpen size={20} className="material-icon" />
              <div className="material-info">
                <h4>{material.title}</h4>
                <p>{material.course}</p>
                <small>Uploaded: {material.uploadDate}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;