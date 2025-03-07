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
S.SortButton = styled.button`
    box-sizing: border-box;
    padding: 12px 10px;
    width: 120px;
    height: 48px;
    border-radius: 8px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border: none;
    background-color: ${({isSelected})=>(isSelected ? '#ff7752':'#999')};
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
    color: #828282;
    font-weight: 700;
    font-size: 24px;
`
S.EmailDiv =styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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


export default S;