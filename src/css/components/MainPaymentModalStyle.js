import styled from "styled-components"
const P = {};

P.ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: ${({ show }) => (show ? 'flex' : 'none')}; /* show prop에 따라 모달을 보이게 하거나 숨기기 */
  justify-content: center;
  /* align-items: center; */
  z-index: 900; /* 다른 콘텐츠 위에 표시 */
  align-items: flex-end; /* 화면 하단에 위치하도록 */
  box-sizing: border-box;
`;
P.ModalContent = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 25px 25px 0 0;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 87%;
  padding:0px 24px 0 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  filter: ${({ isDimmed }) => (isDimmed ? 'brightness(0.7)' : 'none')};
  pointer-events: ${({ isDimmed }) => (isDimmed ? 'none' : 'auto')};
`;
// P.ModalContent = styled.div`
//   position: absolute;
//   background-color: white;
//   border-radius: 25px 25px 0 0;
//   width: 90%;
//   max-width: 500px;
//   display: flex;
//   flex-direction: column;
//   height: 87%;
//   padding: 24px 24px 0 24px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;
 

 
   /* &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); 
    z-index: 950; 
  }
`;  */
P.Header = styled.div`
    display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%;
  /* position: relative; */
  margin-bottom: 32px;
  font-family: "Pretendard", sans-serif;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
`

// 모달 닫기 버튼 스타일
P.CloseButton = styled.span`
  color: #999;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  right: 0px; /* 오른쪽 끝에 위치 */
 
`;
P.ChargePointText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #373737;
`
export default P;