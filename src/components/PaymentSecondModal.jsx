import React from 'react';
import P from '../css/components/PaymentSecondModalStyle.js'

const PaymentSecondModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <P.StyledDiv>2번째 모달</P.StyledDiv>
    
  );git 
};

export default PaymentSecondModal;
