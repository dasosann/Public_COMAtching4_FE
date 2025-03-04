import styled from "styled-components";
const W ={};

W.TitleText= styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
W.SubText =styled.div`
    font-size:20px;
    font-weight: 500;
    color: #858585;
`
W.NumInput = styled.input`
    width: 64px;
    height: 64px;
    background-color: rgba(229,229,229,1);
    font-size: 36px;
    font-weight: 500;
    color: #000;
    border-radius: 16px;
    padding: 10px;
    text-align: center;
    border: none;
    @media (max-width: 480px) {
    width:32px; /* 더 작은 화면에서는 padding을 더 줄임 */
    height: 32px;
    border-radius: 5px;
    font-size: 18px;
}
`
W.TimeText =styled.span`
    font-size: 24px;
    color: #858585;
    font-weight: 500;
    font-family: "Pretendard", sans-serif;
`
W.ResendButton = styled.button`
    width: 90px;
    height: 48px;
    background-color:rgba(255,119,94,1) ;
    color:#fff;
    font-size: 20px;
    font-weight: 700;
    border-radius: 8px;
`
W.FlexDiv =styled.div`
    display: flex;
    gap: 32px;
    align-items: center;
    align-self: flex-end;
    margin-top: 30px;
`
W.LeftTimeText = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: rgba(102,102,102,1);
    align-self: flex-end;
`
export default W;