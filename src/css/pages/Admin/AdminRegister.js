import styled from "styled-components";


const R = {};
R.TitleText = styled.span`
    color: #000;
    font-weight: 700;
    font-size:32px ;
`
R.SubText= styled.span`
    color:#858585;
    font-weight: 500;
    font-size: 16px;
`
R.InputTitle = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 600;
    width:100%;
    height:24px;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    display: flex;
    align-items: center;
`
R.InputBox= styled.input`
    font-family: "Pretendard", sans-serif;
    border: none;
    border-bottom:1px solid rgb(179,179,179)  ;
    outline: none;
    padding: 14.5px 8px;
    font-size: 16px;
    color: #000;
    height: 48px;
    width: 100%; /* 부모 크기를 초과하지 않도록 설정 */
    max-width: 100%;
    &::placeholder{
        color: rgb(179,179,179);
        font-weight:600 ;
    }
`
R.InputWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.3);
  width: ${(props) => props.width || "100%"};  /* 기본값 100% */
  height: ${(props) => props.height || "auto"}; /* 기본값 auto */
  box-shadow: 1px 1px 20px 1px rgba(196,196,196,0.3);
  display: grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(3,1fr);
  justify-content: center;
  text-align: left;
  padding: 24px 120px 24px 24px;
  box-sizing: border-box;
  gap: 40px 56px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr)); /* 태블릿에서는 2열 */
    gap: 20px;
    padding: 24px;

  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 모바일에서는 1열 */
    gap: 16px;
    padding: 24px;
    padding-bottom: 70px;
  }
`;
R.SelectBox = styled.select`
    box-sizing: border-box;
    padding: 13.5px 8px;
    font-size: 18px;
    color: #b3b3b3;
    background-color: linear-gradient(180deg, rgba(248, 248, 248, 0.08) 0%, rgba(248, 248, 248, 0.219653) 24.94%, rgba(248, 248, 248, 0.284119) 36.45%, rgba(248, 248, 248, 0.421646) 61.01%, rgba(248, 248, 248, 0.64) 100%);
    cursor: pointer;
    outline: none;
    border: none;
    max-width: 100%;
    border-bottom:1px solid #b3b3b3 ;
    backdrop-filter: blur(50px);
    text-align: left;
    text-align-last: left;
    
    &:focus {
      color: #000;
    }
    &:hover{
      background-color: linear-gradient(180deg, rgba(248, 248, 248, 0.08) 0%, rgba(248, 248, 248, 0.219653) 24.94%, rgba(248, 248, 248, 0.284119) 36.45%, rgba(248, 248, 248, 0.421646) 61.01%, rgba(248, 248, 248, 0.64) 100%);

    }

    option {
        font-size: 18px;
        background-color: #f4f4f4;
        font-weight: 600;
        color: rgb(77,77,77);
        width: 100%;
        height: 48px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px solid #b3b3b3;
    }
`;

export default R;

