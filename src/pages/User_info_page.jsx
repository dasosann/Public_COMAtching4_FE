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

  const [isGenderSelectable, setIsGenderSelectable] = useState(false);
  const [isContactVerified, setIsContactVerified] = useState(false);
  const [isSongInputVisible, setIsSongInputVisible] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isFiveChars, setIsFiveChars] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isGenderSelected, setIsGenderSelected] = useState(false);
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

  const isAdmissionYearValid = () =>
    user.admissionYear && user.admissionYear.toString().length === 2;

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
      "admissionYear",
    ];
    const isFilled = requiredFields.every((field) => {
      const value = user[field];
      return value && (Array.isArray(value) ? value.length > 0 : value !== "");
    });
    const isCommentValid = user.comment && user.comment.length >= 3;
    setIsFiveChars(isFilled && isCommentValid);
  };

  // 연락빈도 선택 가능 여부 확인 (전공, 생년월일, 입학년도, 연락빈도 모두 유효하면 true)
  const checkAllFieldsSelected = () => {
    const isAllSelected =
      isMajorSelected() &&
      isBirthDateValid() &&
      isAdmissionYearValid() &&
      isContactFrequencySelected();
    setIsGenderSelectable(isAllSelected);
  };

  // user가 바뀔 때마다 확인
  useEffect(() => {
    checkAllFieldsFilled();
  }, [user, checkMethod]);

  useEffect(() => {
    checkAllFieldsSelected();
  }, [
    checkMethod,
    user.year,
    user.month,
    user.day,
    user.admissionYear,
    user.mbti,
    user.contactFrequency,
  ]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "song":
        if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,20}$/.test(value)) {
          errorMessage =
            "노래에는 특수 기호를 사용할 수 없고 20자리 이내로 작성해주세요";
        } else {
          setIsCommentVisible(true);
        }
        break;
      case "comment":
        if (value.length <= 10) {
          setUser((prevUser) => ({
            ...prevUser,
            comment: value,
          }));
          setIsUsernameVisible(true);
        }
        break;
      case "username":
        if (value.length > 10) {
          errorMessage = "닉네임은 최대 10자까지 가능합니다.";
        }
        break;
      case "admissionYear":
        setUser((prevUser) => ({
          ...prevUser,
          admissionYear: value !== "" ? parseInt(value, 10) : "",
        }));
        break;
      case "gender":
        if (value === "MALE" || value === "FEMALE") {
          setUser((prevUser) => ({
            ...prevUser,
            gender: value,
          }));
          setIsGenderSelected(true);
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
    admissionYear: "입학년도",
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  
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
      "admissionYear",
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
      admissionYear: user.admissionYear,
    };
  
    try {
      const response = await instance.post("/auth/social/api/user/info", postData);
      console.log("등록 성공", response.data);
      // 성공 후 리디렉션 또는 알림
      navigate("/success"); // 성공 페이지 예시
    } catch (error) {
      console.error("등록 실패", error);
      alert("등록 중 오류가 발생했습니다.");
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
          {isUsernameVisible && (
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

          {isCommentVisible && (
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
            </div>
          )}

          {isContactVerified && (
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
            </div>
          )}

          {isGenderSelected && (
            <ContactMethod
              checkMethod={checkMethod}
              isContactVerified={isContactVerified}
              setCheckMethod={setCheckMethod}
              setIsContactVerified={setIsContactVerified}
              user={user}
              setUser={setUser}
              handleChange={handleChange}
            />
          )}

          {isGenderSelectable && (
            <GenderSelect
              user={user}
              setUser={setUser}
              onChange={handleChange}
              setIsGenderSelected={setIsGenderSelected}
            />
          )}

          {isMajorSelected() && isBirthDateValid() && isAdmissionYearValid() && (
            <div>
              <h3>연락빈도</h3>
              <div className="match-select-button">
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "자주" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("자주")}
                >
                  적음
                </button>
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "보통" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("보통")}
                >
                  중간
                </button>
                <button
                  type="button"
                  className={`form-AgeMaker ${
                    user.contactFrequency === "가끔" ? "selected" : ""
                  }`}
                  onClick={() => handleAgeClick("가끔")}
                >
                  많음
                </button>
              </div>
            </div>
          )}

          {isMajorSelected() && isBirthDateValid() && (
            <AdmissionYearInput
              value={user.admissionYear}
              onChange={handleChange}
            />
          )}

          {isMajorSelected() && (
            <AgeInputInput user={user} setUser={setUser} />
          )}

          <MajorSelector
            user={user}
            setUser={setUser}
            checkMethod={checkMethod}
            setCheckMethod={setCheckMethod}
          />

          <button
            className={`start-button ${isFiveChars ? "active" : ""}`}
            type="button"
            onClick={openModal}
            disabled={!isFiveChars}
          >
            코매칭 시작하기
          </button>
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
