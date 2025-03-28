import React, { useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import styled from 'styled-components';

const R = {};
R.Titlediv = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #000;
`
R.SubDiv = styled.div`
    width: 100%;
    height:92px;
    font-size: 20px;
    font-weight: 400;
    color: #666;
    display: flex;
    align-items: center;
`
R.LeftSpan = styled.span`
    font-weight: 700;
    color: #4d4d4d;
`
R.CancelSpan = styled.span`
    font-weight: 500;
    color: #d91329;
`
R.SecondDiv= styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`
R.SecondText= styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #858585;
`
R.TitleCancelText = styled.span`
    color:#d91329 ;
`
const NoticeRegisterComplete = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{paddingTop:'26px', cursor:'default', gap:'10px'}}>
                    <R.Titlediv>공지사항 등록 완료 안내</R.Titlediv>
                    <R.SubDiv>
                    <div>
                        공지사항 등록을 완료하였습니다.<br/>
                        공지사항 예약 내역은 좌측 하단 이벤트 예약목록에서 열람하거나 <R.CancelSpan>취소</R.CancelSpan>할 수 있습니다.<br/>
                        과거 공지 내역은 우측 하단 공지사항 히스토리를 참고해 주십시오.
                    </div>
                    </R.SubDiv>
                </AdminDiv>
                <R.SecondDiv>
                    <AdminDiv style={{paddingTop:'26px', paddingBottom:'26px'}}>
                        <R.Titlediv>공지사항 예약목록 및 <R.TitleCancelText>취소</R.TitleCancelText></R.Titlediv>
                        <R.SecondText>공지사항 예약 내역 및 취소</R.SecondText>
                    </AdminDiv>
                    <AdminDiv style={{paddingTop:'26px',paddingBottom:'26px'}}>
                        <R.Titlediv>공지사항 히스토리</R.Titlediv>
                        <R.SecondText>과거 공지 내역</R.SecondText>
                    </AdminDiv>
                </R.SecondDiv>
            </MainWrapper>
        </div>
    );
};

export default NoticeRegisterComplete;