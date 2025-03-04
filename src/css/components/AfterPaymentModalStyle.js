import styled from "styled-components";

const P = {};


P.ModalWrapper = styled.div`
  z-index: 999; /* 다른 콘텐츠 위에 표시 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  background-color: white;
  border-radius: 16px;
  width: calc(100% - 46px);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
  align-items: center;
`
P.PaymentTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 32px;
`
P.PaymentBody= styled.div`
  font-size: 16px;
  color: #4d4d4d;
  font-weight: 500;
  margin-bottom: 32px;
`
P.ConfirmButton = styled.button`
  background-color: #1a1a1a;
  color:#fff ;
  width: calc(100% - 32px);
  height: 48px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 20px;
`
P.ErrorImage= styled.img`
  margin-bottom: 19px;
`
export default P;