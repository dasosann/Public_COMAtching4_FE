import React, { useEffect, useRef } from 'react';
import Background from '../../components/Background';
import E from '../../css/pages/MyPageSearch/SearchMyPageStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchNoMatching from './SearchNoMatching';
import SearchYesMatching from './SearchYesMatching';

const SearchMyPage = () => {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const { pathname } = useLocation(); 
  // 페이지 로드 및 경로 변경 시 스크롤을 맨 위로 이동
  useEffect(() => {
    // 브라우저 스크롤 복원 비활성화
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, [pathname]); // 경로 변경 시 실행

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
      <Background/>
      {/* <E.BackgroundBlur/>  */}
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
      {/* <SearchNoMatching /> */}
      <SearchYesMatching />
    </E.MainContainer>
  );
};

export default SearchMyPage;