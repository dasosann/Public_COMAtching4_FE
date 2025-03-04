import React, { useState, useEffect } from "react";
import majorCategories from "../../data/majorCategories.jsx";
import MajorSelectorElement from "../MajorSelectorElement";
import * as styles from "../../css/components/MajorSelector.css.ts"; // Vanilla Extract 스타일 임포트

const MajorChange = ({ school, setSchool, department, setDepartment, major, setMajor, setIsVerified }) => {
  
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(300);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  useEffect(() => {
    let interval;
    if (showVerification && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerification, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleVerifyClick = () => {
    setShowVerification(true);
    setTimer(300);
  };

  const handleVerificationComplete = () => {
    setIsCodeVerified(true);
    setIsVerified(true);
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    setDepartment("");  // 학과 초기화
    setMajor("");       // 전공 초기화
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setMajor("");       // 전공 초기화
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  const getDepartments = () => {
    const schoolObj = majorCategories.find((option) => option.label === school);
    return schoolObj ? schoolObj.departments : [];
  };

  const getMajors = () => {
    const schoolObj = majorCategories.find((option) => option.label === school);
    if (!schoolObj || !schoolObj.departments) return [];

    const departmentObj = schoolObj.departments.find((dept) => dept.label === department);
    return departmentObj ? departmentObj.majors : [];
  };

  return (
    <div>
      <div className={styles.schoolRow}>
        <MajorSelectorElement
          placeholder="학교"
          fieldType={styles.school}
          selectname={styles.school}
          value={school}
          onChange={handleSchoolChange}
          options={majorCategories.map((school) => school.label)}
        />
      </div>

      <div className={styles.emailVerificationRow}>
        <label className={styles.emailLabel}>웹메일</label>
        <div className={styles.emailInputContainer}>
          <input 
            type="email" 
            className={styles.emailInput} 
            value={email} 
            placeholder="example@cuk.ac.kr"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button className={styles.verifyButton} onClick={handleVerifyClick}>
            {showVerification ? formatTime(timer) : "인증하기"}
          </button>
        </div>

        {showVerification && (
          <>
            <p className={styles.verificationMessage}>입력하신 이메일로 인증번호를 보냈어요.</p>
            <p className={styles.resendMessage}>
              메일이 도착하지 않았나요? <a href="#" className={styles.resendLink} onClick={handleVerifyClick}>인증번호 재전송</a>
            </p>
          </>
        )}
      </div>

      {showVerification && (
        <div className={styles.emailVerificationRow}>
          <label className={styles.emailLabel}>인증번호</label>
          <div className={styles.emailInputContainer}>
            <input 
              type="text" 
              className={styles.emailInput} 
              value={verificationCode} 
              placeholder="인증번호 4자리"
              onChange={(e) => setVerificationCode(e.target.value)} 
            />
            <button 
              className={styles.verifyButton} 
              onClick={handleVerificationComplete}
            >
              {isCodeVerified ? "인증 완료" : "확인"}
            </button>
          </div>
        </div>
      )}

      <div className={styles.departmentRow}>
        <MajorSelectorElement
          placeholder="학과"
          fieldType={styles.depart}
          selectname={styles.depart}
          value={department}
          onChange={handleDepartmentChange}
          options={getDepartments().map((dept) => dept.label)}
        />
        <MajorSelectorElement
          placeholder="전공"
          fieldType={styles.major}
          selectname={styles.major}
          value={major}
          onChange={handleMajorChange}
          options={getMajors()}
        />
      </div>
    </div>
  );
};

export default MajorChange;
