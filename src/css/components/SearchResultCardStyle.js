import styled from "styled-components";

const C = {};
C.ProfileContainer = styled.div`
    width: 100%;
    height: 203px;
    display: flex;
    flex-direction: column;
`
C.InformationContainer = styled.div`
    box-sizing: border-box;
    height: 161px;
    width: 100%;
    padding: 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px ;
    backdrop-filter: blur(50px);
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #e5e5e5;
    clip-path: polygon(
    16px 0, /* 상단 좌측 모서리 제외 */
    calc(100% - 16px) 0, /* 상단 우측 모서리 제외 */
    100% 16px, /* 우측 상단 모서리 제외 */
    100% calc(100% - 16px), /* 우측 하단 모서리 제외 */
    calc(100% - 16px) 100%, /* 하단 우측 모서리 제외 */
    16px 100%, /* 하단 좌측 모서리 제외 */
    0 calc(100% - 16px), /* 좌측 하단 모서리 제외 */
    0 16px /* 좌측 상단 모서리 제외 */
    );
`
C.NameDiv  = styled.div`
    height: 20px;
    text-align: start;
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`
C.AgeAndMajorWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 27px;
    gap: 28px;
    text-align: start;
`
C.AgeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 24px;
    justify-content: center;

`
C.MajorWrapper = styled(C.AgeWrapper)`
    width: 160px;
`
C.GraySpan = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: #666;
`
C.BlackSpan = styled.span`
    color: #1a1a1a;
    font-size: 13px;
    font-weight: 600;
`
C.HobbyWrapper = styled(C.AgeWrapper)`
    width: 100%;
    text-align: start;
    gap: 8px;
`
C.HobbyButton = styled.div`
    padding: 10.5px 7px;
    background: rgba(179, 179, 179, 0.1);
    border: 0.875px solid #DFDFDF;
    box-sizing: border-box;
    height: 28px;
    font-size: 12px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 86px;
`
C.HobbyButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap; /* 버튼이 길어지면 다음 줄로 넘어감 */
  gap: 4px;
`;


export default C;


