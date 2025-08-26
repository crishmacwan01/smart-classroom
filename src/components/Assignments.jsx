import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Assignments = ({ user }) => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Data Structures Implementation',
      description: 'Implement various data structures in C++',
      course: 'CS 201',
      dueDate: '2025-01-15',
      dueTime: '23:59',
      points: 100,
      status: 'active',
      submissions: 12
    },
    {
      id: 2,
      title: 'Algorithm Analysis Report',
      description: 'Analyze time complexity of sorting algorithms',
      course: 'CS 301',
      dueDate: '2025-01-20',
      dueTime: '23:59',
      points: 150,
      status: 'active',
      submissions: 8
    },
    {
      id: 3,
      title: 'Database Design Project',
      description: 'Design and implement a relational database',
      course: 'CS 401',
      dueDate: '2025-01-10',
      dueTime: '23:59',
      points: 200,
      status: 'overdue',
      submissions: 25
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    dueTime: '23:59',
    points: 100
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const assignment = {
      id: Date.now(),
      ...newAssignment,
      status: 'active',
      submissions: 0
    };
    
    setAssignments([assignment, ...assignments]);
    setNewAssignment({
      title: '',
      description: '',
      course: '',
      dueDate: '',
      dueTime: '23:59',
      points: 100
    });
    setShowCreateForm(false);
  };

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (assignment) => {
    const daysLeft = getDaysUntilDue(assignment.dueDate);
    if (daysLeft < 0) return 'overdue';
    if (daysLeft <= 3) return 'urgent';
    return 'normal';
  };

  return (
    <div className="container">
      <div className="assignments-header">
        <h1>Assignments</h1>
        {user.role === 'professor' && (
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn btn-success"
          >
            <Plus size={18} />
            Create Assignment
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Assignment</h3>
            <form onSubmit={handleCreateAssignment}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course:</label>
                <input
                  type="text"
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Time:</label>
                <input
                  type="time"
                  value={newAssignment.dueTime}
                  onChange={(e) => setNewAssignment({...newAssignment, dueTime: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Points:</label>
                <input
                  type="number"
                  value={newAssignment.points}
                  onChange={(e) => setNewAssignment({...newAssignment, points: parseInt(e.target.value)})}
                  className="form-control"
                  min="1"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="assignments-grid">
        {assignments.map(assignment => {
          const daysLeft = getDaysUntilDue(assignment.dueDate);
          const statusColor = getStatusColor(assignment);
          
          return (
            <div key={assignment.id} className={`assignment-card ${statusColor}`}>
              <div className="assignment-header">
                <div className="assignment-title">
                  <h3>{assignment.title}</h3>
                  <span className="course-tag">{assignment.course}</span>
                </div>
                <div className="assignment-status">
                  {statusColor === 'overdue' && <AlertCircle size={20} color="#e53935" />}
                  {statusColor === 'urgent' && <Clock size={20} color="#ff9800" />}
                  {statusColor === 'normal' && <CheckCircle size={20} color="#4caf50" />}
                </div>
              </div>
              
              <div className="assignment-body">
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-meta">
                  <div className="due-date">
                    <Calendar size={16} />
                    <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                  </div>
                  
                  <div className="points">
                    <span className="points-value">{assignment.points} points</span>
                  </div>
                  
                  {user.role === 'professor' && (
                    <div className="submissions-count">
                      <span>{assignment.submissions} submissions</span>
                    </div>
                  )}
                </div>
                
                <div className="time-remaining">
                  {daysLeft < 0 ? (
                    <span className="overdue-text">Overdue by {Math.abs(daysLeft)} days</span>
                  ) : daysLeft === 0 ? (
                    <span className="due-today">Due today!</span>
                  ) : (
                    <span className="days-left">{daysLeft} days remaining</span>
                  )}
                </div>
              </div>
              
              <div className="assignment-footer">
                {user.role === 'student' ? (
                  <button className="btn btn-primary">
                    {assignment.status === 'submitted' ? 'View Submission' : 'Submit Assignment'}
                  </button>
                ) : (
                  <div className="professor-actions">
                    <button className="btn btn-secondary">View Submissions</button>
                    <button className="btn btn-primary">Grade</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {assignments.length === 0 && (
        <div className="empty-state">
          <CheckCircle size={48} />
          <h3>No assignments yet</h3>
          <p>Check back later for new assignments.</p>
        </div>
      )}
    </div>
  );
};

export default Assignments;