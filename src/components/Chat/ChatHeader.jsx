import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../css/components/ChatHeader.css';

function ChatHeader({nickname, age, major}) {
    const navigate = useNavigate(); // 네비게이터 훅 사용

    const handleBackClick = () => {
        navigate('/chat'); // 클릭 시 /chat으로 이동
    };
    return (
        <div className="chat-header">
            <button className="back-button" onClick={handleBackClick}>
                <img src="/assets/Chat/pre.svg" alt="back"/>
            </button>

            <div className="user-info">
                <div className="user-detail">
                    <div className="user-nickname">{nickname}</div>
                    <div className="user-detail">{age}, {major}</div>
                </div>
                <button className="profile-button">프로필</button>
            </div>

        </div>
    );
}

export default ChatHeader;
