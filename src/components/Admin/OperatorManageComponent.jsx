import React from 'react';
import M from '../../css/components/MasterManageComponentStyle';
const OperatorManageComponent = () => {
    return (
        <M.MasterContainer>
            <M.EachContainer>
                <M.TitleText>가입자 검색 및 관리</M.TitleText>
                <M.ContentText>결제내역 및 포인트 사용내역 열람, 포인트 조정, 블랙리스트 추가</M.ContentText>
            </M.EachContainer>
            <M.EachContainer>
                <M.TitleText>가입자 성비 분석</M.TitleText>
                <M.ContentText>가입자의 성비 분석</M.ContentText>
            </M.EachContainer>
            <M.EachContainer>
                <M.TitleText>문의 및 신고목록</M.TitleText>
                <M.ContentText>가입자로부터 온 문의와 신고 열람</M.ContentText>
            </M.EachContainer>
            <M.EachContainer>
                <M.TitleText>블랙리스트 확인 및 해제</M.TitleText>
                <M.ContentText>블랙리스트 조회와 해제</M.ContentText>
            </M.EachContainer>
            
        </M.MasterContainer>
    );
};

export default OperatorManageComponent;