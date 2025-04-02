import React, { useState, useEffect } from "react";
import majorCategories from "../../data/majorCategories.jsx";
import MajorSelectorElement from "../MajorSelectorElement";
import * as styles from "../../css/components/MajorSelector.css.ts"; // Vanilla Extract 스타일 임포트
import instance from "../../axiosConfig.jsx";
const MajorChange = ({ school, setSchool, department, setDepartment, major, setMajor, setIsVerified }) => {
  
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(300);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [token, setToken] = useState(null);

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
    if (!isValidEmail(email)) {
      alert("올바른 학교 이메일 형식을 입력해주세요. (예: example@catholic.ac.kr)");
      return;
    }
    try {
      const res = instance.post(`/auth/user/api/auth/school?schoolEmail=${email}`);
      const token = res.data?.data?.token;
      if (token) {
        setToken(token);
        setShowVerification(true);
        setTimer(300);
      } else {
        alert("토큰이 유효하지 않습니다.");
      }
    } catch (err) {
      console.error("인증 요청 실패:", err);
      alert("인증 메일 전송에 실패했습니다.");
    }
  };

  // 인증번호 확인 요청
const handleVerificationComplete = async () => {
  if (!token || verificationCode.trim() === "") {
    alert("인증번호를 입력해주세요.");
    return;
  }

  try {
    const res = await instance.post("/auth/user/api/auth/school/code", {
      token,
      code: verificationCode,
    });

    if (res.data?.code === "GEN-000") {
      setIsCodeVerified(true);
      setIsVerified(true);
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  } catch (err) {
    console.error("인증 확인 실패:", err);
    alert("서버 오류로 인증에 실패했습니다.");
  }
};

  const isValidEmail = (email) => {
    // 학교 웹메일 도메인을 포함한 정규식 예시 (ex. cuk.ac.kr)
    const regex = /^[a-zA-Z0-9._%+-]+@catholic\.ac\.kr$/;
    return regex.test(email);
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
            placeholder="example@catholic.ac.kr"
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
              disabled={isCodeVerified || timer <= 0} // 👈 추가
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
