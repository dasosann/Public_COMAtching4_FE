import React from 'react';
import Background from '../../components/Background';
import E from '../../css/pages/MyPageSearch/SearchMyPageStyle'
import { useNavigate } from 'react-router-dom';
const SearchMyPage = () => {
    const navigate = useNavigate();
    const handleBackArrow = () => {
        navigate("/login");
    };
    return (
        <E.MainContainer>
            <Background/>
            <E.BackArrowDiv>
                <img src="/assets/MainPayment/arrow-left.svg" alt="화살표" onClick={handleBackArrow}/>
            </E.BackArrowDiv>
            <E.HeaderContainer>
                <E.MainSpan>조회하기</E.MainSpan>
                <div>
                    <E.Subspan>내가 뽑은 상대들을 여기서 확인할 수 있어요.</E.Subspan>
                    <E.Subspan>용기내서 연락해보세요!</E.Subspan>
                </div>
            </E.HeaderContainer>
            <E.MainWrapper>
                <img src="/assets/character-logo.svg" alt="캐릭터" />
                <E.MatchingDiv>
                    아직 매칭된 상대가 없어요. <br/> 아직 <E.HightlightSpan>732</E.HightlightSpan>명이 겨울이오길님을 기다리고 있어요.<br/>나와 딱 맞는 이성친구를 만들어봐요!                
                </E.MatchingDiv>
                <E.MatchingButtonDiv>
                    <span>매칭하러 가기</span>
                    <img src="/assets/white-arrow.svg" alt="화살표" />
                </E.MatchingButtonDiv>
            </E.MainWrapper>

        </E.MainContainer>
    );
};

export default SearchMyPage;