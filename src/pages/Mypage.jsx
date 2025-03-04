import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

import Background from '../components/Background';
import '../css/pages/mypage.css';
import SupportSection from '../components/Mypage/SupportSection.jsx'
import NavBar from '../components/Navbar.jsx';
const Mypage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const closeModal = ()=>{
    setIsModalOpen(false)
  }

  return (
    <div className='mypage-container'>
      <Background />
      
      <div className='mypage-greeting'>
        <p>겨울이오길님, <br />반갑습니다.</p>
      </div>
      
      {/* 프로필 수정 버튼 클릭 시 /profile-edit로 이동 */}
      <button className='mypage-profile-btn' onClick={() => navigate('/profile-edit')}>
        프로필 수정
      </button>
      
      <div className='mypage-point-container'>
        <div className="mypage-flex">
            <img className='mypage-point-icon' src='/assets/MainPayment/coin.svg' alt='포인트 아이콘' />
            <div className='mypage-point-info'>
                <p className='mypage-point-label'>보유 포인트</p>
                <p className='mypage-point-value'>10,000 P</p>
            </div>
            <button className='mypage-recharge-btn'>충전하기</button>
            
        </div>
        <div className='mypage-history-btns'>
            <button className='mypage-history-btn'>충전내역</button>
            <button className='mypage-history-btn'>사용내역</button>
        </div>
      </div>
      
      <SupportSection />
      <NavBar />

      {/* 충전하기 버튼 클릭 시 모달 표시 */}
      {isModalOpen && <MainPaymentModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />} 
      <NavBar/>
    </div>
  );
};

export default Mypage;
