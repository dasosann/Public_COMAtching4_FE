import React, { useEffect, useRef, useState } from 'react';
import '../css/components/PointBalance.css'; // 스타일을 분리하여 유지보수 가능하게 설정
import { useLocation, useNavigate } from 'react-router-dom'; // React Router 사용
import MainPaymentModal from './MainPaymentModal';

const PointBalance = ({ userAmount }) => {
    const hasSent = useRef(false); // 요청이 한 번만 보내졌는지 추적
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태 관리
    const [paymentStatus, setPaymentStatus] = useState(false); // 'success' | 'fail' | null 등
    const [amount, setAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // 네비게이션 함수
    const sendParamsToBackend = async (paymentKey, orderId, amount, uniqueId) => {
      try {
        setIsLoading(true);
        const response = await fetch("http://13.124.46.181:8080/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key" : uniqueId,
          },
          body: JSON.stringify({
            paymentKey: paymentKey,
            orderId : orderId,
            amount : amount,
          }),
          credentials:"include",
        });
        if(response.ok){
          const data = await response.json();
          console.log("백엔드 응답 정상적:", data);
          setPaymentStatus('success')
          
        }else{
          const errorData = await response.json();
          console.error("벡엔드 응답 오류 발생:", errorData);
          setPaymentStatus("fail");
        }
      } catch (error) {
        console.error("백엔드로 데이터 전송 실패:", error);
      }finally{
        setIsLoading(false);
      }
    };
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const status = searchParams.get("status"); // success or fail
      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");
  
      if (status === "success") {
        // 1) 서버에 paymentKey, orderId, amount를 검증 요청
        // 2) 검증 성공 시, 모달을 열어서 "결제 성공" 표시
        navigate('/', { replace: true }); 
        setIsModalOpen(true);
        if (amount) {
          setAmount(amount);
        }
        if (paymentKey && orderId && amount&&!hasSent.current) {
          const uniqueId = uuidv4();
          console.log(uniqueId); // 예: d2eebf8f-6c19-4b5e-b501-d6c7b7de5a1e
          hasSent.current = true;
          sendParamsToBackend(paymentKey, orderId, amount, uniqueId);
        }
      } else if (status === "fail") {
        navigate('/', { replace: true }); 
        setIsModalOpen(true);
        setPaymentStatus("fail");
      }
    }, [location,navigate]);
  // const handleChargeClick = () => {
  //   navigate('/charge'); 
  // };
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="point-balance">
        <div className="left-section">
          <img src="/assets/point.svg" alt="Point Icon" className="point-icon" />
          <span className="point-text">보유 포인트</span>
          <span className="amount">{userAmount} P</span>
        </div>
        <button className="charges-button" onClick={openModal}>충전하기</button>
      </div>
        <MainPaymentModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          amount={amount}
        />
    </div>
  );
};

export default PointBalance;
