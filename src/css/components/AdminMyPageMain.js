import styled from "styled-components";
const M = {};
M.MainContainer = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    text-align: left;
    flex-direction: column;
    width: calc(100% - 200px);
    background-color: #fff;
    box-shadow: 1px 1px 20px rgba(196, 196, 196, 0.3);
    padding:24px;
    border-radius: 24px;
`
M.MainWrapper = styled.div`
    background-color: #f4f4f4;
    width: 100%;
    padding: 24px 100px 24px 100px;
    height: calc(100vh - 88px);
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
`
M.MyInformText = styled.span`
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin-bottom: 8px;
`
M.AuthorityText= styled.span`
    font-size: 16px;
    color: #858585;
    font-weight: 500;
    margin-bottom: 41.5px;
`
M.DefaultText= styled.div`
    color: #828282;
    font-size: 24px;
    font-weight: 500;
`
M.AccentText= styled.span`
    color: #000;
    font-size: 24px;
    font-weight: 600;
`

M.TeamManageWrapper=styled.div` 
    display: grid;

`
M.TeamManageContainer= styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:1fr 1fr ;
    height: 250px;
    gap: 16px;
    font-family: "Pretendard", sans-serif;
    width: 100%;
`
M.TeamManageDiv =styled.div`
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: 1px 1px 20px 1px rgba(196,196,196,0.3);
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
    padding: 24px;
`
M.TeamManageTitle= styled.span`
    color: #000;
    font-weight: 700;
    font-size: 32px;
`
M.TeamManageSub=styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
`
M.AlarmImg = styled.div`
    border-radius: 100%;
    background-color: #ff775e;
    font-size:16px;
    font-weight: 700;
    color: #fff;
    width: 36px;
    height: 36px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default M;