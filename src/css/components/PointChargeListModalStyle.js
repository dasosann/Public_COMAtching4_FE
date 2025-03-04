import styled from "styled-components";

const C = {};

C.ChargeListModalWrapper =styled.div`
  z-index: 999; /* 다른 콘텐츠 위에 표시 */
  position: absolute;
  background-color: white;
  border-radius: 25px 25px 0 0;
  width: 87%;
  max-width: 500px;
  display: flex;
  height: 87%;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  font-family: "Pretendard", sans-serif;
`
C.Header = styled.div`
    display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%;
  position: relative;
  margin-bottom: 32px;
  font-family: "Pretendard", sans-serif;
  z-index: 1;
`
C.BackButton = styled.img`
    position: absolute;
    left: 0;
`

export default C;