import styled from "styled-components";
const P = {};
P.PaymentTitle = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
    width: 100%;
    text-align: left;
`
P.SubText=  styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
    width: 100%;
    text-align: left;
    margin-bottom: 42px;
`
P.PaymentHistoryDiv= styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px ;
`
export default P;