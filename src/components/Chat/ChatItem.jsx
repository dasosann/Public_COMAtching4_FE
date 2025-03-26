import React from 'react';
import "../../css/components/ChatItem.css"
function ChatItem({ name, age, major, message, time, hasNotification }) {
  return (
    <div className="chat-item">
      <div className="chat-info">
        <div className="chat-top">
          <div className="chat-name">{name}</div>
          <div className="chat-age">{age}</div>
          <div className="chat-major">{major}</div>
        </div>
        <div className="chat-bottom">
          {message} · {time}
        </div>
      </div>
      {hasNotification && <div className="chat-notification"></div>}
    </div>
  );
}

export default ChatItem;
