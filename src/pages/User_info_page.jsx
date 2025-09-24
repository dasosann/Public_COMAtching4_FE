import React, { useState, useEffect } from "react";
import instance from "../axiosConfig"; // axiosConfig 인스턴스 불러오기
import { useRecoilState } from "recoil";
import { userState, selectedMBTIState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import MajorSelector from "../components/MajorSelector";
import "../css/pages/User_info.css";
import AgeInputInput from "../components/AgeInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import AdmissionYearInput from "../components/AdmissionYearInput";
import Background from "../components/Background";
import Modal from "react-modal"; // Import react-modal
import TermsAgreementModal from "../components/TermsAgreementModal";
import ProgressNav from "../components/ProgressNav";
Modal.setAppElement("#root");

function Userinfo() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState); // 유저 상태 관리
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [checkMethod, setCheckMethod] = useState({
    school: null, // 초기값을 null로 설정
    department: null,
    major: null,
    contactVerified: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactVerified, setIsContactVerified] = useState(false);
  const [isFiveChars, setIsFiveChars] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  // 단계별 진행 상태 추가
  const [currentStep, setCurrentStep] = useState(1); // 1: 기본정보, 2: 연락빈도, 3: 성별, 4: 연락방법, 5: 노래, 6: 장점, 7: 닉네임
  const [registerCheck, setRegisterCheck] = useState({
    terms1: false,
    terms2: false,
  });

  useEffect(() => {
    console.log("📝 user 상태 변경됨:", user);
  }, [user]);

  // 헬퍼 함수들
  const isMajorSelected = () =>
    checkMethod.school && checkMethod.department && checkMethod.major;

  const isBirthDateValid = () =>
    user.year &&
    user.month &&
    user.day &&
    user.year !== "" &&
    user.month !== "" &&
    user.day !== "";

  const isContactFrequencySelected = () => user.contactFrequency;

  // 모든 필드가 채워졌는지 확인하는 함수
  const checkAllFieldsFilled = () => {
    const requiredFields = [
      "major",
      "year",
      "month",
      "day",
      "gender",
      "contactFrequency",
      "username",
      "song",
      "comment",
    ];
    const isFilled = requiredFields.every((field) => {
      const value = user[field];
      return value && (Array.isArray(value) ? value.length > 0 : value !== "");
    });
    const isCommentValid = user.comment && user.comment.length >= 3;
    setIsFiveChars(isFilled && isCommentValid);
  };

  // user가 바뀔 때마다 확인
  useEffect(() => {
    checkAllFieldsFilled();
  }, [user, checkMethod, checkAllFieldsFilled]);

  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [category]: value,
    }));

    setUser((prevUser) => {
      const updatedMBTI = {
        EI: category === "EI" ? value : selectedMBTI.EI,
        SN: category === "SN" ? value : selectedMBTI.SN,
        TF: category === "TF" ? value : selectedMBTI.TF,
        PJ: category === "PJ" ? value : selectedMBTI.PJ,
      };

      // 모든 MBTI 부분을 합쳐 문자열 생성
      const mbtiString = `${updatedMBTI.EI || ""}${updatedMBTI.SN || ""}${
        updatedMBTI.TF || ""
      }${updatedMBTI.PJ || ""}`;

      return {
        ...prevUser,
        mbti: mbtiString,
        isLoggedIn: true,
      };
    });
  };

  // 다음 단계로 이동하는 함수들
  const handleNextToContactFrequency = () => {
    if (isMajorSelected() && isBirthDateValid()) {
      setCurrentStep(2);
    } else {
      alert('전공과 생년월일을 모두 입력해주세요.');
    }
  };

  const handleNextToGender = () => {
    if (user.contactFrequency) {
      setCurrentStep(3);
    } else {
      alert('연락빈도를 선택해주세요.');
    }
  };

  const handleNextToContact = () => {
    if (user.gender) {
      setCurrentStep(4);
    } else {
      alert('성별을 선택해주세요.');
    }
  };

  const handleNextToSong = () => {
    if (isContactVerified) {
      setCurrentStep(5);
    } else {
      alert('연락방법을 인증해주세요.');
    }
  };

  const handleNextToComment = () => {
    if (user.song) {
      setCurrentStep(6);
    } else {
      alert('좋아하는 노래를 입력해주세요.');
    }
  };

  const handleNextToUsername = () => {
    if (user.comment && user.comment.length >= 3) {
      setCurrentStep(7);
    } else {
      alert('장점을 3글자 이상 입력해주세요.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "song":
        if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,20}$/.test(value)) {
          errorMessage =
            "노래에는 특수 기호를 사용할 수 없고 20자리 이내로 작성해주세요";
        }
        break;
      case "comment":
        if (value.length <= 10) {
          setUser((prevUser) => ({
            ...prevUser,
            comment: value,
          }));
        }
        break;
      case "username":
        if (value.length > 10) {
          errorMessage = "닉네임은 최대 10자까지 가능합니다.";
        }
        break;
      case "gender":
        if (value === "MALE" || value === "FEMALE") {
          setUser((prevUser) => ({
            ...prevUser,
            gender: value,
          }));
        } else {
          errorMessage = "성별은 MALE 또는 FEMALE로 선택해야 합니다.";
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const fieldLabels = {
    major: "전공",
    mbti: "MBTI",
    gender: "성별",
    contactFrequency: "연락 빈도",
    hobby: "취미",
    song: "좋아하는 노래",
    comment: "소개할 다섯글자",
    // admissionYear: "입학년도",
  };

  const handleSubmit = async (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  if (isSubmitting) return; // ✅ 중복 제출 방지
  setIsSubmitting(true); // ✅ 제출 시작

  const requiredFields = [
    "major",
    "year",
    "month",
    "day",
    "gender",
    "university",
    "contactFrequency",
    "username",
    "song",
    "comment",
    // "admissionYear",
  ];

  for (let field of requiredFields) {
    if (
      !user[field] ||
      (Array.isArray(user[field]) && user[field].length === 0)
    ) {
      alert(`${fieldLabels[field]} 빈칸을 채워주세요`);
      navigate("/");
      return;
    }
  }

  const postData = {
    contactId: user.contact_id,
    major: user.major,
    year: user.year,
    month: user.month,
    day: user.day,
    university: user.university,
    mbti: user.mbti,
    username: user.username,
    gender: user.gender,
    contactFrequency: user.contactFrequency,
    hobby: user.hobby,
    song: user.song,
    comment: user.comment,
    // admissionYear: user.admissionYear,
  };

  // 하나라도 누락 또는 빈 값이면 profile-builder로 이동
  for (let key in postData) {
    if (
      postData[key] === undefined ||
      postData[key] === null ||
      postData[key] === "" ||
      (Array.isArray(postData[key]) && postData[key].length === 0)
    ) {
      alert(`프로필 정보가 부족합니다. '${key}' 항목을 확인해주세요.`);
      navigate("/profile-builder");
      return;
    }
  }

  try {
    console.log("postData", postData);
    const response = await instance.post("/auth/social/api/user/info", postData);
    console.log("등록 성공", response.data);
    navigate("/login");
  } catch (error) {
    console.error("등록 실패", error);
    alert("등록 중 오류가 발생했습니다.");
  } finally {
    setIsSubmitting(false); // ✅ 항상 초기화
  }
};

  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleAgeClick = (value) => {
    setUser((prev) => ({
      ...prev,
      contactFrequency: value,
    }));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <Background />
      <ProgressNav step={3} />
      <div className="text-container">
        <div className="main-text">자신을 소개해주세요!</div>
        <div className="sub-text">
          정보를 정확하게 입력했는지 확인해 주세요.
          <br />
          별로 오래 걸리지 않아요!
        </div>
      </div>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="form-inner-content">
          {/* 7단계: 닉네임 */}
          {currentStep >= 7 && (
            <div>
              <label>
                <h3 className="commet_title">
                  코매칭에서 사용할 닉네임
                </h3>
                <div className="music">
                  <MyInput
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="닉네임은 최대 6자 입니다."
                    className="username-input"
                    maxLength={10}
                  />
                </div>
              </label>
            </div>
          )}

          {/* 6단계: 장점 */}
          {currentStep >= 6 && (
            <div>
              <label>
                <h3 className="commet_title">제 장점은요...</h3>
                <div className="music">
                  <MyInput
                    name="comment"
                    value={user.comment}
                    onChange={handleChange}
                    placeholder="맛 잘알이에여~"
                    className="comment-input"
                    maxLength={10}
                  />
                </div>
              </label>
              
              {currentStep === 6 && (
                <button
                  type="button"
                  className={`next-button ${user.comment && user.comment.length >= 3 ? 'active' : 'disabled'}`}
                  onClick={handleNextToUsername}
                  disabled={!(user.comment && user.comment.length >= 3)}
                >
                  다음으로
                </button>
              )}
            </div>
          )}

          {/* 5단계: 노래 */}
          {currentStep >= 5 && (
            <div>
              <label>
                <h3 className="music_title">좋아하는 노래</h3>
                <div className="music">
                  <MyInput
                    name="song"
                    value={user.song}
                    onChange={handleChange}
                    placeholder="Young Man"
                    className="song-input"
                  />
                </div>
              </label>
              
              {currentStep === 5 && (
                <button
                  type="button"
                  className={`next-button ${user.song ? 'active' : 'disabled'}`}
                  onClick={handleNextToComment}
                  disabled={!user.song}
                >
                  다음으로
                </button>
              )}
            </div>
          )}

          {/* 4단계: 연락방법 */}
          {currentStep >= 4 && (
            <div>
              <ContactMethod
                checkMethod={checkMethod}
                isContactVerified={isContactVerified}
                setCheckMethod={setCheckMethod}
                setIsContactVerified={setIsContactVerified}
                user={user}
                setUser={setUser}
                handleChange={handleChange}
              />
              
              {currentStep === 4 && (
                <button
                  type="button"
                  className={`next-button ${isContactVerified ? 'active' : 'disabled'}`}
                  onClick={handleNextToSong}
                  disabled={!isContactVerified}
                >
                  다음으로
                </button>
              )}
            </div>
          )}

          {/* 3단계: 성별 */}
          {currentStep >= 3 && (
            <div>
              <GenderSelect
                user={user}
                setUser={setUser}
                onChange={handleChange}
              />
              
              {currentStep === 3 && (
                <button
                  type="button"
                  className={`next-button ${user.gender ? 'active' : 'disabled'}`}
                  onClick={handleNextToContact}
                  disabled={!user.gender}
                >
                  다음
                </button>
              )}
            </div>
          )}

          {/* 2단계: 연락빈도 */}
          {currentStep >= 2 && (
            <div>
              <h3>연락빈도</h3>
              <div className="match-select-button">
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "NOT_FREQUENT" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("NOT_FREQUENT")}
                >
                  적음
                </button>
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "NORMAL" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("NORMAL")}
                >
                  중간
                </button>
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "FREQUENT" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("FREQUENT")}
                >
                  많음
                </button>
              </div>
              
              {currentStep === 2 && (
                <button
                  type="button"
                  className={`next-button ${user.contactFrequency ? 'active' : 'disabled'}`}
                  onClick={handleNextToGender}
                  disabled={!user.contactFrequency}
                >
                  다음으로
                </button>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <button
              type="button"
              className={`next-button ${isMajorSelected() && isBirthDateValid() ? 'active' : 'disabled'}`}
              onClick={handleNextToContactFrequency}
              disabled={!(isMajorSelected() && isBirthDateValid())}
            >
              다음으로
            </button>
          )}

          {/* 1단계: 기본정보 (항상 보임) */}
          <MajorSelector
            user={user}
            setUser={setUser}
            checkMethod={checkMethod}
            setCheckMethod={setCheckMethod}
          />
          
          <AgeInputInput user={user} setUser={setUser} />

          {/* 최종 시작하기 버튼 */}
          {currentStep >= 7 && user.username && (
            <button
              className={`next-button ${isFiveChars ? "active" : ""}`}
              type="button"
              onClick={openModal}
              disabled={!isFiveChars}
            >
              코매칭 시작하기
            </button>
          )}
        </div>
      </form>
      <TermsAgreementModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        handleSubmit={handleSubmit}
        registerCheck={registerCheck}
        setRegisterCheck={setRegisterCheck}
      />
    </div>
  );
}

export default Userinfo;
