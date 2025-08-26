import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Code, Video, Users, TrendingUp, Monitor } from 'lucide-react';

const ProfessorDashboard = ({ user }) => {
  // Mock data for professor dashboard
  const classStats = {
    totalStudents: 45,
    assignmentsGraded: 23,
    materialsUploaded: 12,
    averageGrade: 85
  };

  const recentSubmissions = [
    { id: 1, student: 'John Doe', assignment: 'Data Structures Assignment', submittedAt: '2025-01-08 14:30', status: 'pending' },
    { id: 2, student: 'Jane Smith', assignment: 'Algorithm Analysis', submittedAt: '2025-01-08 12:15', status: 'graded' },
    { id: 3, student: 'Mike Johnson', assignment: 'Database Project', submittedAt: '2025-01-08 09:45', status: 'pending' }
  ];

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome back, Professor {user.name}!</h1>
        <p>Manage your classes and track student progress.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="mb-3">Class Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <Users size={24} className="stat-icon" />
              <div className="stat-info">
                <h3>{classStats.totalStudents}</h3>
                <p>Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <ClipboardList size={24} className="stat-icon" />
              <div className="stat-info">
                <h3>{classStats.assignmentsGraded}</h3>
                <p>Assignments Graded</p>
              </div>
            </div>
            <div className="stat-card">
              <BookOpen size={24} className="stat-icon" />
              <div className="stat-info">
                <h3>{classStats.materialsUploaded}</h3>
                <p>Materials Uploaded</p>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp size={24} className="stat-icon" />
              <div className="stat-info">
                <h3>{classStats.averageGrade}%</h3>
                <p>Average Grade</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="mb-3">Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/materials" className="quick-action-card">
              <BookOpen size={24} />
              <span>Upload Materials</span>
            </Link>
            <Link to="/assignments" className="quick-action-card">
              <ClipboardList size={24} />
              <span>Create Assignment</span>
            </Link>
            <Link to="/code-editor" className="quick-action-card">
              <Code size={24} />
              <span>C++ Demo</span>
            </Link>
            <Link to="/video-summary" className="quick-action-card">
              <Video size={24} />
              <span>Video Tools</span>
            </Link>
            <Link to="/live-class" className="quick-action-card">
              <Monitor size={24} />
              <span>Conduct Class</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3">Recent Submissions</h2>
        <div className="submissions-table">
          <div className="table-header">
            <div>Student</div>
            <div>Assignment</div>
            <div>Submitted At</div>
            <div>Status</div>
          </div>
          {recentSubmissions.map(submission => (
            <div key={submission.id} className="table-row">
              <div className="student-name">{submission.student}</div>
              <div>{submission.assignment}</div>
              <div>{submission.submittedAt}</div>
              <div>
                <span className={`badge badge-${submission.status}`}>
                  {submission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;