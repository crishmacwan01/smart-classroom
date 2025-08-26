import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  Settings,
  Monitor,
  Hand,
  Volume2,
  VolumeX
} from 'lucide-react';

const LiveClass = ({ user }) => {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [classTitle, setClassTitle] = useState('');
  const [showStartClassModal, setShowStartClassModal] = useState(false);
  
  const videoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);

  // Mock participants data
  const mockParticipants = [
    { id: 1, name: 'John Doe', isVideoOn: true, isAudioOn: true, handRaised: false },
    { id: 2, name: 'Jane Smith', isVideoOn: false, isAudioOn: true, handRaised: true },
    { id: 3, name: 'Mike Johnson', isVideoOn: true, isAudioOn: false, handRaised: false },
    { id: 4, name: 'Sarah Wilson', isVideoOn: true, isAudioOn: true, handRaised: false }
  ];

  const mockMessages = [
    { id: 1, sender: 'John Doe', message: 'Good morning everyone!', timestamp: '09:00' },
    { id: 2, sender: 'Jane Smith', message: 'Can you please repeat the last point?', timestamp: '09:05' },
    { id: 3, sender: 'Professor', message: 'Sure, let me explain again...', timestamp: '09:06' }
  ];

  useEffect(() => {
    if (isInCall) {
      setParticipants(mockParticipants);
      setChatMessages(mockMessages);
      startLocalVideo();
    }
    
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isInCall]);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const startClass = () => {
    if (!classTitle.trim()) {
      alert('Please enter a class title');
      return;
    }
    setIsInCall(true);
    setShowStartClassModal(false);
  };

  const joinClass = () => {
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn;
      }
    }
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real implementation, this would start/stop screen sharing
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: user.name,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
  };

  if (!isInCall) {
    return (
      <div className="container">
        <div className="live-class-header">
          <h1>Live Classes</h1>
          <p>Join or conduct live video classes with interactive features</p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h2 className="mb-3">
              <Video size={24} />
              {user.role === 'professor' ? 'Conduct Class' : 'Join Class'}
            </h2>
            
            {user.role === 'professor' ? (
              <div className="class-controls">
                <p>Start a new live class session for your students.</p>
                <button 
                  onClick={() => setShowStartClassModal(true)}
                  className="btn btn-success"
                >
                  <Video size={18} />
                  Start New Class
                </button>
              </div>
            ) : (
              <div className="join-class">
                <p>Join the ongoing class session.</p>
                <button 
                  onClick={joinClass}
                  className="btn btn-primary"
                >
                  <Video size={18} />
                  Join Class
                </button>
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="mb-3">
              <Users size={24} />
              Class Schedule
            </h2>
            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>Data Structures - CS 201</h4>
                  <p>Today, 10:00 AM - 11:30 AM</p>
                </div>
                <span className="badge badge-pending">Upcoming</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>Algorithms - CS 301</h4>
                  <p>Today, 2:00 PM - 3:30 PM</p>
                </div>
                <span className="badge badge-pending">Upcoming</span>
              </div>
              <div className="schedule-item">
                <div className="schedule-info">
                  <h4>Database Systems - CS 401</h4>
                  <p>Tomorrow, 9:00 AM - 10:30 AM</p>
                </div>
                <span className="badge badge-pending">Scheduled</span>
              </div>
            </div>
          </div>
        </div>

        {showStartClassModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Start New Class</h3>
              <form onSubmit={(e) => { e.preventDefault(); startClass(); }}>
                <div className="form-group">
                  <label>Class Title:</label>
                  <input
                    type="text"
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                    className="form-control"
                    placeholder="e.g., Data Structures - Lecture 5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course:</label>
                  <select className="form-control">
                    <option value="CS 201">CS 201 - Data Structures</option>
                    <option value="CS 301">CS 301 - Algorithms</option>
                    <option value="CS 401">CS 401 - Database Systems</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowStartClassModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Start Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="live-class-container">
      <div className="class-header">
        <div className="class-info">
          <h2>{classTitle || 'Live Class Session'}</h2>
          <span className="live-indicator">
            <div className="live-dot"></div>
            LIVE
          </span>
        </div>
        <div className="class-stats">
          <span className="participant-count">
            <Users size={16} />
            {participants.length + 1} participants
          </span>
        </div>
      </div>

      <div className="video-grid-container">
        <div className={`video-grid ${showChat ? 'with-chat' : ''}`}>
          {/* Main video (teacher or presenter) */}
          <div className="main-video">
            <div className="video-container">
              <video
                ref={videoRef}
                autoPlay
                muted
                className={`video-element ${!isVideoOn ? 'video-off' : ''}`}
              />
              {!isVideoOn && (
                <div className="video-placeholder">
                  <VideoOff size={48} />
                  <span>{user.name}</span>
                </div>
              )}
              <div className="video-controls-overlay">
                <span className="participant-name">{user.name} (You)</span>
                <div className="audio-indicator">
                  {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
                </div>
              </div>
            </div>
          </div>

          {/* Participant videos */}
          <div className="participant-videos">
            {participants.slice(0, 6).map(participant => (
              <div key={participant.id} className="participant-video">
                <div className="video-container">
                  {participant.isVideoOn ? (
                    <div className="mock-video">
                      <div className="video-placeholder">
                        <Users size={24} />
                      </div>
                    </div>
                  ) : (
                    <div className="video-placeholder">
                      <VideoOff size={24} />
                    </div>
                  )}
                  <div className="video-controls-overlay">
                    <span className="participant-name">{participant.name}</span>
                    <div className="participant-indicators">
                      {participant.handRaised && <Hand size={14} className="hand-raised" />}
                      {participant.isAudioOn ? <Mic size={14} /> : <MicOff size={14} />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="chat-panel">
            <div className="chat-header">
              <h3>Chat</h3>
              <button 
                onClick={() => setShowChat(false)}
                className="close-chat-btn"
              >
                ×
              </button>
            </div>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className="chat-message">
                  <div className="message-header">
                    <span className="sender">{message.sender}</span>
                    <span className="timestamp">{message.timestamp}</span>
                  </div>
                  <div className="message-content">{message.message}</div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="chat-input-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
              />
              <button type="submit" className="send-btn">Send</button>
            </form>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="control-bar">
        <div className="control-group">
          <button 
            onClick={toggleAudio}
            className={`control-btn ${!isAudioOn ? 'disabled' : ''}`}
          >
            {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          
          <button 
            onClick={toggleVideo}
            className={`control-btn ${!isVideoOn ? 'disabled' : ''}`}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          {user.role === 'professor' && (
            <button 
              onClick={toggleScreenShare}
              className={`control-btn ${isScreenSharing ? 'active' : ''}`}
            >
              <Monitor size={20} />
            </button>
          )}

          {user.role === 'student' && (
            <button 
              onClick={toggleHandRaise}
              className={`control-btn ${handRaised ? 'active' : ''}`}
            >
              <Hand size={20} />
            </button>
          )}
        </div>

        <div className="control-group">
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`control-btn ${showChat ? 'active' : ''}`}
          >
            <MessageSquare size={20} />
          </button>
          
          <button className="control-btn">
            <Settings size={20} />
          </button>
        </div>

        <div className="control-group">
          <button 
            onClick={endCall}
            className="control-btn end-call-btn"
          >
            <PhoneOff size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;