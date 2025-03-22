import styled from "styled-components";
const Modal = {};

Modal.Overlay = styled.div`
  position: absolute;      /* MainWrapper 기준으로 배치하기 위해 absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(112, 107, 107, 0.25); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;           /* 헤더보다 위로 올리되, MainWrapper 안에서만 적용 */
`;

Modal.ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
  width: 423px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px 1px 20px rgba(196,196,196,0.3);
  box-shadow: 1px 1px 20px 1px rgba(196, 196, 196, 0.3);
  align-items: center;
`;
Modal.ModalContent = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid #b3b3b3;
    font-size: 24px;
    font-weight: 400;
    color: #000;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 56px 40px 48px 40px;
`
Modal.ModalConfirm = styled.div`
    width: 100%;
    height: 56px;
    color: #ff775e;
    font-size: 20px;
    font-weight: 500;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
`
Modal.ModalConfirmButton = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
`

export default Modal;
