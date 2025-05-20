import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/ChatList.css';
import Background from '../components/Background';
import NavBar from '../components/Navbar';
import ChatItem from '../components/Chat/ChatItem';
import instance from '../axiosConfig';
function Chat() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await instance.get('/auth/user/chat');
        
        const chatData = response.data.data;

        // 실제 사용자 정보가 없는 경우엔 name만 표시
        const parsedChatList = chatData.map(chat => {
          const isPicker = chat.myRole === "PICKER";

          return {
            roomId: chat.roomId,
            name: isPicker ? chat.pickedName : chat.pickerName,
            age: isPicker ? chat.pickedAge ?? 20 : chat.pickerAge ?? 20,
            major: isPicker ? chat.pickedMajor ?? "전공없음" : chat.pickerMajor ?? "전공없음",
            myRole: chat.myRole,
          };
        });


        setChatList(parsedChatList);
      } catch (error) {
        console.error('채팅 목록 불러오기 실패:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="chat-container">
      <Background />
      <NavBar />
      <h2 className="chat-title">채팅하기</h2>
      <p className="chat-subtitle">
        매칭된 분들과 채팅을 해보세요!<br />가볍게 인사는 어떠신가요?
      </p>

      <div className="chat-list">
        {chatList.map((chat) => (
          <Link
            key={chat.roomId}
            to={`/chat/${chat.roomId}`}
            state={{
              myRole: chat.myRole,
              name: chat.name,
              age: chat.age,
              major: chat.major,
            }}
            style={{ textDecoration: 'none' }}
          >

            <ChatItem
              name={chat.name}
              age={chat.age}
              major={chat.major}
            />
          </Link>
        ))}
      </div>
      <div style={{ height: '100px' }}></div>
    </div>
  );
}

export default Chat;