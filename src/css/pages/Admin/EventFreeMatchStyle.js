import styled from "styled-components";
const E = {};
E.TitleDiv= styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
E.SubTitleDiv = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #858585;
    margin-bottom: 2px;
`
E.FlexWrapper = styled.div`
    display: flex;
    gap: 8px ;
    width: 100%;
    margin-bottom: 32px;
    align-items: center;
    
`
E.DateButton = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    height: 48px;
    border-radius: 8px;
    background-color: ${(props) => (props.isActive ? '#ff775e' : '#b3b3b3')}; /* 선택된 버튼은 녹색, 비활성은 회색 */
    box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
    cursor: pointer;
`
E.HourText = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #000;
    width: 42px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-right:16px;
`
E.MatchText = styled.div`
    display: flex;
    align-items: center;
    height: 49px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    justify-content: space-between;
`
E.MatchSpan = styled.span`
    color: #ff4d61;
`
E.ConfirmButton = styled.button`
    all: unset;
    box-sizing: border-box;
    padding:12px 42.5px ;
    width: 120px;
    height: 48px;
    border-radius: 8px;
    background-color: #dd272a;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`
E.DiscountDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    gap: 16px;
    flex-direction: column;
`
E.DiscountSecondDiv = styled.div`
    display: flex;
    color:'#4d4d4d';
    font-size:'18px';
    font-weight:'600'; 
    display:'flex';
    align-items: center;
`
E.NoticeInput = styled.input`
    all: unset;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    width: 100%;
    height: 47px;
    border-radius: 4px;
    border: 1px solid #979797;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.25 );
    font-size: 24px;
    font-weight: 500;
    color:#4d4d4d;
    padding: 9px 24px;
`
E.ContentInput = styled.textarea`
    all: unset;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    width: 100%;
    height: 47px;
    border-radius: 4px;
    border: 1px solid #979797;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.25 );
    font-size: 24px;
    font-weight: 500;
    color:#4d4d4d;
    padding: 9px 24px;
    height: 200px;
    text-align: center;
`
export default E;
