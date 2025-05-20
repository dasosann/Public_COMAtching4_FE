import React, { useState } from 'react';
import P from '../css/components/PaymentSecondModalStyle.js';
import TossBuyPointComponent from './TossBuyPointComponent.jsx';
import 'aos/dist/aos.css';
import fetchRequest from '../fetchConfig.jsx';
import PersonalInfoAgreementModal from '../pages/PersonalInfoAgreementModal.jsx';

const PaymentSecondModal = ({ isOpen, pointPrice, productName, discount, closeSecondModal, point, closeAllModal, realName: initialRealName }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [realName, setRealName] = useState(initialRealName || '');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!isOpen) return null;

  const amount = Number(pointPrice.replace(/,/g, ''));

  // 체크박스 클릭 핸들러
  const handleImageClick = () => {
    setIsChecked((prev) => !prev);
  };

  // 이름 입력 핸들러
  const handleNameChange = (e) => {
    setRealName(e.target.value);
  };

  // 모달 열기 핸들러
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 결제 요청 핸들러
  const handleChargeRequest = async () => {
    if (!isChecked && !realName.trim()) {
      alert('약관에 동의하고 입금자 이름을 입력해주세요.');
      return;
    }
    if (!isChecked) {
      alert('약관에 동의해주세요.');
      return;
    }
    if (!realName.trim()) {
      alert('입금자 이름을 입력해주세요.');
      return;
    }

    try {
      const response = await fetchRequest('/auth/user/tempay/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, productName, point, realName }),
      });

      if (!response.ok) {
        throw new Error('결제 응답에서 오류');
      }

      const data = await response.json();
      if (data.code === 'PAY-003') {
        alert(data.message);
        closeSecondModal();
        closeAllModal();
      } else if (data.code === 'GEN-000') {
        alert('충전 요청이 정상적으로 완료되었습니다.');
        closeSecondModal();
        closeAllModal();
      }
    } catch (error) {
      console.error('catch문으로 잡힌 데이터 보내고 받는 과정에서 에러', error);
    }
  };

  return (
    <>
      <P.SecondModalWrapper data-aos="fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <P.StyledDiv>포인트 구매</P.StyledDiv>
          <img src="/assets/MainPayment/closebutton.svg" alt="close" onClick={closeSecondModal} />
        </div>
        <TossBuyPointComponent pointPrice={pointPrice} productName={productName} discount={discount} />
        <P.AgreePointRule>
          <P.CheckedImg
            src={isChecked ? '/assets/MainPayment/checked-agree-button.svg' : '/assets/MainPayment/unchecked-agree-button.svg'}
            onClick={handleImageClick}
          />
          <span onClick={handleImageClick}>포인트 사용 약관 동의 </span>
          <P.EssentialText>&nbsp;&nbsp;필수</P.EssentialText>
          <P.ArrowImg onClick={openModal} src="/assets/MainPayment/gray-arrow-right.svg" alt="view agreement" />
        </P.AgreePointRule>
        <P.NameButton isChecked={isChecked}>
          <P.NameInput
            type="text"
            value={realName}
            onChange={handleNameChange}
            placeholder="입금자명"
          />
          <span onClick={handleChargeRequest}>(으)로 결제 요청 보내기 </span>
        </P.NameButton>
      </P.SecondModalWrapper>
      <PersonalInfoAgreementModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default PaymentSecondModal;