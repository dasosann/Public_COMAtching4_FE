import React, { useEffect, useRef, useState } from 'react';
import MainPaymentModal from './MainPaymentModal'; // MainPaymentModal 컴포넌트를 import
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // uuid 모듈을 import로 변경
import { ClipLoader } from 'react-spinners';
const PaymentCallTest = () => {
  const navigate = useNavigate();
  const hasSent = useRef(false); // 요청이 한 번만 보내졌는지 추적
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태 관리
  const [paymentStatus, setPaymentStatus] = useState(false); // 'success' | 'fail' | null 등
  const [amount, setAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
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
      navigate('/test', { replace: true }); 
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
      navigate('/test', { replace: true }); 
      setIsModalOpen(true);
      setPaymentStatus("fail");
    }
  }, [location,navigate]);
 
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>포인트 충전</button> {/* 버튼 클릭 시 모달 열기 */}
      {isLoading && (
          <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          {/* ClipLoader 외에도 여러 종류의 로더가 있습니다. */}
          <ClipLoader size={80} color="#ffffff" />
          {/* 필요하다면 문구를 추가할 수도 있음 */}
          {/* <span style={{color:"#fff", marginLeft:"20px"}}>로딩 중...</span> */}
        </div>
      )}
      {/* MainPaymentModal을 해당 상태에 따라 열기/닫기 */}
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

export default PaymentCallTest;
