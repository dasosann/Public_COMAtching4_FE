import React from 'react';
import "../../css/components/ChatItem.css"
function ChatItem({ name, age, major }) {
  return (
    <div className="chat-item">
      <div className="chat-info">
        <div className="chat-top">
          <div className="chat-name">{name}</div>
          <div className="chat-age">{age}살</div>
          <div className="chat-major">{major}</div>
        </div>
        
      </div>
    </div>
  );
}

export default ChatItem;
