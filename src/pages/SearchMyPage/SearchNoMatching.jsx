import React from 'react';
import E from '../../css/pages/MyPageSearch/SearchMyPageStyle';
const SearchNoMatching = () => {
    return (
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
    );
};

export default SearchNoMatching;