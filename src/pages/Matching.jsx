import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilState , useResetRecoilState} from "recoil";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import { MatchPickState, MatchResultState, userState } from "../Atoms";
import MatchOptionButtonclass from "../components/MatchOptionButton_Class";
import MBTISection from "../components/MBTISection";
import AgeButton from "../components/AgeButton";
import MatchOptionButton from "../components/MatchOptionButton";
import hobbyIcons from "../data/hobbyIcons"; // 취미 아이콘 데이터 가져오기
import "../css/pages/Matching.css";
import Loading from "./Loading.jsx";
import HeaderBack from "../components/HeaderBack.jsx";
import instance from "../axiosConfig.jsx";
import PointBalance from "../components/PointBalance.jsx";
import MatchPriorityModal from "../components/Matching/MatchPriorityModal.jsx";
import InterestModal from "../components/Matching/InterestModal.jsx";
function Matching() {
  const [MatchState, setMatchState] = useRecoilState(MatchPickState); // 뽑은 선택 리스트
  const [userPoint, setUserPoint] = useRecoilState(userState);
  const selectedHobby = MatchState.formData.hobbyOption[0] || ""; // 선택된 취미 가져오기

  const [imagePosition, setImagePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMBTISelected, setIsMBTISelected] = useState(false); // MBTI 2개 선택 여부를 추적
  const startX = useRef(0);
  const [matchPageResult, setMatchPageResult] =
    useRecoilState(MatchResultState); // 뽑기 결과 상태 관리
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled  , setIsButtonEnabled] = useState(false);
  const resetMatchState = useResetRecoilState(MatchPickState);
  const resetMatchResultState = useResetRecoilState(MatchResultState);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [isPrioritySelected, setIsPrioritySelected] = useState(true);//우선순위위

  const toggleInterestModal = () => {
    setInterestModalOpen(!interestModalOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  

  
//   useEffect(() => {
//     // Fetch currentPoint from backend when component mounts
//     const fetchCurrentPoint = async () => {
//       try {
//         const response = await instance.get("/auth/user/api/currentPoint");
        
//         // Assuming response.data.currentPoint is the point value you want to set in Recoil
//         setUserPoint((prev) => ({
//           ...prev,
//           point: response.data.data.currentPoint, // Update the point in Recoil
//         }));
//       } catch (error) {
//         console.error("Failed to fetch currentPoint:", error);
//       }
//     };

//     fetchCurrentPoint();
// }, [setUserPoint]); 

  
const handleHobbyClick = (index) => {
  setMatchState((prev) => ({
    ...prev,
    formData: {
      ...prev.formData,
      hobbyOption: prev.formData.hobbyOption.includes(index) ? [] : [index], // 하나만 선택 가능
    },
  }));
  
};
useEffect(() => {
  const { ageOption, mbtiOption, hobbyOption, contactFrequencyOption } = MatchState.formData;

  // 모든 필수 선택 값이 비어있지 않으면 true
  const isAllOptionsSelected = 
  ageOption !== "" &&
    mbtiOption !== "" &&
    hobbyOption.length > 0 &&
    contactFrequencyOption !== "";

  setIsButtonEnabled(isAllOptionsSelected);
  console.log(isAllOptionsSelected);
}, [MatchState.formData]); // formData 값이 변경될 때마다 실행

useEffect(() => {
  console.log("Updated MatchState:", MatchState);
}, [MatchState]); // MatchState가 변경될 때마다 실행

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Recoil 상태 초기화
    resetMatchState();  // MatchPickState 초기화
    
    resetMatchResultState(); // MatchResultState 초기화
  }, [resetMatchState,  resetMatchResultState]);
  const handleStart = (e) => {
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    if (!isMBTISelected) return; // MBTI 2개가 선택되지 않으면 드래그 불가
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
  };

  const handleMove = (e) => {
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    if (isDragging) {
      const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
      const deltaX = clientX - startX.current;
      const newPosition = Math.min(Math.max(0, imagePosition + deltaX), 252); // 252는 이동 가능한 최대 위치
      setImagePosition(newPosition);
      startX.current = clientX; // 현재 위치 업데이트
    }
  };
  const handleEnd = async () => {
    if (!isDragging) return;
    if (MatchState.point > userPoint.point) {
      alert("포인트가 부족합니다!!");
      return; // 동작 중단
    }
    setIsDragging(false);

    // 필수 선택 확인
    const isAgeSelected = MatchState.isUseOption[0]
      ? MatchState.formData.ageOption !== ""
      : true;
    const isContactFrequencySelected = MatchState.isUseOption[1]
      ? MatchState.formData.contactFrequencyOption !== ""
      : true;
    const isHobbySelected = MatchState.isUseOption[2]
      ? MatchState.formData.hobbyOption.length > 0
      : true;

    if (!isAgeSelected) {
      alert("나이를 선택해 주세요.");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (!isContactFrequencySelected) {
      alert("연락 빈도를 선택해 주세요.");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (!isHobbySelected) {
      alert("취미를 선택해 주세요.(최대 5개");
      setImagePosition(0); // 이미지 위치 초기화
    } else if (imagePosition >= 252) {
      alert("다음 단계로 이동합니다."); // 이동 완료 후 원하는 동작 수행
      // 다음 단계로 이동 로직 추가
    }

    const FormData = {
      ageOption: MatchState.isUseOption[0]
        ? MatchState.formData.ageOption
        : "UNSELECTED",
      mbtiOption: MatchState.selectedMBTI
        .filter((letter) => letter !== "X")
        .join(","),
      hobbyOption: MatchState.isUseOption[2]
        ? MatchState.formData.hobbyOption
        : ["UNSELECTED"],
      contactFrequencyOption: MatchState.isUseOption[1]
        ? MatchState.formData.contactFrequencyOption
        : "UNSELECTED",
      sameMajorOption: MatchState.isUseOption[3] ? true : false,
    };
    setMatchState((prev) => ({
      ...prev,
      formData: {
        FormData,
      },
    }));
    

    try {
      setLoading(true);
      const response = await instance.post(
        "/auth/user/api/match/request",
        FormData
      );
      
      if (response.status === 200) {
        await setMatchPageResult((prev) => ({
          ...prev,
          age: response.data.data.age,
          comment: response.data.data.comment,
          contactFrequency: response.data.data.contactFrequency,
          currentPoint: response.data.data.currentPoint,
          gender: response.data.data.gender,
          hobby: response.data.data.hobby,
          major: response.data.data.major,
          mbti: response.data.data.mbti,
          socialId: response.data.data.contactId,
          song: response.data.data.song,
        }));
        await setUserPoint((prev) => ({
          ...prev,
          point: response.data.data.currentPoint,
        }));
        
        navigate("/match-result",{ replace: true });
      } else {
        alert("실패하였습니다");
        navigate("/");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  
  const handleMBTISelection = (value) => {
    // 선택한 것의 카테고리 구분
    const category =
      value === "E" || value === "I"
        ? 0
        : value === "S" || value === "N"
        ? 1
        : value === "T" || value === "F"
        ? 2
        : 3;
  
    setMatchState((prev) => {
      const updatedMBTI = [...prev.selectedMBTI];
      const updatedCategory = [...prev.selectedCategory];
  
      if (updatedCategory.includes(category)) {
        if (updatedMBTI[category] === value) {
          updatedMBTI[category] = "X"; // 선택 해제
          updatedCategory.splice(updatedCategory.indexOf(category), 1);
        } else {
          updatedMBTI[category] = value; // 같은 카테고리 내 다른 값 선택
        }
      } else {
        if (updatedCategory.length >= 4) {
          updatedMBTI[updatedCategory[0]] = "X"; // 기존 선택을 제거
          updatedCategory.shift();
        }
        updatedMBTI[category] = value;
        updatedCategory.push(category);
      }

      // 선택된 MBTI 값을 정리하여 formData.mbtiOption에 반영
      const mbtiOptionValue = updatedMBTI.filter((letter) => letter !== "X").join(",");


  
      const isSelected = updatedCategory.length >= 2 && updatedCategory.length <= 4; // 2개 이상 4개 이하 선택 여부 확인
      setIsMBTISelected(isSelected); // 2개 이상 4개 이하가 선택되었을 때만 슬라이더 활성화
  
      return {
        ...prev,
        selectedMBTI: updatedMBTI,
        selectedCategory: updatedCategory,
        formData: {
          ...prev.formData,
          mbtiOption: mbtiOptionValue, // 업데이트된 MBTI 값을 저장
        },
      };
    });
  };
  
  const togglePrioritySelection = () => {
    setIsPrioritySelected((prev) => !prev);
    setMatchState((prev) => ({
      ...prev,
      point: prev.point + (isPrioritySelected ? 300 : -300), // 선택되었으면 차감, 선택 안 되었으면 추가
    }));
  };
  
  const handleAgeSelection = (value, location) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [location]: prev.formData[location] === value ? "" : value, // 선택 취소 로직
      },
    }));
  };

  // 유료 버튼 사용 클릭 핸들러
  const handleButtonClick = (index, cost) => {
    setMatchState((prev) => {
      const newIsUseOption = prev.isUseOption.map((option, i) =>
        i === index ? !option : option
      );

      // 비용 계산 로직
      const newPoint = newIsUseOption[index]
        ? prev.point + cost
        : prev.point - cost;

      return {
        ...prev,
        point: newPoint,
        isUseOption: newIsUseOption,
      };
    });
  };


  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <Background />
          <HeaderBack />
          <div className="matchcontent">
            <div className="match-title">
              <div className="match-title-text">매칭하기</div>
              <div className="match-title-inst-txt">
              요즘 관심있는 것들을 3개 이상 선택해주세요. <br />
              최대 10개까지 선택할 수 있어요.
              </div>
            </div>
          </div>
          <PointBalance amount={userPoint.point}/>
          
          <div className="firstcontent_mbti">
            <div className="match-title-mbti">
              <div className="match-title-text">
                우선순위 선택하기<span className="match-required-text match-required-text-red">추천</span>
              </div>
              <div className="match-title-inst-txt">
                AI가 우선순위를 설정해서 골라줘요.
              </div>
              </div>
              <button
                type="button"
                className={`${isPrioritySelected ? "match-premium-option-unclick-button" : "match-premium-option-clicks-button"}`}
                onClick={() => {
                  if (isPrioritySelected) {
                    toggleModal(); // false → true 변경 시에만 모달 열기
                  }
                  else{
                    togglePrioritySelection(); 
                  }
                  
                  
                }}
                
              >
                
                  {isPrioritySelected ? (
                    // 선택되었을 때 새로운 UI 표시
                    <div className="match-premium-option-cost">
                      <img src="/assets/point.svg" alt="Selected" />
                      300
                    </div>
                  ) : (
                    // 기본 UI
                    <>
                      <img src="/assets/Match/priority_selected.svg" alt="cost" className="cost_icon" />
                      
                    </>
                  )}
                

                
              </button>
              
            
            
          </div>
          <div className="matchcontent_mbti">
            <div className="match-title-mbti">
              <div className="match-title-text">
                MBTI 
              </div>
              <div className="match-title-inst-txt">
                상대방의 MBTI 2개를 골라주세요.
              </div>
            </div>
            <MBTISection
              user={MatchState.selectedMBTI}
              onClick={handleMBTISelection}
              name="MBTIButton"
            />
          </div>
          <div className="matchcontent_mbti">
            <div className="match-title-mbti">
              <div
                className="match-premium-option"
              >
                <div className="match-flex">
                  <div className="match-title-text">
                    관심사
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 관심사를 골라주세요
                  </div>
                </div>
                <div className="match-img" onClick={toggleInterestModal}>
                  <img src="/assets/Common/gt.svg" alt="" />
                </div>
              </div>
            </div>
            
            
          </div>
          
          <div className="matchcontent_mbti">
            <div className="match-title-mbti">
              <div
                className="match-premium-option"
              >
                <div>
                  <div className="match-title-text">
                    나이
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 나이를 골라주세요
                  </div>
                </div>
                
              </div>
            </div>
            {/* MatchOptionButton 클릭 시만 나이 선택 버튼 표시 */}
            
              <div className="match-select-button">
                <AgeButton
                  formData={MatchState.formData.ageOption}
                  value="YOUNGER"
                  text="연하"
                  onClick={() => handleAgeSelection("YOUNGER", "ageOption")}
                  isClickable={true}
                />
                <AgeButton
                  formData={MatchState.formData.ageOption}
                  value="EQUAL"
                  text="동갑"
                  onClick={() => handleAgeSelection("EQUAL", "ageOption")}
                  isClickable={true}
                />
                <AgeButton
                  formData={MatchState.formData.ageOption}
                  text="연상"
                  value="OLDER"
                  onClick={() => handleAgeSelection("OLDER", "ageOption")}
                  isClickable={true}
                />
              </div>
            
          </div>
          <div className="matchcontent_mbti">
            <div className="match-title-mbti">
              <div
                className="match-premium-option"
              >
                <div>
                  <div className="match-title-text">
                    연락 빈도
                  </div>
                  <div className="match-title-inst-txt">
                    원하는 연락 빈도 선택
                  </div>
                </div>
                
                
              </div>
              <div className="match-select-button">
                <AgeButton
                  formData={MatchState.formData.contactFrequencyOption}
                  text="자주"
                  value="FREQUENT"
                  onClick={() =>
                    handleAgeSelection("FREQUENT", "contactFrequencyOption")
                  }
                  isClickable={true}
                />
                <AgeButton
                  formData={MatchState.formData.contactFrequencyOption}
                  text="보통"
                  value="NORMAL"
                  onClick={() =>
                    handleAgeSelection("NORMAL", "contactFrequencyOption")
                  }
                  isClickable={true}
                />
                <AgeButton
                  formData={MatchState.formData.contactFrequencyOption}
                  text="가끔"
                  value="NOT_FREQUENT"
                  onClick={() =>
                    handleAgeSelection(
                      "NOT_FREQUENT",
                      "contactFrequencyOption"
                    )
                  }
                  isClickable={true}
                />
              </div>
            </div>
            
          </div>

          <div className="matchcontent_mbti">
            <div className="match-title-mbti">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(3, 300)} // 클릭 이벤트 추가
              >
                <div>
                  <div className="match-title-text">
                    같은과는 싫어요
                    <span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    과 CC를 피할 수 있어요
                  </div>
                </div>
                <MatchOptionButtonclass
                  state={MatchState.isUseOption[3]}
                  num={3}
                  money={300}
                  handleButtonClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중지
                    handleButtonClick(0, 100);
                  }}
                />
              </div>
            </div>
          </div>

          {/* <div className="matchcontent_detail">
            <div className="match-title">
              <div
                className="match-premium-option"
                onClick={() => handleButtonClick(2, 100)}
              >
                <div>
                  <div className="match-title-text">
                    취미<span className="match-required-text">선택</span>
                  </div>
                  <div className="match-title-inst-txt">
                    상대의 취미를 5개를 골라주세요
                  </div>
                </div>
                <MatchOptionButton
                  state={MatchState.isUseOption[2]}
                  num={2}
                  money={100}
                  handleButtonClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(2, 100);
                  }}
                />
              </div>
            </div>
            
            {MatchState.isUseOption[2] && (
              <div className="match-hobby-grid">
                {hobbyIcons.map((hobby, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`hobby-item ${
                      MatchState.isUseOption[2]
                        ? `${
                            MatchState.formData.hobbyOption.includes(
                              hobby.label
                            )
                              ? "selected"
                              : ""
                          }`
                        : " "
                    }`}
                    onClick={() => handleHobbyClick(hobby.label)}
                    disabled={!MatchState.isUseOption[2]}
                  >
                    <img src={hobby.image} alt={hobby.alt} />
                    <div>{hobby.label}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
           */}
          <div
            className="cost-bubble"
            style={{
              display: isButtonEnabled && isMBTISelected ? "block" : "none",
            }}
            
          >
            <img src="/assets/footercoin.svg" alt="coin" />
            <span>{MatchState.point}P 소모</span>
          </div>

          <div
            className="footer_btn"
            onMouseMove={isButtonEnabled && isMBTISelected   ? handleMove : null}
            onMouseUp={isButtonEnabled && isMBTISelected   ? handleEnd : null}
            onTouchMove={isButtonEnabled && isMBTISelected ? handleMove : null}
            onTouchEnd={isButtonEnabled && isMBTISelected  ? handleEnd : null}
          >
            <div
              className="footer_btn_box"
              style={{
                backgroundColor: isButtonEnabled && isMBTISelected ? "white" : "lightgray",
                opacity: isButtonEnabled && isMBTISelected  ? 1 : 0.5,
                boxShadow: isButtonEnabled && isMBTISelected 
                  ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  : "none",
              }}
            >
              <img
                src={
                  isButtonEnabled  && isMBTISelected
                    ? "/assets/slider_active.svg"
                    : "/assets/slider.svg"
                } // 이미지 변경
                alt=""
                style={{
                  left: `${imagePosition}px`,
                  cursor: isButtonEnabled && isMBTISelected  ? "pointer" : "not-allowed",
                }} // 커서 변경
                onMouseDown={handleStart}
                onTouchStart={handleStart}
              />
              <p>
                {isButtonEnabled && isMBTISelected 
                ? "밀어서 커플되기"
                : "조건을 선택해 주세요"}
              </p>
            </div>
          </div>

          <div className="footer"></div>
        </div>
      
      
      
      
      )}
      {modalOpen && (
        <MatchPriorityModal modalOpen={modalOpen} toggleModal={toggleModal} togglePrioritySelection={togglePrioritySelection} />
      )}
      {interestModalOpen && <InterestModal  modalOpen={interestModalOpen} toggleModal={toggleInterestModal}  handleHobbyClick = {handleHobbyClick}
      selectedHobby={selectedHobby} />}
    </>
  );
}

export default Matching;