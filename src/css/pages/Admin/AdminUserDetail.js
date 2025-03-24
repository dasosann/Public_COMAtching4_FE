import styled from "styled-components";

const S = {};
S.TitleDiv = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
S.SortTextDiv = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
`
S.SortSearchDiv = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    height: 81px;
`
S.FunctionButton = styled.button`
    background-color: #ff775e;
    background-color: ${({isBlacklisted})=>(isBlacklisted ? "#1a1a1a":'#ff775e')};
    box-sizing: border-box;
    padding: 12px 10px;
    height: 48px;
    border-radius: 8px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border: none;
    display: flex;
    align-items: center;
`
S.SearchInput = styled.input`
    all: unset;    
    border-bottom: 1px solid #999;
    width: 347px;
    height: 53px;
    text-align: center;
    color: #808080;
    font-size: 24px;
    font-weight: 600;
    ::placeholder{
        font-size: 24px;
        font-weight: 600;
        color: #b3b3b3;
    }
`
S.SearchImgDiv=styled.div`
    width: 48px;
    height: 48px;
    padding: 10.51px 7.02px 2.51px 6px;
    cursor: pointer;
`
S.SearchImg=styled.img`
    width: 35px;
    height: 35px;
`
S.UserComponentWrapper = styled.div`
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #808080;
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
S.DetailButton = styled.button`
    all: unset;
    width: 129px;
    height: 48px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    background-color: #ff775e;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    padding: 12px 10px;
    box-sizing: border-box;
    cursor: pointer;
`
S.PageSlicingDiv = styled.div`
    display: flex;
    gap: 16px;
`
S.PageButton =styled.button`
    all: unset;
    box-sizing: border-box;
    background-color: ${props=>props.isActive ? '#ff775e' : '#fff'};
    border-radius: 12px;
    width: 48px;
    height: 48px;
    font-size:24px;
    font-weight: 700;
    color: ${props=>props.isActive ? '#fff' : '#d9d9d9'};
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
`
S.ButtonWrapper= styled.div`
    display: flex;
    justify-content:  flex-end;
    gap: 32px;
`
S.SubText=styled.div`
    font-size: 16px;
    color: #858585;
    font-weight: 500;
`
S.SecondAdminDivWrapper= styled.div`
    display: flex;
    gap: 16px;
`
S.BlackListText= styled.span`
    font-size: 20px;
    font-weight: 600;
    color: #D91329;
    margin-left: 8px;
`   
S.Overlay = styled.div`
  position: absolute;      /* MainWrapper 기준으로 배치하기 위해 absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;           /* 헤더보다 위로 올리되, MainWrapper 안에서만 적용 */
`;

S.ModalContainer = styled.div`
  width: 423px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  box-shadow: 1px 1px 20px rgba(196,196,196,0.3);
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  align-items: center;
`;
S.ModalContent = styled.div`
    height: 190px;
    border-bottom: 1px solid #b3b3b3;
    font-size: 24px;
    font-weight: 400;
    color: #000;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`
S.ModalConfirm = styled.div`
    height: 56px;
    color: #ff775e;
    font-size: 20px;
    font-weight: 500;
    align-items: center;
    display: flex;
    cursor: pointer;
`
export default S;