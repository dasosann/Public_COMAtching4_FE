import React, { useEffect, useRef, useState } from 'react';
import Background from '../../components/Background';
import E from '../../css/pages/MyPageSearch/SearchMyPageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchNoMatching from './SearchNoMatching';
import SearchYesMatching from './SearchYesMatching';
import fetchRequest from '../../fetchConfig';

const SearchMyPage = () => {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userNumber,setUserNumber] = useState(0);
  const { pathname } = useLocation();
  const [matchingData, setMatchingData] = useState([
    // {
    //   nickname: "JaneDoe",
    //   major: "컴퓨터공학과",
    //   mbti: "INTJ",
    //   age: 22,
    //   admissionYear: 23,
    //   contact_id: "@janedoe",
    //   song: "IU - Love Poem",
    //   comment: "안녕하세요!!",
    //   hobby: ["해외여행"],
    //   contactFrequency: "보통",
    // },
    // {
    //   nickname: "JohnSmith",
    //   major: "경영학과",
    //   mbti: "ENTP",
    //   age: 24,
    //   admissionYear: 21,
    //   contact_id: "@johnsmith",
    //   song: "Coldplay - Fix You",
    //   comment: "새로운 도전을 즐깁니다!",
    //   hobby: ["인디음악", "사랑", "인디음악", "사랑", "인디음악", "사랑", "인디음악", "사랑"],
    //   contactFrequency: "자주",
    // },
    // {
    //   nickname: "AliceKim",
    //   major: "심리학과",
    //   mbti: "INFJ",
    //   age: 23,
    //   admissionYear: 22,
    //   contact_id: "@alicekim",
    //   song: "BTS - Spring Day",
    //   comment: "심리학이 흥미로워요!",
    //   hobby: ["영화"],
    //   contactFrequency: "가끔",
    // },
  ]);
  console.log("매칭데이터", matchingData)
  const getParticipants = async () =>{
    try{
      const userNumber = await fetchRequest('/api/participations',{
        method:"GET",
      });
      const data = await userNumber.json();
      console.log("참가자수", data)
      setUserNumber(data.data);
    }catch(error){
      console.error("사용자 수 가져오는 중 오류 발생",error)
    }
  }
  useEffect(() => {
    getParticipants();
  }, []);
  // 페이지 로드 및 경로 변경 시 스크롤을 맨 위로 이동
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  // API 호출로 매칭 데이터 가져오기
  // useEffect(() => {
  //   const fetchMatchingData = async () => {
  //     try {
  //       setLoading(true);
  //       console.log('Fetching data from /auth/user/api/history/matching');
  //       const response = await fetchRequest('/auth/user/api/history/matching', {
  //         method: 'GET',
  //       });
  //       console.log('Response status:', response.status);
  //       const data = await response.json();
  //       console.log('받아온 데이터:', data);
  //       setMatchingData(data.data || []); // API 응답이 배열이라고 가정
  //     } catch (error) {
  //       console.error('Failed to fetch matching data:', error);
  //       setMatchingData([]); // 에러 발생 시 빈 배열 설정
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMatchingData();
  // }, []);

  useEffect(() => {
    if (mainContainerRef.current) {
      console.log('Window Height:', window.innerHeight);
      console.log('MainContainer Height:', mainContainerRef.current.offsetHeight);
    }
  }, []);

  const handleBackArrow = () => {
    navigate('/login');
  };

  return (
    <E.MainContainer ref={mainContainerRef}>
      <Background />
      <E.BackArrowDiv>
        <img src="/assets/MainPayment/arrow-left.svg" alt="화살표" onClick={handleBackArrow} />
      </E.BackArrowDiv>
      <E.HeaderContainer>
        <E.MainSpan>조회하기</E.MainSpan>
        <div>
          <E.Subspan>내가 뽑은 상대들을 여기서 확인할 수 있어요.</E.Subspan>
          <E.Subspan>용기내서 연락해보세요!</E.Subspan>
        </div>
      </E.HeaderContainer>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>
      ) : matchingData.length === 0 ? (
        <SearchNoMatching userNumber={userNumber} />
      ) : (
        <SearchYesMatching matchingData={matchingData} userNumber={userNumber}/>
      )}
    </E.MainContainer>
  );
};

export default SearchMyPage;