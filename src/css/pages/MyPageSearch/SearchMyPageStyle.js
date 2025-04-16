import styled from "styled-components";
const E = {};
E.MainContainer = styled.div`
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #fffafb;
`
E.BackArrowDiv = styled.div`
    width: 100%;
    text-align: start;
    margin-top: 1.72vh;
`
E.HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.92vh;
`
E.MainSpan = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #373737;
`
E.Subspan = styled.div`
    font-size: 14px;
    color: #858585;
    font-weight: 500;
`
E.MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22.20vh;
    width: 100%;
    height: 21.05vh;
    display: flex;
    flex-direction: column;
    gap: 1.83vh;
`
E.MatchingDiv = styled.div`
    line-height: 160%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    word-break: keep-all;
`
E.HightlightSpan = styled.span`
    font-size: #ff4d61;
`
E.MatchingButtonDiv = styled.div`
    width: 136px;
    height: 38px;
    border-radius: 99px;
    padding: 16px 8px;
    background: conic-gradient(from -36.07deg at 64.06% -102.34%, #E83ABC 0deg, rgba(255, 119, 94, 0.1) 0.04deg, rgba(255, 77, 97, 0.6) 169.2deg, #E83ABC 360deg);
    color: #fff;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
`
export default E;

