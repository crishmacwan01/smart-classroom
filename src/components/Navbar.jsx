import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, BookOpen, ClipboardList, Code, Video, LogOut, Users } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <BookOpen size={24} />
          <span>EduClass</span>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <User size={18} />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/materials" 
            className={`navbar-link ${isActive('/materials') ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            <span>Materials</span>
          </Link>
          
          <Link 
            to="/assignments" 
            className={`navbar-link ${isActive('/assignments') ? 'active' : ''}`}
          >
            <ClipboardList size={18} />
            <span>Assignments</span>
          </Link>
          
          <Link 
            to="/code-editor" 
            className={`navbar-link ${isActive('/code-editor') ? 'active' : ''}`}
          >
            <Code size={18} />
            <span>C++ Editor</span>
          </Link>
          
          <Link 
            to="/video-summary" 
            className={`navbar-link ${isActive('/video-summary') ? 'active' : ''}`}
          >
            <Video size={18} />
            <span>Video Summary</span>
          </Link>
          
          <Link 
            to="/live-class" 
            className={`navbar-link ${isActive('/live-class') ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Live Class</span>
          </Link>
        </div>
        
        <div className="navbar-user">
          <span className="user-info">
            {user.name} ({user.role})
          </span>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;