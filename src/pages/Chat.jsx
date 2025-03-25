import React from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/ChatList.css';
import Background from '../components/Background';
import NavBar from '../components/Navbar';
import ChatItem from '../components/Chat/ChatItem';

const chatData = [
  { id: 1, name: "겨울이오길", age: "22살", major: "정보보안공학부", message: "이번엔 맘 좀 열어보아요~", time: "3일 전", hasNotification: true },
  { id: 2, name: "나야들키쿤", age: "20살", major: "식품영양학과", message: "근데 되돌릴 수 있을까", time: "1일 전", hasNotification: false },
  { id: 3, name: "고도둑기다리며", age: "23살", major: "바이오헬스소프트웨어학과", message: "고도둑 기다리는 그거 해요", time: "3시간 전", hasNotification: true },
  { id: 4, name: "정원영", age: "20살", major: "화학과", message: "단체 참여하려구요", time: "2일 전", hasNotification: false },
  { id: 5, name: "카리나", age: "23살", major: "미디어커뮤니케이션", message: "내내 고마워요", time: "3일 전", hasNotification: true },
];

function Chat() {
  return (
    <div className="chat-container">
      <Background />
      <NavBar />
      <h2 className="chat-title">채팅하기</h2>
      <p className="chat-subtitle">
        매칭된 분들과 채팅을 해보세요!<br />가볍게 인사는 어떠신가요?
      </p>

      <div className="chat-list">
        {chatData.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.id}`} style={{ textDecoration: 'none' }}>
            <ChatItem
              name={chat.name}
              age={chat.age}
              major={chat.major}
              message={chat.message}
              time={chat.time}
              hasNotification={chat.hasNotification}
            />
          </Link>
        ))}
      </div>
      <div  style={{ height: '100px' }}></div>
    </div>
  );
}

export default Chat;
