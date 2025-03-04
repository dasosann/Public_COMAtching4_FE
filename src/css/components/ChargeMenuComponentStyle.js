import styled from "styled-components";
const C = {};
C.Container = styled.div`
    display: flex;
    width: 100%;
    height: 72px;
    justify-content: space-between;
    align-items: center;
    font-family: "Pretendard", sans-serif;
    
`
C.StyledDiv = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
`
C.StyledButton = styled.button`
    width: 96px;
    height: 40px;
    padding: 0;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    background-color: #ff4d61;
    font-family: "Pretendard", sans-serif;

`

C.BonusText = styled.span`
    color: #ff4d61;
    font-size: 10px;

`
export default C;