import styled from "styled-components";

const N = {};

N.MainContainer = styled.div`
    box-sizing: border-box;
    padding: 0px 24px;
    width: 100%;
`
N.TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.9vh;
    align-items:center;
    margin-top: 1.9vh;
`
N.TitleDiv = styled.div`
    width: 100%;
    height: 24px;
    font-weight: 700;
    font-size: 20px;
    color: #373737;
`
N.SubTitleDiv = styled.div`
    width: 100%;
    height: 17px;
    font-weight: 500;
    font-size: 14px;
    color: #858585;
`
N.MenuWrapper= styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 2.74vh;
`
N.MenuTag = styled.div`
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    border-radius: 99px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${({isActive})=>(isActive ? 'none' : '1px solid #b3b3b3')};
    background-color: ${({isActive})=>(isActive ? '#1a1a1a' : "none")};
    color: ${({isActive})=>(isActive ? '#fff' : "#808080")};
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease; /* 부드러운 전환 효과 */
`
export default N;