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
  align-items: center;
  &:first-child {
    border-top: 1px solid;
  }
`;
export default S;