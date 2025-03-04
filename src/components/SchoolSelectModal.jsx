import React, { useState} from "react";
import { useRecoilState } from "recoil";
import { profileEditState } from "../Atoms";
import "../css/components/SchoolSelectModal.css";
import MajorChange from "./Profile-Edit/Major-Change";

const SchoolSelectModal = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useRecoilState(profileEditState);

  // 개별 필드 상태 관리 (학교, 학과, 전공)
  const [school, setSchool] = useState(profile.school || "");
  const [department, setDepartment] = useState(profile.department || "");
  const [major, setMajor] = useState(profile.major || "");
  const [isVerified, setIsVerified] = useState(false);
  // ✅ 모달이 열릴 때마다 Recoil 상태를 가져와서 입력 필드 초기화
  
  const handleSave = () => {
    if (isVerified && school && department && major) {
      setProfile((prev) => ({
        ...prev,
        school,
        department: major, // major를 department로 저장
      }));
      onClose();
    }
  };
  console.log(profile)

  console.log(isVerified, school, department, major);

  const isFormComplete = isVerified && school && department && major;

  if (!isOpen) return null;

  return (
    <div className="school-modal-overlay">
      <div className="school-modal-container">
        <h2 className="school-modal-title">학교 선택</h2>
        <p className="school-modal-text">
          학교와 학과를 선택해주세요.<br />
          학교를 변경하려면 학교인증이 필요해요.
        </p>

        <button className="school-modal-close-button" onClick={onClose}>닫기</button>
        <div className="major-select">
          <MajorChange 
            school={school} 
            setSchool={setSchool} 
            department={department} 
            setDepartment={setDepartment} 
            major={major} 
            setMajor={setMajor} 
            setIsVerified={setIsVerified}
          />
        </div>
        <button 
          className={`edit-button ${isFormComplete ? "active" : "inactive"}`} 
          onClick={handleSave} 
          disabled={!isFormComplete}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default SchoolSelectModal;
