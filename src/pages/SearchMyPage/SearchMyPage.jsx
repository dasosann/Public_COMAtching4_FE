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
  const [userNumber, setUserNumber] = useState(0);
  const [username, setNickname] = useState(''); // nickname 상태 추가
  const { pathname } = useLocation();
  const [matchingData, setMatchingData] = useState([]);

  // 참가자 수 가져오기
  const getParticipants = async () => {
    try {
      const response = await fetchRequest('/api/participations', {
        method: 'GET',
      });
      const data = await response.json();
      console.log('참가자수:', data);
      setUserNumber(data.data || 0);
    } catch (error) {
      console.error('사용자 수 가져오는 중 오류 발생:', error);
    }
  };

  // 사용자 프로필 (nickname) 가져오기
  const fetchNickname = async () => {
    try {
      console.log('Fetching nickname from /auth/user/profile');
      const response = await fetchRequest('/auth/user/profile', {
        method: 'GET',
      });
      console.log('Nickname response status:', response.status);
      const data = await response.json();
      console.log('받아온 닉네임 데이터:', data);
      setNickname(data.data?.username || '알 수 없음'); // nickname 필드 추출, 기본값 설정
    } catch (error) {
      console.error('Failed to fetch nickname:', error);
      setNickname('알 수 없음');
    }
  };

  // 매칭 데이터 가져오기
  const fetchMatchingData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data from /auth/user/api/history/matching');
      const response = await fetchRequest('/auth/user/api/history/matching', {
        method: 'GET',
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('받아온 매칭 데이터:', data);
      setMatchingData(data.data || []);
    } catch (error) {
      console.error('Failed to fetch matching data:', error);
      setMatchingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParticipants();
    fetchNickname(); // 닉네임 가져오기
    fetchMatchingData(); // 매칭 데이터 가져오기
  }, []);

  // 페이지 로드 및 경로 변경 시 스크롤을 맨 위로 이동
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <SearchNoMatching userNumber={userNumber} username={username} />
      ) : (
        <SearchYesMatching matchingData={matchingData} userNumber={userNumber} username={username} />
      )}
    </E.MainContainer>
  );
};

export default SearchMyPage;