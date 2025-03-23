import React, { useState } from 'react';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessage from '../components/Chat/ChatMessage.jsx';
import Background from '../components/Background.jsx';
import "../css/pages/ChatRoom.css";
import NavBar from '../components/Navbar.jsx';

const chatMessages = [
    { id: 1, sender: "me", message: "안녕하세요!", time: "10:00" },
    { id: 2, sender: "other", message: "반갑습니다 :)", time: "10:01" },
    { id: 3, sender: "me", message: "오늘 날씨 좋네요", time: "10:02" },
    { id: 4, sender: "other", message: "네! 산책 가고 싶어요", time: "10:03" },
];

function ChatRoom() {
    const [focused, setFocused] = useState(false);

    return (
        <div>
            <Background />
            <ChatHeader nickname="겨울이오길" age="22살" major="정보보안공학부" />
            
            <div className="chat-body">
                {chatMessages.map((chat) => (
                    <ChatMessage
                        key={chat.id}
                        sender={chat.sender}
                        message={chat.message}
                        time={chat.time} />
                ))}
            </div>

            <div className="chat-input-container">
                <div
                    className={`chat-input-box ${focused ? 'focused' : ''}`}
                    onClick={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                >
                    <textarea
                    placeholder="메세지를 입력해주세요.."
                    className="chat-input"
                    rows={1}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onInput={(e) => {
                        e.target.style.height = 'auto'; // 초기화
                        e.target.style.height = `${e.target.scrollHeight}px`; // 내용 높이에 맞게 조절
                    }}
                    ></textarea>


                    <div className={`send-button ${focused ? 'active' : ''}`}>
                        <img 
                            src={focused ? "/assets/Chat/send-active.svg" : "/assets/Chat/send-icon.svg"} 
                            alt="send" 
                            className="send-icon" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
