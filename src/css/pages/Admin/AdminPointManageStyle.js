import styled from "styled-components";
const M = {};
M.TitleDiv= styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
M.SubTitleDiv = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
    margin-bottom: 42px;
`
M.NickNameDiv= styled.div`
    height: 32px;
    font-size: 24px;
    color:#828282;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
`
M.AvailablePointDiv= styled.div`
    font-size: 24px;
    color:#828282;
    font-weight: 600;
    display: flex;
    align-items: center;
`
M.NickNameSpan = styled.span`
    font-size: 24px;
    font-weight: 600;
    color: #000;
`
M.ImgDiv = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`
M.ManagePointWrapper = styled.div`
    height: 39px;
    display: flex;
    align-items: center;
    font-size:24px;
    font-weight: 600;
    color: #000;
    margin-top: 8px;
    gap: 12px;
`
M.PointManageInput= styled.input`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 9px 0px;
    width: 131px;
    height: 39px;
    background: #FFFFFF;
    border: 1px solid #979797;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-shadow: ${(props)=>props.adjustedPoints === 0 ? "inset 2px 2px 4px rgba(0, 0, 0, 0.25)" : "0px 0px 8px rgba(0,0,0,0.1)"};
    border-radius: 4px;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    background-color: ${(props) =>
        props.adjustedPoints === 0
            ? "fff"  // points가 0일 때 배경색을 #fff로 설정
            : props.isActive
            ? "#ff775e"  // 양수일 때 배경색
            : "#0088a1"}; // 음수일 때 배경색
    &::placeholder{
        font-size: 18px;
        color: #999;
        font-weight: 600;
    }
`
M.ControlPointButton = styled.img`
    cursor: pointer;
`
M.ManagePointResult = styled.div`
    display: flex;
    align-items: center;
    font-size:24px;
    font-weight: 600;
    color: #000;
    height: 47px;
    gap: 24px;
`
M.ManageReason = styled.input`
    all: unset;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #979797;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.25);
    border-radius: 4px;
    height: 47px;
    padding: 9px 24px;
    font-size: 24px;
    font-weight: 500;
    color: #4d4d4d;
`
M.SubmitButton = styled.button`
    width: 120px;
    height: 48px;
    border-radius: 8px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    background-color: ${(props)=>props.isActive ? "#d91329" : "#999"};
    margin-left: auto;
`   
export default M;


