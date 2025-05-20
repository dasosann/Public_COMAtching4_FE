import React from 'react';
import "../../css/components/SupportSection.css"
import { useNavigate } from 'react-router-dom';
const SupportSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='mypage-support'>
        <p className='mypage-support-title'>고객 지원</p>
        <div className='mypage-support-item' onClick={()=>navigate('/search-mylist')}>
          <span>매칭 내역</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        <div className='mypage-support-item' onClick={()=>navigate('/qa')}>
          <span>Q&A</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        {/* <div className='mypage-support-item'>
          <span>신고하기</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div> */}
      </div>
      
      <div className='mypage-etc'>
        <p className='mypage-etc-title'>기타</p>
        <div className='mypage-support-item' onClick={()=>navigate('/googleagree')}>
          <span>이용약관</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        <div className='mypage-support-item' onClick={()=>navigate('/matching')} >
          <span>매칭하기</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
      </div>
    </>
  );
};

export default SupportSection;
