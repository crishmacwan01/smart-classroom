import React, { useState } from 'react';
import { Upload, Video, FileText, Download, Sparkles, Clock } from 'lucide-react';

const VideoSummary = ({ user }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [keyPoints, setKeyPoints] = useState([]);
  const [transcript, setTranscript] = useState('');
  
  // Mock previous summaries
  const [previousSummaries] = useState([
    {
      id: 1,
      title: 'Data Structures Lecture 1',
      date: '2025-01-05',
      duration: '45:32',
      summary: 'Introduction to arrays, linked lists, and basic operations. Covered time complexity analysis and practical implementations.',
      keyPoints: ['Array vs Linked List comparison', 'Big O notation basics', 'Memory allocation concepts']
    },
    {
      id: 2,
      title: 'C++ Pointers Deep Dive',
      date: '2025-01-03',
      duration: '38:15',
      summary: 'Comprehensive overview of pointer concepts, memory management, and common pitfalls in C++ programming.',
      keyPoints: ['Pointer arithmetic', 'Dynamic memory allocation', 'Memory leaks prevention']
    }
  ]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoUrl('');
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      setVideoFile(null);
      // Process URL
    }
  };

  const generateSummary = async () => {
    if (!videoFile && !videoUrl) {
      alert('Please upload a video file or enter a video URL');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = `This video provides a comprehensive introduction to advanced C++ concepts including object-oriented programming, memory management, and best practices. The instructor covers class inheritance, polymorphism, and virtual functions with practical examples. Key topics include constructor/destructor patterns, RAII principles, and modern C++11/14/17 features that improve code safety and performance.`;
      
      const mockKeyPoints = [
        'Object-oriented programming fundamentals',
        'Class inheritance and polymorphism',
        'Virtual functions and abstract classes',
        'Memory management with RAII',
        'Modern C++ features (auto, lambda, smart pointers)',
        'Best practices for code organization',
        'Performance optimization techniques'
      ];
      
      const mockTranscript = `Welcome to today's lecture on advanced C++ programming concepts. We'll start by reviewing object-oriented programming fundamentals and then dive into more complex topics like inheritance and polymorphism. 

First, let's discuss classes and objects. A class is a blueprint for creating objects, and objects are instances of classes. Here's a simple example... [transcript continues]

Remember that good C++ programming requires understanding memory management. We'll explore RAII (Resource Acquisition Is Initialization) principles...`;

      setSummary(mockSummary);
      setKeyPoints(mockKeyPoints);
      setTranscript(mockTranscript);
      setIsProcessing(false);
    }, 3000);
  };

  const downloadSummary = () => {
    const content = `Video Summary\n\n${summary}\n\nKey Points:\n${keyPoints.map(point => `• ${point}`).join('\n')}\n\nFull Transcript:\n${transcript}`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'video-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container">
      <div className="video-summary-header">
        <h1>AI Video Summary</h1>
        <p>Upload lecture videos to generate automatic summaries, key points, and transcripts</p>
      </div>

      <div className="grid grid-2">
        <div className="card upload-section">
          <h2 className="mb-3">
            <Video size={24} />
            Upload Video
          </h2>
          
          <div className="upload-options">
            <div className="upload-area">
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="video-upload" className="upload-label">
                <Upload size={32} />
                <span>Click to upload video file</span>
                <small>Supports MP4, AVI, MOV, WMV</small>
              </label>
              {videoFile && (
                <div className="selected-file">
                  <Video size={18} />
                  <span>{videoFile.name}</span>
                </div>
              )}
            </div>

            <div className="url-section">
              <h4>Or paste video URL:</h4>
              <form onSubmit={handleUrlSubmit}>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="form-control"
                />
                <button type="submit" className="btn btn-secondary mt-2">
                  Load from URL
                </button>
              </form>
            </div>
          </div>

          <button 
            onClick={generateSummary}
            disabled={isProcessing || (!videoFile && !videoUrl)}
            className="btn btn-success generate-btn"
          >
            <Sparkles size={18} />
            {isProcessing ? 'Processing...' : 'Generate AI Summary'}
          </button>
        </div>

        <div className="card processing-status">
          <h2 className="mb-3">Processing Status</h2>
          
          {isProcessing ? (
            <div className="processing-animation">
              <div className="loading-spinner"></div>
              <div className="processing-steps">
                <div className="step active">
                  <div className="step-icon">1</div>
                  <span>Uploading video...</span>
                </div>
                <div className="step active">
                  <div className="step-icon">2</div>
                  <span>Extracting audio...</span>
                </div>
                <div className="step active">
                  <div className="step-icon">3</div>
                  <span>Generating transcript...</span>
                </div>
                <div className="step processing">
                  <div className="step-icon">4</div>
                  <span>AI analysis in progress...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="upload-instructions">
              <FileText size={48} />
              <h3>Ready to Process</h3>
              <p>Upload a video file or paste a URL to begin AI analysis</p>
              <ul>
                <li>Automatic transcript generation</li>
                <li>Key points extraction</li>
                <li>Comprehensive summary</li>
                <li>Downloadable results</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {summary && (
        <div className="results-section">
          <div className="card">
            <div className="results-header">
              <h2>AI Generated Summary</h2>
              <button onClick={downloadSummary} className="btn btn-secondary">
                <Download size={16} />
                Download Full Summary
              </button>
            </div>
            
            <div className="summary-content">
              <div className="summary-text">
                <h3>Summary</h3>
                <p>{summary}</p>
              </div>
              
              <div className="key-points">
                <h3>Key Points</h3>
                <ul>
                  {keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="transcript-section">
              <h3>Full Transcript</h3>
              <div className="transcript-text">
                {transcript}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card previous-summaries">
        <h2 className="mb-3">Previous Summaries</h2>
        <div className="summaries-grid">
          {previousSummaries.map(item => (
            <div key={item.id} className="summary-card">
              <div className="summary-header">
                <h4>{item.title}</h4>
                <div className="summary-meta">
                  <span>
                    <Clock size={14} />
                    {item.duration}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
              <p className="summary-preview">{item.summary}</p>
              <div className="key-points-preview">
                <strong>Key Points:</strong>
                <ul>
                  {item.keyPoints.slice(0, 2).map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                  {item.keyPoints.length > 2 && <li>+{item.keyPoints.length - 2} more...</li>}
                </ul>
              </div>
              <button className="btn btn-secondary">View Full Summary</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSummary;