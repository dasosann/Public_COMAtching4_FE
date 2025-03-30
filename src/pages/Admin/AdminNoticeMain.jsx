import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import E from '../../css/pages/Admin/AdminEventPageStyle';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
const AdminNoticeMain = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    const navigate =useNavigate();
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
            <MainWrapper>
                <AdminDiv style={{paddingTop:'26px'}} onClick={()=>navigate('/adminpage/myPage/notice/reservation')}>
                    <E.TitleDiv>공지사항 예약</E.TitleDiv>
                    <E.SubDiv>공지사항은 예약제</E.SubDiv>
                </AdminDiv>
                <E.FlexWrapper>
                        <AdminDiv onClick={()=>navigate('/adminpage/myPage/notice/list')} style={{paddingTop:'26px'}}>
                            <E.TitleDiv>공지사항 예약목록 및 <E.RedSpan>취소</E.RedSpan></E.TitleDiv> 
                            <E.SubDiv>두 이벤트 예약 리스트 통합 예약 내역</E.SubDiv>
                        </AdminDiv>
                        <AdminDiv onClick={()=>navigate('/adminpage/myPage/notice/history')} style={{paddingTop:'26px'}}>
                            <E.TitleDiv>공지사항 히스토리</E.TitleDiv>
                            <E.SubDiv>지금까지 진행한 과거 이벤트의 히스토리</E.SubDiv>
                        </AdminDiv>
                </E.FlexWrapper>
            </MainWrapper>
        </div>
    );
};

export default AdminNoticeMain;