import styled from "styled-components";

const T = {};
T.Container = styled.div`
    width: 100%;
    height: 96px;
    background-color: #f5f5f5;
    padding: 16px;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    color: #4d4d4d;
    margin-top : 16px;
    border-radius: 16px;
    font-weight: 600;
`
T.BonusText = styled.span`
    color: #ff4d61;
    font-size: 12px;
  
`
T.PaymentPriceText = styled.div`
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 600;
    text-align: right;
    margin-top: 16px;
`
T.PriceText = styled.span`
    font-weight: 700;
`



export default T;