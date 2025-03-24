import styled from "styled-components";

const S = {};
S.TitleDiv = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`

S.NickNameDiv = styled.div`
    height: 29px;
`
S.TitleSpan = styled.span`
    color: #828282;
    font-size: 24px;
    font-weight: 500;
`
S.NameSpan= styled.span`
    color: #000;
    font-size: 24px;
    font-weight: 600;
`
S.EmailSpan = styled.span`
    color: ${({isBlacklisted})=>(isBlacklisted ? '#D91329' : '#828282')};
    font-weight: 700;
    font-size: 24px;
`
S.EmailDiv =styled.div`
    height: 48px;
    display: flex;
    align-items: center;
`
S.NicknameAndGenderDiv =styled.div`
    height: 32px;
    display: flex;
    align-items: center;
`
S.DropDownContainer = styled.div`
    position: relative;
    width: 280px;
    border-bottom: 1px solid #b3b3b3;
    height: 48px;
    display: flex;
    align-items: center;
    z-index: 999;
`
S.SendWarningDiv = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
`
S.ToggleButton = styled.button`
   width: 280px;
    color: #b3b3b3;
    font-size: 18px;
    font-weight: 600;
    /* border-bottom: 1px solid #b3b3b3; */
    display: flex;
    padding: 0 8px 0 8px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: none;
    border-radius: 0;
`;

S.MenuList = styled.ul`
  position: absolute;
  top: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
  overflow-y: auto;
  z-index: 100;
`;

S.MenuItem = styled.li`
  width: 280px;
  height: 48px;
  color: #4d4d4d;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #b3b3b3;
  background-color: #f8f8f8f8;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  &:first-child {
    border-top: 1px solid;
  }
`;
S.Text= styled.span`
    font-size: 24px;
    font-weight: 600;
    color: #000;
`
S.DirectInput = styled.input`
    all: unset;
    width: 280px;
    height: 48px;
    box-sizing: border-box;
    padding: 13.5px 0px;
    color: #b3b3b3;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, rgba(248, 248, 248, 0.24) 100%);
    border-bottom: 1px solid #b3b3b3 ;
    backdrop-filter: blur(50px);
    text-align: center;
`
S.SendWarnButton = styled.div`
    width: 120px;
    height: 48px;
    background-color: #dd272a;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
S.WarningComponentDiv= styled.div`
    display: flex;
    gap:16px;
    width: 100%;
`
S.PreviewWaringDiv= styled.div`
    height: 191px;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align:center;
`
S.PreviewWaringP =styled.span`
    color: #000;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: -3px;
`
S.ButtonContainer =styled.div`
    width: 100%;
     display: flex;
     justify-content: space-between;
     border-top:1px solid #b3b3b3;
`
S.StyledButton =styled.button`
    cursor:default ;
    border: none;
    flex: 1;
    background-color: #fff;
    border-radius: 0px;
    color:#ff775e;
    height: 56px;
`
S.StyledDiv= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    box-sizing: border-box;
`
S.SubText =styled.div`
    font-weight: 500;
    color: #858585;
    font-size: 20px;
`
S.ButtonWrapper =styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
`
S.WarnButton =styled.button`
    flex: 1;
    height: 48px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
`
export default S;
