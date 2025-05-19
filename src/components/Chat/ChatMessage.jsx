import React from 'react';
import '../css/components/ChatMessage.css';

function ChatMessage({ sender, message, time }) {
  return (
    <div className={`chatroom-message ${sender === 'me' ? 'chatroom-other-message' : 'chatroom-my-message'}`}>
      <div className="chatroom-message-wrapper">
        <div className="chatroom-message-bubble">
          <div className="chatroom-message-text">{message}</div>
        </div>
        <div className="chatroom-message-time">{time}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
