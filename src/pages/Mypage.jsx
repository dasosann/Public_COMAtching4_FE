import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useState ,useEffect} from 'react';
import Background from '../components/Background';
import '../css/pages/mypage.css';
import SupportSection from '../components/Mypage/SupportSection.jsx'
import NavBar from '../components/Navbar.jsx';
import instance from '../axiosConfig.jsx';
import MainPaymentModal from '../components/MainPaymentModal.jsx';
const Mypage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [userData, setUserData] = useState({ username: '', point: 0 }); 
  const [paymentStatus, setPaymentStatus] = useState(false); 
  const [amount, setAmount] = useState(null);
  const closeModal = ()=>{
    setIsModalOpen(false)
  }
  useEffect(() => {
    // ✅ 사용자 프로필 정보 요청
    const fetchUserProfile = async () => {
      try {
        const res = await instance.get('/auth/user/profile');
        if (res.data?.code === 'GEN-000') {
          setUserData(res.data.data); // { username, point }
        } else {
          alert('프로필 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('프로필 요청 실패:', err);
        alert('서버 오류가 발생했습니다.');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='mypage-container'>
      <Background />
      
      <div className='mypage-greeting'>
        <p>{userData.username}님, <br />반갑습니다.</p>
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
                <p className='mypage-point-value'>{userData.point.toLocaleString()} P</p>
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
      <MainPaymentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        amount={amount}
      />
      <div  style={{ height: '100px' }}></div>
    </div>
  );
};

export default Mypage;
