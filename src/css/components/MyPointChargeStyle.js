import styled from "styled-components";

const M = {};

M.Container = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    height: 80px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    border-radius: 8px;
    gap: 16px;
    font-family: "Pretendard", sans-serif;
    /* position: sticky;
    top: 56px;
    z-index: 1; */
`
M.HoldPoint = styled.div`
    font-size: 12px;
    color: #999;
    font-weight: 600;
`
M.MyHoldPoint = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;
`
M.MyChargeListText= styled.span`
    font-size: 12px;
    font-weight: 600;
    color: #999;
    margin-left: auto;  /* 오른쪽 정렬을 위한 추가 */
    margin-top: auto;
`
export default M;