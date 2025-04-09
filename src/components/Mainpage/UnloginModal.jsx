import React from "react";
import "../../css/components/UnloginModal.css";

function UnloginModal({onClose,handleKakaoLogin,handleGoogleLogin}) {
    return (
        <div className="unlogin-modal-overlay">
            <div className="unlogin-modal-container">
                <div className="unlogin-modal-title">로그인/회원가입</div>
                <div className="unlogin-modal-subtitle">
                    로그인과 회원가입 수단은 동일합니다.<br/>
                    원하는 계정으로 시작하세요.
                </div>
                <div className="unlogin-modal-buttons">
                    <button className="unlogin-modal-btn kakao" onClick={handleKakaoLogin}>
                        <img src="/assets/Mainpage/kakao.svg" alt="카카오"/>
                        <span>카카오로 시작하기</span>
                    </button>
                    <button className="unlogin-modal-btn google" onClick={handleGoogleLogin}>
                        <img src="/assets/Mainpage/google.svg" alt="구글"/>
                        <span>구글로 시작하기</span>
                    </button>
                    <button className="unlogin-modal-btn apple">
                        <img src="/assets/Mainpage/apple.svg" alt="애플"/>
                        <span>Apple로 시작하기</span>
                    </button>
                </div>
                <div className="unlogin-modal-email">
                    혹은
                    <div className="mts"></div>
                    
                    <span className="unlogin-modal-email-link">이메일 로그인</span>
                </div>
                <button className="unlogin-modal-close" onClick={onClose}>
                    <img src="/assets/Mainpage/x.svg" alt="" />
                </button>
            </div>
        </div>
    );
}

export default UnloginModal;
