import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import { initSocket } from '../socket';
import ACTIONS from '../actions/Actions';
import './ChatPage.css'

const ChatPage = ({ username, onMessageChange, socketRef, onChange }) => {
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [room, setRoom] = useState("");
  const messagesRef = useRef([]);
  const [roomName, setRoomName] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const username = location.state?.username;
      const currenttime = new Date().toLocaleTimeString();
      if (newMessage) {
        socket.emit("message", { newMessage, room, username, currenttime });
        setMessage("")
        e.target.value = "";
      } else {
        alert("Enter message to send")
      }
    } catch (e) {
      console.log(e)
    }
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    const initializeSocket = async () => {
      const socketInstance = await initSocket();
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('Connected to server');
      });

      socketInstance.on('receive-message', ({ newMessage, username, currenttime }) => {
        setMessages((prevMessages) => [...prevMessages, { username: username, message: newMessage, currenttime: currenttime }]);
        onMessageChange([messages, { username: username, message: newMessage, currenttime: currenttime }]);
      });
    };

    initializeSocket();
    return () => {

    };
  }, []);

  return (
    <div className={`chatbox-container ${isChatOpen ? 'open' : 'closed'}`} style={{ position: 'fixed', bottom: '5px', right: '250px' }}>
      {isChatOpen && (
        <>
          <div className="chatbox-header">
            <h5>Chat messages</h5>
            <button className="close-button" onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.username !== location.state?.username ? 'received' : 'sent'}`}>
                <div className="message-info">
                  <p className="username">{message.username !== location.state?.username ? message.username : "You"}</p>
                  <p className="timestamp">{message.currenttime}</p>
                </div>
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chatbox-input">
          <input 
            type="text" 
            placeholder={"Type your message"} 
            value={newMessage} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }} 
          />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </>
      )}
      {!isChatOpen && (
        <button className="show-chat" onClick={toggleChat}>
          <div className="chatbox-header" >
            <h5>Chat messages</h5>
            <div className="chatbox-icons" style={{ width: "100px" }}>
            </div>
          </div>
        </button>
      )}
    </div>
  )
};

export default ChatPage;
