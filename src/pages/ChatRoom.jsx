import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessage from '../components/Chat/ChatMessage.jsx';
import Background from '../components/Background.jsx';
import { useParams } from "react-router-dom";

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
    const socket = new WebSocket(`wss://backend.comatching.site/ws/chat?roomId=${roomId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket 연결됨');
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const newMessage = {
        id: Date.now(),
        sender: msg.role === "PICKER" ? "me" : "other",
        message: msg.content,
        time: msg.timestamp?.split(' ')[1]?.slice(0, 5) || new Date().toTimeString().slice(0, 5)
      };
      setChatMessages((prev) => [...prev, newMessage]);
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket 오류', error);
    };

    socket.onclose = () => {
      console.log('❎ WebSocket 연결 종료됨');
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  // 📌 3. 메시지 전송 핸들러
  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const sendMessage = {
        chatRoomId: roomId,
        content: inputValue,
        chatRole: "PICKER"
      };

      socketRef.current.send(JSON.stringify(sendMessage));

      const newMessage = {
        id: Date.now(),
        sender: 'me',
        message: inputValue,
        time: new Date().toTimeString().slice(0, 5)
      };

      setChatMessages((prev) => [...prev, newMessage]);
      setInputValue('');
    }
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
