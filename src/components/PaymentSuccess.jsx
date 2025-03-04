import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // uuid 모듈을 import로 변경
const SuccessPage = () => {
  const hasSent = useRef(false); // 요청이 한 번만 보내졌는지 추적
  const navigate= useNavigate();
  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const paymentKey = queryParams.get("paymentKey");
    const orderId = queryParams.get("orderId");
    const amount = queryParams.get("amount");
    console.log("amount",amount)
    if (paymentKey && orderId && amount&&!hasSent.current) {
      const uniqueId = uuidv4();
      console.log(uniqueId); // 예: d2eebf8f-6c19-4b5e-b501-d6c7b7de5a1e
      hasSent.current = true;
      sendDataToBackend(paymentKey, orderId, amount, uniqueId);
    }
  },[])
  const sendDataToBackend = async (paymentKey, orderId, amount, uniqueId) => {
    try {
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
        alert("결제가 완료되었습니다.")
        navigate("/",{replace:true})
      }else{
        const errorData = await response.json();
        console.error("벡엔드 응답 오류 발생:", errorData);
      }
    } catch (error) {
      console.error("백엔드로 데이터 전송 실패:", error);
    }
  };
  
  return (
    <div>
      <p>결제 처리 중입니다...</p>
    </div>
  );
};

export default SuccessPage;
