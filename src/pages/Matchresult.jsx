import React, { useEffect,useState } from "react";
import axios from "axios";
import Background from "../components/Background.jsx";
import HeaderBackPoint from "../components/HeaderBackPoint.jsx";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { MatchResultState, MatchPickState, userState } from "../Atoms";
import "../css/pages/Matchresult.css";
import { useNavigate } from "react-router-dom";
import hobbyData from "../data/hobbyData.js";
import Cookies from "js-cookie";
import Loading from "./Loading.jsx";
import PointBalance from "../components/PointBalance.jsx";
import instance from "../axiosConfig"; // axios 인스턴스 불러오기
import HeaderBack from "../components/Match-result/Header.jsx";
function Matchresult() {
  const navigate = useNavigate();
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);

  const [resultPoint, setResultPoint] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  
   
  
  //같은 조건으로 다시 매칭하기 핸들러
  const handleSubmit = async () => {
  if (MatchState.point > resultPoint.point) {
    alert("포인트가 부족합니다!!");
    navigate("/charge-request", { replace: true });
    return;
  }

  // ✅ FormData를 여기서 다시 생성
  const FormData = {
    importantOption: MatchState.formData.importantOption || "UNSELECTED",
    mbtiOption: MatchState.selectedMBTI.filter((l) => l !== "X").join(""),
    hobbyOption: MatchState.formData.hobbyOption,
    ageOption: MatchState.formData.ageOption,
    contactFrequencyOption: MatchState.formData.contactFrequencyOption,
    sameMajorOption: MatchState.isUseOption[3] ? true : false,
    totalCost: MatchState.point,
    university: "Catholic",
  };

  try {
    setLoading(true);

    const response = await instance.post(
      "/auth/user/api/match/request",
      FormData // ✅ 여기서 수정된 FormData를 직접 사용
    );

    if (true) {
      await setMatchResult((prev) => ({
        ...prev,
        age: 20,
        comment: "노래를 잘해요",
        contactFrequency: "가끔끔",
        currentPoint: 99500,
        gender: "여성",
        hobby: ["농구","게임"],
        major: "컴퓨터정보공학과",
        mbti: "ESTP",
        socialId: "@test_id",
        song: "Letter",
      }));

      await setResultPoint((prev) => ({
        ...prev,
        point: 99500,
      }));

      setLoading(false);
    } else {
      throw new Error("Unexpected response code or status");
    }
  } catch (error) {
    console.error("Error during match request:", error);
  }
};

  
  // 취미를 아이콘과 매핑하는 함수
  const mapHobbiesWithIcons = (hobbyList) => {
    return hobbyList.map((hobbyName) => {
      const matchedCategory = hobbyData.find((category) =>
        category.hobbies.some((hobby) => hobby.name === hobbyName)
      );
      const matchedHobby = matchedCategory?.hobbies.find(
        (hobby) => hobby.name === hobbyName
      );
      return { name: hobbyName, image: matchedHobby?.emoji || "" };
    });
  };
  
  const resultData = {
    ...MatchResult,
    hobby: mapHobbiesWithIcons(MatchResult.hobby),
  };
  
  // useEffect(() => {
  //   if (
  //     resultData.age === 0 &&
  //     resultData.comment === "" &&
  //     resultData.contactFrequency === "" &&
  //     resultData.currentPoint === 0 &&
  //     resultData.gender === "" &&
  //     resultData.hobby.length === 0 &&
  //     resultData.major === "" &&
  //     resultData.mbti === "" &&
  //     resultData.socialId === "" &&
  //     resultData.song === ""
  //   ) {
  //     navigate("/", { replace: true });
  //   }
  // }, [resultData, navigate]);

  useEffect(() => {
  const isEmptyResult =
    resultData.age === 0 &&
    resultData.comment === "" &&
    resultData.contactFrequency === "" &&
    resultData.currentPoint === 0 &&
    resultData.gender === "" &&
    resultData.hobby.length === 0 &&
    resultData.major === "" &&
    resultData.mbti === "" &&
    resultData.socialId === "" &&
    resultData.song === "";

  
}, [resultData, navigate]);

  
  // 다시뽑기 버튼 핸들러
  const handleRematch = () => {
    navigate("/matching");
  };

  const handleHome = () => {
    navigate("/");
  };
  const handleSendText = () => {
    navigate(`/chat`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <Background />
            <HeaderBack />
            <PointBalance amount={resultPoint.point}/>

            {resultData.generatedCode === 2002 ? (
              <div className="matchresult-content">
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "24px" }}>
                    이성이 데이터에 한명도 없습니다
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="matchresult-content">
                  <div className="MatchResult-Container">
                    <div className="MatchResult-Major">
                      <div className="MatchResult-Topic-Top">전공</div>
                      <div className="MatchResult-Text">컴퓨터정보공학과</div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Age">
                      <div className="MatchResult-Topic">나이</div>
                      <div className="MatchResult-Text">20</div>
                    </div>
                    <div className="MatchResult-MBTI">
                      <div className="MatchResult-Topic">MBTI</div>
                      <div className="MatchResult-Text">ESTP</div>
                    </div>
                    <div className="MatchResult-Frequency">
                      <div className="MatchResult-Topic">연락빈도</div>
                      <div className="MatchResult-Text">
                        가끔
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Hobby">
                      <div className="MatchResult-Topic">취미</div>
                      <div className="MatchResult-Text-Hobby">
                        <div  className="hobby-box">
                            <span className="hobby-icon">🏀</span>
                            <span className="hobby-text">농구</span>
                          </div>
                          <div  className="hobby-box">
                            <span className="hobby-icon">💻</span>
                            <span className="hobby-text">프로그래밍</span>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Song">
                    <div className="MatchResult-Topic">좋아하는 노래</div>
                    <div className="MatchResult-Text">Letter</div>
                  </div>
                  <div className="MatchResult-Song">
                    <div className="MatchResult-Topic">나를 표현하는 다섯글자</div>
                    <div className="MatchResult-Text">행복합니다</div>
                  </div>
                  <div className="MatchResult-Container">
                    <div className="MatchResult-Contact">
                      <div className="MatchResult-Topic">
                        {resultData.socialId[0] === "@" ? "instagram" : "kakao"}
                      </div>
                      <div className="MatchResult-Text MatchResult-Text-Contact">
                        @test_id
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-button" onClick={handleRematch}>
                    다시뽑기
                  </button>
                  {/* <button className="SendText-button" onClick={handleSendText}>
                    쪽지 보내기
                  </button> */}
                  <button className="SendText-button" onClick={handleSendText}>
                    쪽지 보내기 
                  </button>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-same-button" onClick={handleSubmit}>
                    <div className="Retry-same-button-point">
                      <img
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }../../assets/point.svg`}
                        alt="cost"
                      />
                      {MatchState.point}P
                    </div>
                    같은 조건으로 다시 뽑기
                  </button>
                </div>
                
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Matchresult;
