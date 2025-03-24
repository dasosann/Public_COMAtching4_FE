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

P.ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px 0px;
    border-bottom : 1px solid #808080;
`
P.PaymentStatusDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 100px;
`
P.Circle = styled.div`
    border-radius: 100%;
    background-color: ${(props)=>props.backgroundColor};
    width: 24px;
    height: 24px;
`
P.StatusText = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: ${(props)=>props.color};
`
P.DateText =styled.div`
    width: 242px;
    color: #828282;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-left: 16px;
    justify-content: center;
`
P.OrderNumberText = styled.div`
    color: #828282;
    font-size: 24px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-left: 64px;
`
P.ComponentSecondDiv = styled.div`
    height: 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
P.DefaultSpan = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #000;
    
`
export default P;