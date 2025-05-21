import React from 'react';
import P from '../../css/components/AfterPaymentModalStyle';

const AccountDeleteModal = (onClose) => {
    return (
         <P.ModalOverlay>
              <P.ModalWrapper style={{height:"223px"}}>
                <P.PaymentTitle>회원 탈퇴</P.PaymentTitle>
                <P.PaymentBody>코매칭 회원을 탈퇴 시 <br/> 사용자의 포인트 및 매칭내역, 채팅내역 모두 삭제됩니다.</P.PaymentBody>
                <div style={{display:'flex',gap:'8px', width:'100%'}}>
                    <P.ConfirmButton onClick={onClose} style={{flex:'1'}}>취소</P.ConfirmButton>
                    <P.ConfirmButton  style={{flex:'1'}}>확인</P.ConfirmButton>
                </div>
              </P.ModalWrapper>
            </P.ModalOverlay>
    );
};

export default AccountDeleteModal;