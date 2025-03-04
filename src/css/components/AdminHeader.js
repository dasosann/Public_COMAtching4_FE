import styled from "styled-components";

const A = {};

A.HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    height: 88px;
    font-family: "Pretendard", sans-serif;
    justify-content: space-between;
    align-items: center;
    padding: 0 48px 0 48px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom:1px solid #cdcdcd ;
`
A.HeaderMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10.5em;
    white-space: nowrap;
`
A.HeaderText = styled.div`
    padding: 29.5px 0;
    font-size: 1.5em;
    font-weight: 600;
    color: #808080;
    cursor: pointer;
    border-bottom: ${(props)=>(props.isActive? "4px solid #000":"none")};
`
A.HeaderImg = styled.img`
    width: 140px;
    height: 40px;
`
A.HeaderProfile = styled.div`
    width: 182px;
    height: 50px;
    background-color: #f3f3f3;
    color: #000;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: right;
    gap: 16px;
    border-radius: 8px;
    padding: 8px 0;
    white-space: nowrap;
`
A.AlarmImg = styled.div`
    border-radius: 100%;
    background-color: #ff775e;
    font-size:10px;
    font-weight: 700;
    color: #fff;
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
A.MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "4px solid #000" : "none")};
`;

export default A;