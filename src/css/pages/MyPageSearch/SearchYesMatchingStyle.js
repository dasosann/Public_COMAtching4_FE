import styled, { keyframes } from "styled-components";

const Y = {};
Y.SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1.83vh 0;
`;
Y.SearchInput = styled.input`
    all: unset;
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 16px 11px;
    background-color: rgba(179,179,179,0.1);
    border-radius: 12px;
    border : 1px solid #dfdfdf;
    font-size: 12px;
    color: #999;
    font-weight: 500;
    text-align: start;
`
Y.SearchIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
Y.CardWrapper= styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
Y.SortDiv = styled.div`
    display: flex;
    height: 16px;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    gap: 5px;
    justify-content: end;
    align-items: center;
    margin-bottom: 1.83vh;
`
Y.SortImg = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
`
Y.ModalOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

Y.ModalContent = styled.div`
  background: #fff;
  padding: 24px 24px 48px 24px ;
  border-radius: 32px 32px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items:start;
  justify-content: center;
  margin-top: auto; /* 모달을 하단에 붙임 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out forwards; /* 애니메이션 추가 */

  @keyframes slideUp {
    from {
      transform: translateY(100%); /* 모달이 화면 하단 밖에서 시작 */
    }
    to {
      transform: translateY(0); /* 모달이 제자리로 이동 */
    }
  }
`;
Y.SortOption = styled.button`
  text-align: start;
  width: 100%;
  position: relative;
  padding: 14px 16px;
  background-color: ${props => (props.isActive ? '#f2f2f2' : '#fff')}; /* 활성화 시 더 진한 회색 */
  border: none;
  border-radius: 16px;
  font-size: 14px;
  color: ${props => (props.isActive ? '#1a1a1a' : '#999')}; /* 활성화 시 더 진한 회색 */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.isActive ? '#d0d0d0' : '#e0e0e0')};
  }
`;
Y.CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  width: 100%;
  height: 52px;
  color: #1a1a1a;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #999;
  }
`;
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;
Y.CheckIcon = styled.img`
  position: absolute;
  top: 15.5px;
  right: 16px;
  width: 16px;
  height: 16px;
  display: ${props => (props.isActive ? 'block' : 'none')}; /* 활성화 시에만 표시 */
`;
Y.MessageContainer = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: column;
  align-items: center;
`
Y.MoveText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #808080;
  line-height: 160%;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`
Y.MatchingButton = styled.div`
  cursor: pointer;
  width: 136px;
  height: 38px;
  background: conic-gradient(from -36.07deg at 64.06% -102.34%, #E83ABC 0deg, rgba(255, 119, 94, 0.1) 0.04deg, rgba(255, 77, 97, 0.6) 169.2deg, #E83ABC 360deg);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-top: 16px;
  margin-bottom: 50px;
`

export default Y;