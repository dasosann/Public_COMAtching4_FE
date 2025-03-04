// AfterPaymentModal.jsx
import React from 'react';
import P from '../css/components/AfterPaymentModalStyle';
const now = new Date();
const year = now.getFullYear(); 
const month = String(now.getMonth() + 1).padStart(2, '0'); 
const day = String(now.getDate()).padStart(2, '0'); 
const hour = String(now.getHours()).padStart(2, '0'); 
const minute = String(now.getMinutes()).padStart(2, '0');
const formattedTime = `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
const WrongRequestModal = ({ onClose }) => {
  return (
    <P.ModalWrapper style={{height:"223px"}}>
      <P.ErrorImage src="/assets/MainPayment/payment-error.svg" alt="에러" />
      <P.PaymentBody>잘못된 요청입니다.<br/>오류가 반복되면 고객센터에 문의해 주세요.</P.PaymentBody>
      <P.ConfirmButton onClick={onClose}>확인</P.ConfirmButton>
    </P.ModalWrapper>
  );
};

const PaymentSuccessModal = ({ onClose ,amount }) => {
  return (
    <P.ModalWrapper style={{height:"223px"}}>
      <P.PaymentTitle>결제 알림</P.PaymentTitle>
      <P.PaymentBody>{formattedTime}<br/>{amount}포인트 충전 성공 </P.PaymentBody>
      <P.ConfirmButton onClick={onClose}>확인</P.ConfirmButton>
    </P.ModalWrapper>
  );
};

const PaymentCancelModal = ({ onClose }) => {
  return (
    <P.ModalWrapper style={{height:"201px"}}>
      <P.PaymentTitle>결제 취소</P.PaymentTitle>
      <P.PaymentBody>결제가 취소되었습니다.</P.PaymentBody>
      <P.ConfirmButton onClick={onClose}>확인</P.ConfirmButton>
    </P.ModalWrapper>
  );
};

export { PaymentCancelModal, PaymentSuccessModal, WrongRequestModal };
