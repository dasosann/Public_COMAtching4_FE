import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import HeaderMain from "../components/HeaderMain";
import UserInfoRrev from "../components/UserInfoRrev";
import { charge, userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import MyInfoButton from "../components/MyInfoButton";
import ChargeButtonInfo from "../components/ChargeButtonInfo";

import Footer from "../components/Footer";
import TutorialSlides from "../components/TutorialSlides";
import HartButtonInfo from "../components/HartButtonInfo";
import Background from "../components/Background";
import instance from "../axiosConfig";
import AccountButtonInfo from "../components/AccountButtonInfo";
import Cookies from "js-cookie"; // js-cookie import 추가
import EventModal from "../components/EventModal";
import PointBalance from "../components/PointBalance";
import MatchProfiles from "../components/Mainpage/MatchProfiles";
function MainpageLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [isAccountClicked, setIsAccountClicked] = useState(false);
  const [isPointClicked, setIsPointClicked] = useState(false); // 포인트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [isHeartClicked, setIsHeartClicked] = useState(false); // 하트 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [showTutorial, setShowTutorial] = useState(false); // Show tutorial on login
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [chargeclick, setchargeclick] = useRecoilState(charge);
  const [showEventModal, setShowEventModal] = useState(false);
  
  const handleAccountToggleClick = () => {
    setIsAccountClicked((prevIsClicked) => !prevIsClicked);
  };
  // 포인트 충전 토글 클릭 핸들러
  const handlePointToggleClick = () => {
    setIsPointClicked((prevIsClicked) => !prevIsClicked);
  };

  // 하트 충전 토글 클릭 핸들러
  const handleHeartToggleClick = () => {
    setIsHeartClicked((prevIsClicked) => !prevIsClicked);
  };
  const handleLogout = () => {
    // 쿠키에서 Authorization, RefreshToken 제거
    Cookies.remove("Authorization");
    Cookies.remove("RefreshToken");
    
    window.location.reload();
  };
  useEffect(() => {
    // eventokay가 false일 때만 모달을 띄웁니다.
    if (userInfo.eventokay === false) {
      setShowEventModal(true);
    }
  }, [userInfo.eventokay]);
  const handleCancel = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/no-pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
        }));
        setShowEventModal(false); // Close modal after successful participation
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };
  
  const handleParticipate = async () => {
    try {
      const response = await instance.get("/auth/user/api/event/pickMe");
      if (response.status === 200) {
        setUserInfo((prev) => ({
          ...prev,
          eventokay: true, // Set eventokay to false after participation
        }));
        setShowEventModal(false); // Close modal after successful participation
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };
  

  // 사용자 정보를 가져오는 비동기 함수
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.get("/auth/user/api/info"); // instance로 요청
        
  //       if (response.status === 200) {
  //         setUserInfo((prev) => ({
  //           ...prev,
  //           username: response.data.data.username,
  //           major: response.data.data.major,
  //           age: response.data.data.age,
  //           song: response.data.data.song,
  //           mbti: response.data.data.mbti,
  //           point: response.data.data.point,
  //           pickMe: response.data.data.pickMe,
  //           hobby:response.data.data.hobbies,
  //           comment:response.data.data.comment,
  //           contact_frequency:response.data.data.contactFrequency,
  //           contact_id: response.data.data.contactId,
  //           canRequestCharge: response.data.data.canRequestCharge,
  //           numParticipants: response.data.data.participations,
  //           eventokay: response.data.data.event1,
  //         }));
  //       }
  //     } catch (error) {
  //       Cookies.remove("Authorization");
  //       Cookies.remove("RefreshToken");
  //       console.error("Error fetching data:", error);
  //       window.location.reload();
  //     }
  //   };
  //   fetchData();
  // }, []);
  const handleNotService = () => {
    alert("해당 서비스는 9/12일 10:00에 오픈됩니다 축제까지 기다려주세요!");
  };
  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleCharge = () => {
    navigate("/charge");
  };
  const handlehartCharge = () => {
    navigate("/heart");
  };
  const handleClickmatch = () => {
    navigate("/matching");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
  };

  // 충전 요청
  const handleChargeRequest = async () => {
    const response = await instance.get("/user/charge/request");
    setchargeclick({
      chargeclick: true, // 클릭된 것으로 상태 변경, 클릭시 관리자 페이지에 뜹니다.
    });
    if (response.data.code === "CHR-001") {
      alert("이미 요청되었습니다."); // 이미 요청된 경우 알림
    }
  };
  const sampleProfiles = [
    {
      nickname: "JaneDoe",
      school: "가톨릭대학교",
      department: "컴퓨터공학과",
      mbti: "INTJ",
      age: 22,
      admissionYear: 23,
      contactId: "@janedoe",
      favoriteSong: "IU - Love Poem",
      introduction: "안녕하세요!!",
      interests: ["여행"],
    },
    {
      nickname: "JohnSmith",
      school: "고려대학교",
      department: "경영학과",
      mbti: "ENTP",
      age: 24,
      admissionYear: 21,
      contactId: "@johnsmith",
      favoriteSong: "Coldplay - Fix You",
      introduction: "모험을 좋아하는 자유로운 영혼입니다. 새로운 도전을 즐깁니다!",
      interests: ["영화 감상", "자전거", "요리"],
    },
    {
      nickname: "AliceKim",
      school: "연세대학교",
      department: "심리학과",
      mbti: "INFJ",
      age: 23,
      admissionYear: 22,
      contactId: "@alicekim",
      favoriteSong: "BTS - Spring Day",
      introduction: "사람들과 깊이 있는 대화를 나누는 걸 좋아해요. 심리학이 흥미로워요!",
      interests: ["음악 감상", "글쓰기", "명상"],
    },
  ];
  return (
    <div className="container">
      <HeaderMain />
      <Background />
      <PointBalance amount={userInfo.point}/>
      <MatchProfiles profiles={sampleProfiles}/>
      <div className="Mainpage__Login">
        
        <div
          onClick={handleClickmatch}
          // onClick={handleNotService}
        >
          <button className="matching-button">
            AI 매칭하기 ▶
            <TotalUsersCounter
              font_size="15px"
              numParticipants={userInfo.numParticipants}
            />
          </button>
        </div>
        <div className="button-group">
          {userInfo.canRequestCharge ? (
            <MyInfoButton
              imgSrc={`../../assets/point.svg`}
              infoText={`${userInfo.point}P`}
              buttonText="잔여포인트"
              handleCharge={handleCharge} 
              // canRequestCharge가 true일 때 handleCharge 전달
              // handleCharge={handleNotService}
            />
          ) : (
            <MyInfoButton
              imgSrc={`../../assets/point.svg`}
              infoText={`${userInfo.point}P`}
              buttonText="잔여포인트"
              handleCharge={null} // canRequestCharge가 false일 때 handleCharge는 null
            />
          )}
          <MyInfoButton
            imgSrc={`../../assets/heart.svg`}
            infoText={`${userInfo.pickMe}회`}
            buttonText="내가 뽑힐 횟수"
            handleCharge={handlehartCharge}
            // handleCharge={handleNotService}
          />
        </div>

        
        <div className="button-group">
          <BottomNavButton
            // onClick={handleNotService}
            onClick={handleVisitcheckresult}
            imgSrc={`../../assets/checkresult.svg`}
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`../../assets/guidebook.svg`}
            imgText="가이드북"
            buttonText="가이드북"
          />
        </div>
        {/* <div  style={{ height: '50px' }}></div> */}
      </div>
      <div className="logout-container">
        <a href="#" onClick={handleLogout} className="logout-link">
          로그아웃
        </a>
      </div>
      <Footer/>
      {/* <NavBar/> */}
      {showEventModal && userInfo.eventokay === false && (
        <EventModal
          onParticipate={handleParticipate}
          onCancel={handleCancel}
          
        />
      )}
      {showTutorial && (
        <TutorialSlides onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}

export default MainpageLogin;
