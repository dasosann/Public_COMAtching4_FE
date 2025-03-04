import React, { useEffect, useState } from 'react';
import MyPointCharge from './MyPointCharge';
import C from '../css/components/PointChargeListModalStyle';
import P from '../css/components/MainPaymentModalStyle';
import MyPointChargeWithoutChargeList from './MyPointChargeWithoutChargeList';
import PointInformationFooter from './PointInformationFooter';
import EachChargeListComponent from './EachChargeListComponent';

// ISO 형식의 날짜를 "YYYY-MM-DD HH:mm" 형식으로 변환하는 함수
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const formatAmount = (amount) => {
    return amount.toLocaleString();
  };
  
const PointChargeListModal = ({ isOpen, onClose, closeAllModal }) => {
  const handleClose = () => {
    onClose();
    closeAllModal();
  };

  // 백엔드에서 받아온 결제 내역 데이터를 저장할 상태
  const [chargeHistory, setChargeHistory] = useState([]);

  useEffect(() => {
    fetch('http://13.124.46.181:8080/payments/history')
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        return response.json();
      })
      .then((result) => {
        // 백엔드 응답이 {status, code, data} 형식이므로 data 프로퍼티를 사용
        if (result.status === 200 && result.data) {
          setChargeHistory(result.data);
        } else {
          console.error('유효하지 않은 응답입니다:', result);
        }
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  return (
    <C.ChargeListModalWrapper>
      <C.Header>
        <C.BackButton onClick={onClose} src='/assets/MainPayment/arrow-left.svg' />
        <P.ChargePointText>충전 내역</P.ChargePointText>
        <P.CloseButton onClick={handleClose}>닫기</P.CloseButton>
      </C.Header>
      <MyPointChargeWithoutChargeList />
      <div style={{ overflow: "auto", height: '400px', marginTop: '23px' }}>
        {chargeHistory && chargeHistory.length > 0 ? (
          chargeHistory.map((item, index) => (
            <EachChargeListComponent
              key={index}
              productName={item.productName}
              orderStatus={item.orderStatus}
              amount={formatAmount(item.amount)}
              date={formatDateTime(item.approvedAt)}  // "YYYY-MM-DD HH:mm" 형식으로 변환하여 전달
              status={item.cancelReason}
              tossPaymentMethod={item.tossPaymentMethod}
            />
          ))
        ) : (
          <p>충전 내역이 없습니다.</p>
        )}
      </div>
      <PointInformationFooter />
    </C.ChargeListModalWrapper>
  );
};

export default PointChargeListModal;
