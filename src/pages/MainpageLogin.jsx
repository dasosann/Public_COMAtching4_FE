import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import HeaderMain from "../components/HeaderMain";
import { userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import Background from "../components/Background";
import instance from "../axiosConfig";
import PointBalance from "../components/PointBalance";
import MatchProfiles from "../components/Mainpage/MatchProfiles";
import NoticeSlideCard from "../components/Mainpage/NoticeSlideCard.jsx";
import NavBar from "../components/Navbar.jsx";
function MainpageLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  
  const [userInfo, setUserInfo] = useRecoilState(userState); 
  // const [userPoint, setUserPoint] = useState(0); 
  
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [profiles, setProfiles] = useState([]);
  
  // 매칭 히스토리 가져오기
  useEffect(() => {
    const fetchMatchingHistory = async () => {
      try {
        const res = await instance.get("/auth/user/api/history/matching");
        
        const data = res.data.data;

        const mapped = data.map((item) => ({
          nickname: item.contactId,
          major: item.major,
          age: item.age,
          mbti: item.mbti,
          contactFrequency: item.contactFrequency,
          hobby: item.hobbyList,
          song: item.song,
          comment: item.comment,
          contact_id: item.contactId,
        }));

        setProfiles(mapped);
      } catch (err) {
        console.error("매칭 히스토리 로딩 실패:", err);
      }
    };

    fetchMatchingHistory();
  }, []);


  useEffect(() => {
    // eventokay가 false일 때만 모달을 띄웁니다.
    if (userInfo.eventokay === false) {
      setShowEventModal(true);
    }
  }, [userInfo.eventokay]);
  
  

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
  //           // eventokay: response.data.data.event1,
  //         }));
  //       }
  //     }catch(error){
  //       console.log("사용자정보 가져오는 중 오류 발생",error)
  //     } 
  //   };
  //   fetchData();
  // }, []);

  const handleNotService = () => {
    alert("해당 서비스는 5/21일 10:00에 오픈됩니다 축제까지 기다려주세요!");
  };
  const handleVisitGuide = () => {
    navigate("/qa");
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
    navigate("/search-mylist");
  };
   const matchingNotAllow = () => {
    alert("현재 매칭 서비스는 종료되었습니다. 코매칭을 이용해주셔서 감사합니다.")
  }
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
  
  
  return (
    <div className="container">
      <HeaderMain />
      <Background />
      <PointBalance/>
      <NoticeSlideCard/>
      <MatchProfiles profiles={profiles}/>
      <div className="Mainpage__Login">
        
        <div
          onClick={matchingNotAllow}
          // onClick={handleNotService}
        >
          <button className="matching-button">
            AI 매칭하기 ▶
            <TotalUsersCounter
              font_size="15px"
            />
          </button>
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
            // onClick={handleNotService}
            onClick={handleVisitGuide}
            imgSrc={`../../assets/guidebook.svg`}
            imgText="Q&A"
            buttonText="Q&A"
          />
        </div>
          <div  style={{ height: '50px' }}></div>
          
      </div>

      <NavBar/>
      {/* <NavBar/>
      {showEventModal && userInfo.eventokay === false && (
        <EventModal
          onParticipate={handleParticipate}
          onCancel={handleCancel}
          
        />
      )}
      {showTutorial && (
        <TutorialSlides onComplete={() => setShowTutorial(false)} />
      )} */}
      {/* <NavBar/> */}
    </div>
  );
}

export default MainpageLogin;
