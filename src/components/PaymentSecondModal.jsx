import React, { useState } from 'react';
import P from '../css/components/PaymentSecondModalStyle.js';
import TossBuyPointComponent from './TossBuyPointComponent.jsx';
import 'aos/dist/aos.css'; // AOS 스타일 시트 불러오기
import { PaymentCheckoutPage } from './TossPaymentAPI.jsx';
import fetchRequest from '../fetchConfig.jsx';
const PaymentSecondModal = ({ isOpen, pointPrice, productName, discount, closeSecondModal,point,closeAllModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  // const [paymentData, setPaymentData] = useState(null); // 결제 데이터 저장
  if (!isOpen) return null;
  const amount = Number(pointPrice.replace(/,/g, '')); // 콤마를 제거하고 숫자로 변환
  // 이미지 상태 관리
  console.log(amount)
  // 이미지 클릭 핸들러
  const handleImageClick = () => {
    setIsChecked((prev) => !prev); // 기존 상태를 반전시켜 이미지 변경
  };
  // const handleTossButtonClick = async() => {
  //   console.log("point",point);
  //   try {
  //     const response = await fetchRequest('/payments/order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ amount, productName, point }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('pointPrice, productName을 보내고 받는 과정에서 오류');
  //     }
      

  //     const data = await response.json(); // 응답받은 데이터
  //     console.log("받아온 data" , data)
  //     // 응답받은 데이터를 PaymentCheckoutPage에 전달
  //     setPaymentData(data);

  //     // 결제 페이지로 리다이렉트 또는 데이터 전달
  //   } catch (error) {
  //     console.error('catch문으로 잡힌 데이터 보내고 받는 과정에서 에러', error);
  //   }
  // };
  const handleChargeRequest = async() => {
    console.log("point",point);
    try {
      const response = await fetchRequest('/auth/user/tempay/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, productName, point }),
      });

      if (!response.ok) {
        throw new Error('결제 응답에서 오류');
      }
      

      const data = await response.json(); // 응답받은 데이터
      console.log("받아온 data" , data)
      if(data.code==="PAY-003"){
        alert(data.message);
        closeSecondModal();
        closeAllModal();
      }
      else if(data.code==="GEN-000"){
        alert("충전 요청이 정상적으로 완료되었습니다.")
        closeSecondModal();
        closeAllModal();
      }
      
      // 응답받은 데이터를 PaymentCheckoutPage에 전달
      // setPaymentData(data);

      // 결제 페이지로 리다이렉트 또는 데이터 전달
    } catch (error) {
      console.error('catch문으로 잡힌 데이터 보내고 받는 과정에서 에러', error);
    }
  };
  
  return (

    <P.SecondModalWrapper data-aos="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <P.StyledDiv>포인트 구매</P.StyledDiv>
        <img src="/assets/MainPayment/closebutton.svg" alt="error" onClick={closeSecondModal} />
      </div>
      <TossBuyPointComponent pointPrice={pointPrice} productName={productName} discount={discount} />
      <P.AgreePointRule>
        <P.CheckedImg
          src={isChecked ? "/assets/MainPayment/checked-agree-button.svg" : "/assets/MainPayment/unchecked-agree-button.svg"} // 이미지 경로를 상태에 따라 변경
          onClick={handleImageClick} // 이미지 클릭 시 상태 변경
        />
        <span onClick={handleImageClick}>포인트 사용 약관 동의 &nbsp;</span>
        <P.EssentialText>필수</P.EssentialText>
        <P.ArrowImg src="/assets/MainPayment/arrow-right.svg" alt="" />
      </P.AgreePointRule>
      <img src= {isChecked ? "/assets/MainPayment/active_toss_button.svg" : "/assets/MainPayment/unactive_toss_button.svg" }
        onClick={isChecked? handleChargeRequest: undefined}
        alt='토스버튼'
      />
       {/* {paymentData && (
        <PaymentCheckoutPage
          closeSecondModal={closeSecondModal}
          amount={amount}
          orderName={productName}
          currency="KRW"
          customerKey={paymentData.data.customerKey}
          orderId={paymentData.data.orderId}
          email={paymentData.data.email}
          username={paymentData.data.username}
        />
      )} */}
    </P.SecondModalWrapper>
  );
};

export default PaymentSecondModal;
