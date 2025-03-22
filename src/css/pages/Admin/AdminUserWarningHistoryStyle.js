import styled from "styled-components";

const W = {};
W.WarningTitle= styled.div`
    font-size: 32px;
    font-weight: 700;
`
W.WarningSubTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
`
W.WarnComponentWrapper = styled.div`
    display: flex;
    gap: 16px;
    height: 95px;
    align-items: center;
    border-bottom: 1px solid #808080;
`
W.DefaultText= styled.div`
    width: 160px;
    height: 29px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    text-align: center;
`
W.TimeText= styled.div`
    color: #828282;
    font-size: 24px;
    font-weight: 500;
`


export default W;