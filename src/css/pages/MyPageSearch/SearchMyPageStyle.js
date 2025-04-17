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
E.BackgroundBlur = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* 흐림 효과 영역 높이 */
  z-index: 1; /* 콘텐츠 아래에 배치 */
  overflow: hidden; /* 넘치는 부분 숨김 */

  /* 첫 번째 레이어: 기본 흐림 효과 */
  background: linear-gradient(
    180deg,
    rgba(255, 250, 251, 0) 0%, /* 상단 투명 */
    rgba(255, 250, 251, 0.7) 100% /* 하단 불투명도 낮춤 */
  );
  backdrop-filter: blur(1px); /* 기본 흐림 */
  -webkit-backdrop-filter: blur(4px);
  opacity: 0.9;

  /* 두 번째 레이어: 중간 흐림 */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px; /* 중간 레이어 높이 */
    background: linear-gradient(
      180deg,
      rgba(255, 250, 251, 0) 0%,
      rgba(255, 250, 251, 0.6) 100%
    );
    backdrop-filter: blur(4px); /* 중간 흐림 */
    -webkit-backdrop-filter: blur(4px);
  }

  /* 세 번째 레이어: 하단 강한 흐림 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px; /* 하단 레이어 높이 */
    background: linear-gradient(
      180deg,
      rgba(255, 250, 251, 0) 0%,
      rgba(255, 250, 251, 0.8) 100%
    );
    backdrop-filter: blur(8px); /* 강한 흐림 */
    -webkit-backdrop-filter: blur(8px);
  }
`;
export default E;

