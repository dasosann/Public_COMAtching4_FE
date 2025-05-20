import React from 'react';
import "../../css/components/ChatItem.css"
function ChatItem({ name, age, major }) {
  return (
    <div className="chat-item">
      <div className="chat-info">
        <div className="chat-top">
          <div className="chat-name">{name}</div>
          <div className="chat-age">{age}</div>
          <div className="chat-major">{major}</div>
        </div>
        <div className="chat-bottom">
            채팅을 눌러서 시작하세요!
        </div>
      </div>
    </div>
  );
}

export default ChatItem;