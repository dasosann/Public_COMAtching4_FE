import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/components/ChatHeader.css';
import ProfileModal from './ProfileModal';
function ChatHeader({ nickname, age, major }) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // 모달에 넘길 프로필 데이터 (원하면 props로 받아서 바꿀 수도 있어요)
  const profileData = {
    nickname: nickname,
    age: age,
    department: major,
    mbti: 'ENTP',
    interests: '인디음악',
    favoriteSong: '잔나비 - 사랑하긴 했었나요 스쳐지나가',
    introduction: '사진을 잘 찍어요 😉',
    contactId: '@winterizcoming_',
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
