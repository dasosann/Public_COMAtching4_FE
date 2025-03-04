import styled from "styled-components";

export const MainWrapper = styled.div`
  background-color: #f4f4f4;
  padding: 24px max(5vw,20px);
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  display: flex;
  min-height: calc(100vh - 88px);
  width: 1920px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 1;
  @media (max-width: 768px) {
  padding: 16px 5vw; /* 모바일에서는 padding을 줄임 */
  width: 768px;
  
}
@media (max-width: 480px) {
  padding: 12px 4vw; /* 더 작은 화면에서는 padding을 더 줄임 */
  width: 480px;
}

`;
export const AdminDiv = styled.div`
  background-color: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.3);
  width: ${(props) => props.width || "100%"};  /* 기본값 100% */
  height: ${(props) => props.height || "auto"}; /* 기본값 auto */
  box-shadow: 1px 1px 20px 1px rgba(196,196,196,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 24px 0 24px 24px;
  box-sizing: border-box;
  font-family: "Pretendard", sans-serif;
  gap: 8px;
  @media (max-width:768px){
    justify-content: normal;
  }
`;




