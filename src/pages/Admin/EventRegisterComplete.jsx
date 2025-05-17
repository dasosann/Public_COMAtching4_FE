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
    height:116px;
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
    color: #4d4d4d;
`
R.TitleCancelText = styled.span`
    color:#d91329 ;
`
const EventRegisterComplete = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{paddingTop:'26px', cursor:'default'}}>
                    <R.Titlediv>이벤트 등록 완료 안내</R.Titlediv>
                    <img src="/assets/Admin/event-register-heart.svg" alt="하트" style={{width:'90px',height:'90px'}} />
                    <R.SubDiv>
                    <div>
                        {/* 기회를 한 번 소진하여 이벤트 등록을 완료하였습니다.<br/>
                        남은 기회는 <R.LeftSpan>3회</R.LeftSpan>입니다.<br/> */}
                        해당 이벤트 예약 내역은 좌측 하단 이벤트 예약목록에서 열람하거나 <R.CancelSpan>취소</R.CancelSpan>할 수 있습니다.<br/>
                        이벤트 사유를 공지하고 싶다면 우측 하단의 공지사항 등록을 이용하십시오.
                    </div>
                    </R.SubDiv>
                </AdminDiv>
                <R.SecondDiv>
                    <AdminDiv style={{paddingTop:'26px', paddingBottom:'26px'}}>
                        <R.Titlediv>이벤트 예약목록 및 <R.TitleCancelText>취소</R.TitleCancelText></R.Titlediv>
                        <R.SecondText>두 이벤트 예약 리스트 통합 예약 내역 및 취소</R.SecondText>
                    </AdminDiv>
                    <AdminDiv style={{paddingTop:'26px',paddingBottom:'26px'}}>
                        <R.Titlediv>공지사항 등록</R.Titlediv>
                        <R.SecondText>이벤트 사유를 공지하고 싶으신가요?</R.SecondText>
                    </AdminDiv>
                </R.SecondDiv>
            </MainWrapper>
        </div>
    );
};

export default EventRegisterComplete;