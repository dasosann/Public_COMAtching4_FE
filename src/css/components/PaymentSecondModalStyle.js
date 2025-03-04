import styled from "styled-components";
const P ={};
P.SecondModalWrapper =styled.div`
  z-index: 999; /* 다른 콘텐츠 위에 표시 */
  position: absolute;
  background-color: white;
  border-radius: 25px 25px 0 0;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 64px 24px;
  font-family: "Pretendard", sans-serif;

`
P.StyledDiv = styled.div`
    font-size: 20px;
    font-weight: 700;
`
P.AgreePointRule = styled.div`
    display: flex;
    align-items: center;
    color:#000;
    font-size: 16px;
    font-weight: 700;
    position: relative;
    margin-top: 24px;
    margin-bottom: 32px;
`
P.EssentialText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #999;
`
P.CheckedImg = styled.img`
  margin-right: 12px;
  cursor: pointer;
`

P.ArrowImg = styled.img`
  position: absolute;
  right:0px ;
  top: 8px;
`
export default P;