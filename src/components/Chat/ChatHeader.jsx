import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/components/ChatHeader.css';
import ProfileModal from './ProfileModal';
function ChatHeader({ nickname, age, major }) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // 모달에 넘길 프로필 데이터 (원하면 props로 받아서 바꿀 수도 있어요)
  const profileData = {
    nickname: "JaneDoe",
    major: "컴퓨터공학과",
    mbti: "INTJ",
    age: 22,
    admissionYear: 23,
    contact_id: "@janedoe",
    song: "IU - Love Poem",
    comment: "안녕하세요!!",
    hobby: ["여행"],
    contactFrequency: "보통",
  };

  const handleBackClick = () => {
    navigate('/chat');
  };

  return (
    <>
      <div className="chat-header">
        <button className="back-button" onClick={handleBackClick}>
          <img src="/assets/Chat/pre.svg" alt="back" />
        </button>

        <div className="user-info">
          <div className="user-detail">
            <div className="user-nickname">{nickname}</div>
            <div className="user-detail">{age}, {major}</div>
          </div>
          <button className="profile-button" onClick={() => setShowProfile(true)}>프로필</button>
        </div>
      </div>

      {showProfile && (
        <ProfileModal
          profileData={profileData}
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
}

export default ChatHeader;
