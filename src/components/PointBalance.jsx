import React, { useEffect, useRef, useState } from 'react';
import '../css/components/PointBalance.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import MainPaymentModal from './MainPaymentModal';
import fetchRequest from '../fetchConfig';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';
import { PaymentSuccessModal, WrongRequestModal } from './AfterPaymentModal';
import { userState } from '../Atoms';
import { useRecoilState } from 'recoil';

const PointBalance = () => {
  const hasSent = useRef(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false); 
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState); // Recoil 상태 사용
  const fetchUserPoints = async () => {
    try {
      const response = await fetchRequest("/auth/user/api/points", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo((prev)=>({
          ...prev,
          point: data.data,
        })); // 백엔드에서 point 반환 가정
      } else {
        console.error("포인트 조회 실패");
      }
    } catch (error) {
      console.error("포인트 조회 중 오류:", error);
    }
  };
  const sendParamsToBackend = async (paymentKey, orderId, amount, uniqueId) => {
    try {
      setIsLoading(true);
      const response = await fetchRequest("/payments/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": uniqueId,
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("백엔드 응답 정상:", data);
        setPaymentStatus('success');
        await fetchUserPoints();
      } else {
        const errorData = await response.json();
        console.error("백엔드 응답 오류:", errorData);
        setPaymentStatus("fail");
      }
    } catch (error) {
      console.error("백엔드로 데이터 전송 실패:", error);
      setPaymentStatus("fail");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const status = searchParams.get("status"); 
  //   const paymentKey = searchParams.get("paymentKey");
  //   const orderId = searchParams.get("orderId");
  //   const amountQuery = searchParams.get("amount");

  //   if (status === "success") {
  //     navigate('/login', { replace: true }); 
  //     setIsModalOpen(false);

  //     if (amountQuery) {
  //       setAmount(amountQuery);
  //     }
  //     // 처음 한 번만 서버에 검증 요청
  //     if (paymentKey && orderId && amountQuery && !hasSent.current) {
  //       hasSent.current = true;
  //       const uniqueId = uuidv4();
  //       console.log("uniqueId:", uniqueId);
  //       sendParamsToBackend(paymentKey, orderId, amountQuery, uniqueId);
  //     }
  //   } else if (status === "fail") {
  //     navigate('/login', { replace: true }); 
  //     setIsModalOpen(false);
  //     setPaymentStatus("fail");
  //   }
  // }, [location, navigate]);
  useEffect(() => {
    fetchUserPoints(); // ✅ 페이지 진입 시 포인트 불러오기
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 결과 모달이 닫힐 때 처리
  const handleCloseResultModal = () => {
    // 예시: 결과 모달만 닫고, paymentStatus 초기화
    setPaymentStatus(null);
  };

  return (
    <div>
      <div className="point-balance">
        <div className="left-section">
          <img src="/assets/point.svg" alt="Point Icon" className="point-icon" />
          <span className="point-text">보유 포인트</span>
          <span className="amount">{userInfo.point} P</span>
        </div>
        <button className="charges-button" onClick={openModal}>충전하기</button>
      </div>

      <MainPaymentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        amount={amount}
        setMainModal = {setIsModalOpen}
      />

      {/* 로딩 스피너 표시 */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <ClipLoader size={80} color="#ffffff" />
        </div>
      )}

      {/* 결제 결과 모달 (성공/실패) */}
      {paymentStatus === 'success' && (
        <PaymentSuccessModal onClose={handleCloseResultModal} amount={amount} />
      )}

      {paymentStatus === 'fail' && (
        <WrongRequestModal onClose={handleCloseResultModal} />
      )}
    </div>
  );
};

export default PointBalance;
