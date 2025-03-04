import React from 'react';
import "../../css/components/SupportSection.css"
const SupportSection = () => {
  return (
    <>
      <div className='mypage-support'>
        <p className='mypage-support-title'>고객 지원</p>
        <div className='mypage-support-item'>
          <span>공지사항</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        <div className='mypage-support-item'>
          <span>가이드북</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        <div className='mypage-support-item'>
          <span>신고하기</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
      </div>
      
      <div className='mypage-etc'>
        <p className='mypage-etc-title'>기타</p>
        <div className='mypage-support-item'>
          <span>이용약관</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
        <div className='mypage-support-item'>
          <span>회사정보</span>
          <img src='../assets/Common/gt.svg' alt='>' />
        </div>
      </div>
    </>
  );
};

export default SupportSection;
