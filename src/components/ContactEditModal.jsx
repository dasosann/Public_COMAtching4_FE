import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileEditState } from "../Atoms";
import "../css/components/ContactEditModal.css"; // 스타일 파일 추가
import ContactMethod from "./ContactMethod"; // ✅ ContactMethod 컴포넌트 추가

const ContactEditModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useRecoilState(profileEditState);
  const [tempUser, setTempUser] = useState(user); // ✅ 입력값을 임시 저장하는 상태
  const [isContactVerified, setIsContactVerified] = useState(false); // 인증 여부 상태

  // 모달이 열릴 때 기존 연락처 정보 불러오기 (초기값 동기화)
  useEffect(() => {
    setTempUser(user);
  }, [isOpen, user]);

  // 연락처 입력 변경 핸들러 (임시 상태 업데이트)
  const handleChange = (e) => {
    setTempUser((prev) => ({
        ...prev,
        contact_id: e.target.value,
      }));
  };

  // 수정 버튼 클릭 시 Recoil 상태 업데이트 (최종 반영)
  const handleSave = () => {
    if (isContactVerified) {
      setUser(tempUser); // ✅ 임시 상태를 실제 상태로 반영
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal-container">
        <h2 className="contact-modal-title">연락처 수정</h2>
        <p className="contact-modal-text">새로운 연락처를 입력해주세요.</p>

        <button className="contact-modal-close-button" onClick={onClose}>
          닫기
        </button>

        {/* ✅ ContactMethod 컴포넌트 사용 (임시 상태 tempUser를 전달) */}
        <ContactMethod
          user={tempUser} // ✅ 입력 중에는 tempUser 사용
          handleChange={handleChange}
          setIsContactVerified={setIsContactVerified}
          setUser={setTempUser} // ✅ 임시 상태 업데이트
        />
        
        <ul className="contact-warning">
          <li>인스타그램은 반드시 처음에 @를 붙여야 합니다.</li>
          <li>중복확인을 진행해야 연락처를 수정할 수 있어요. 개인정보에 유의해주세요.</li>
          <li>잘못된 정보 입력 시 제재를 받을 수 있으며, 고의적인 사칭일 경우엔 형사처벌 받을 수 있습니다.</li>
        </ul>

        <button 
          className={`edit-button ${isContactVerified ? "active" : "inactive"}`} 
          onClick={handleSave} 
          disabled={!isContactVerified}
        >
          확인
        </button>

        
      </div>
    </div>
  );
};

export default ContactEditModal;
