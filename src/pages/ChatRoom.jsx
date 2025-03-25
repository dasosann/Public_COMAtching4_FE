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
    { id: 5, sender: "me", message: "보통 주말에 뭐 하세요?", time: "10:04" },
    { id: 6, sender: "other", message: "카페 가거나 영화 봐요!", time: "10:05" },
    { id: 7, sender: "me", message: "오 저도 영화 좋아해요. 최근에 뭐 보셨어요?", time: "10:06" },
    { id: 8, sender: "other", message: "‘듄 2’ 봤어요! 너무 재밌었어요", time: "10:07" },
    { id: 9, sender: "me", message: "오 저도 그거 궁금했는데 평이 좋더라고요", time: "10:08" },
    { id: 10, sender: "other", message: "액션이랑 음악이 진짜 대박이에요", time: "10:09" },
    { id: 11, sender: "me", message: "좋아요! 이번 주말에 꼭 볼게요", time: "10:10" },
    { id: 12, sender: "me", message: "혹시 좋아하는 음식 있으세요?", time: "10:11" },
    { id: 13, sender: "other", message: "요즘 초밥에 꽂혔어요 🍣", time: "10:12" },
    { id: 14, sender: "me", message: "헉 저도! 연어초밥 최고죠", time: "10:13" },
    { id: 15, sender: "other", message: "ㅋㅋㅋ 완전 동감입니다!", time: "10:14" },
    { id: 16, sender: "me", message: "혹시 취미는 뭐예요?", time: "10:15" },
    { id: 17, sender: "other", message: "그림 그리는 거요. 힐링돼요", time: "10:16" },
    { id: 18, sender: "me", message: "멋지다! 언젠가 작품도 보여주세요", time: "10:17" },
    { id: 19, sender: "other", message: "기회 되면 꼭 보여드릴게요 😊", time: "10:18" },
    { id: 20, sender: "me", message: "좋은 하루 보내세요~", time: "10:19" },
    { id: 21, sender: "other", message: "네! 오늘도 파이팅이에요 💪", time: "10:20" }
];
  

function ChatRoom() {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
            <div  style={{ height: '100px' }}></div>

            <div className="chat-input-container">
                <div
                    className={`chat-input-box ${(focused || inputValue.length > 0) ? 'focused' : ''}`}
                    onClick={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                >
                    <textarea
                    placeholder="메세지를 입력해주세요.."
                    className="chat-input"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onInput={(e) => {
                        e.target.style.height = 'auto'; // 초기화
                        e.target.style.height = `${e.target.scrollHeight}px`; // 내용 높이에 맞게 조절
                    }}
                    ></textarea>

                    <div className={`send-button ${(focused || inputValue.length > 0) ? 'active' : ''}`}>
                        <img 
                            src={(focused || inputValue.length > 0) ? "/assets/Chat/send-active.svg" : "/assets/Chat/send-icon.svg"} 
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
