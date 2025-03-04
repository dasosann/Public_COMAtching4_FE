    import React from 'react';
    import P from '../css/components/PointInformationFooterStyle';
    const PointInformationFooter = () => {
        return (
            <P.StyledDiv style={{marginTop:'23px'}}>
                <span>이용 안내</span>
                    <li>충전된 포인트의 소멸시효 기한은 충전 후 5년입니다.</li>
                    <li>1포인트는 1원입니다.</li>
                    <li>포인트는 이벤트 포인트 먼저 사용되고, 유상 포인트가 사용됩니다. 이벤트 포인트는 유효기간이 임박한 순으로 먼저 사용됩니다.</li>
                    <li>기타 등등...</li>
                <P.BusinessInformation>대표이사 천승환 | 호스팅서비스사업자 코매칭 | 사업자 등록번호 843-27-01742 | 통신판매신고 2024-부천원미-2812 | 대표전화 010-3039-7387 | 경기도 부천시 조마루로 366번길 27, 401호</P.BusinessInformation>
            </P.StyledDiv>
        );
    };

    export default PointInformationFooter;