import React, { useState } from 'react';
import { Upload, Download, FileText, Calendar, Search } from 'lucide-react';

const StudyMaterials = ({ user }) => {
  const [materials, setMaterials] = useState([
    { id: 1, title: 'Introduction to C++', type: 'PDF', course: 'CS 201', uploadDate: '2025-01-05', size: '2.5 MB', downloads: 45 },
    { id: 2, title: 'Data Structures Slides', type: 'PPTX', course: 'CS 201', uploadDate: '2025-01-03', size: '5.1 MB', downloads: 32 },
    { id: 3, title: 'Algorithm Complexity', type: 'PDF', course: 'CS 301', uploadDate: '2025-01-02', size: '1.8 MB', downloads: 28 },
    { id: 4, title: 'Binary Search Implementation', type: 'CPP', course: 'CS 301', uploadDate: '2025-01-01', size: '15 KB', downloads: 67 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    course: '',
    type: 'PDF',
    file: null
  });

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = (e) => {
    e.preventDefault();
    if (newMaterial.title && newMaterial.course && newMaterial.file) {
      const material = {
        id: Date.now(),
        title: newMaterial.title,
        course: newMaterial.course,
        type: newMaterial.type,
        uploadDate: new Date().toISOString().split('T')[0],
        size: '1.2 MB',
        downloads: 0
      };
      
      setMaterials([material, ...materials]);
      setNewMaterial({ title: '', course: '', type: 'PDF', file: null });
      setShowUploadForm(false);
    }
  };

  const handleDownload = (materialId) => {
    setMaterials(materials.map(material => 
      material.id === materialId 
        ? { ...material, downloads: material.downloads + 1 }
        : material
    ));
    // In a real app, this would trigger an actual download
    alert('Download started!');
  };

  return (
    <div className="container">
      <div className="materials-header">
        <h1>Study Materials</h1>
        <div className="materials-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {user.role === 'professor' && (
            <button 
              onClick={() => setShowUploadForm(true)}
              className="btn btn-success"
            >
              <Upload size={18} />
              Upload Material
            </button>
          )}
        </div>
      </div>

      {showUploadForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload New Material</h3>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course:</label>
                <input
                  type="text"
                  value={newMaterial.course}
                  onChange={(e) => setNewMaterial({...newMaterial, course: e.target.value})}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  className="form-control"
                >
                  <option value="PDF">PDF</option>
                  <option value="PPTX">PowerPoint</option>
                  <option value="DOC">Document</option>
                  <option value="CPP">C++ File</option>
                </select>
              </div>
              <div className="form-group">
                <label>File:</label>
                <input
                  type="file"
                  onChange={(e) => setNewMaterial({...newMaterial, file: e.target.files[0]})}
                  className="form-control"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUploadForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="materials-grid">
        {filteredMaterials.map(material => (
          <div key={material.id} className="material-card">
            <div className="material-header">
              <FileText size={24} className="material-icon" />
              <div className="material-type">{material.type}</div>
            </div>
            <div className="material-body">
              <h3>{material.title}</h3>
              <p className="course-badge">{material.course}</p>
              <div className="material-meta">
                <span>
                  <Calendar size={14} />
                  {material.uploadDate}
                </span>
                <span>{material.size}</span>
                <span>{material.downloads} downloads</span>
              </div>
            </div>
            <div className="material-footer">
              <button 
                onClick={() => handleDownload(material.id)}
                className="btn btn-secondary"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No materials found</h3>
          <p>Try adjusting your search terms or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;