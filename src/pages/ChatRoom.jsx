import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessage from '../components/Chat/ChatMessage.jsx';
import Background from '../components/Background.jsx';
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import instance from "../axiosConfig";

import "../css/pages/ChatRoom.css";

function ChatRoom() {
  const { roomId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const chatBodyRef = useRef(null);
  const clientRef = useRef(null);

  // 📌 1. 지난 채팅 내역 불러오기
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await instance.get(`/auth/user/chat/room?roomId=${roomId}`);
        const data = res.data.data;

        const formattedMessages = data.map((msg, idx) => ({
          id: idx + 1,
          sender: msg.role === "PICKER" ? "me" : "other",  // 역할에 따라 분기
          message: msg.content,
          time: msg.timestamp.split(' ')[1].slice(0, 5),  // '13:34'
        }));

        setChatMessages(formattedMessages);
      } catch (err) {
        console.error("채팅 기록 불러오기 실패:", err);
      }
    };

    fetchChatHistory();
  }, [roomId]);

  // 📌 2. 실시간 WebSocket 연결
  useEffect(() => {
    const socket = new SockJS(`https://backend1.comatching.site/ws/chat?roomId=${roomId}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("✅ WebSocket 연결됨");

        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);

          const newMessage = {
            id: Date.now(), // 고유 ID
            sender: body.role === "PICKER" ? "me" : "other",
            message: body.content,
            time: body.timestamp.split(' ')[1].slice(0, 5),
          };

          setChatMessages(prev => [...prev, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류", frame);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [roomId]);

  // 📌 3. 메시지 전송 핸들러
  // 📌 3. 메시지 전송 핸들러
const handleSend = () => {
  if (!inputValue.trim() || !clientRef.current?.connected) return;

  const sendMessage = {
    chatRoomId: roomId,
    content: inputValue,
    chatRole: "PICKER"  // 본인 역할로 설정 필요
  };

  // 1️⃣ 서버에 전송
  clientRef.current.publish({
    destination: "/pub/chat/message",
    body: JSON.stringify(sendMessage)
  });

  // 2️⃣ 화면에도 즉시 추가
  const newMessage = {
    id: Date.now(),
    sender: "me",
    message: inputValue,
    time: new Date().toTimeString().slice(0, 5) // 'HH:mm'
  };
  setChatMessages(prev => [...prev, newMessage]);

  // 3️⃣ 입력창 초기화
  setInputValue('');
};


  // 📌 4. 자동 스크롤
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div>
      <Background />
      <ChatHeader nickname="겨울이오길" age="22살" major="정보보안공학부" />
      
      <div className="chat-body" ref={chatBodyRef}>
        {chatMessages.map((chat) => (
          <ChatMessage
            key={chat.id}
            sender={chat.sender}
            message={chat.message}
            time={chat.time}
          />
        ))}
      </div>
      <div style={{ height: '30px' }}></div>

      <div className="chat-input-container">
        <div
          className={`chat-input-box ${(focused || inputValue.length > 0) ? 'focused' : ''}`}
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
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>

          <div
            className={`send-button ${(focused || inputValue.length > 0) ? 'active' : ''}`}
            onClick={handleSend}
          >
            <img
              src={(focused || inputValue.length > 0)
                ? "/assets/Chat/send-active.svg"
                : "/assets/Chat/send-icon.svg"}
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
