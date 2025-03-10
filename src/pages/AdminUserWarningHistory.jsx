import React, { useEffect, useState } from 'react';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import W from '../css/pages/Admin/AdminUserWarningHistoryStyle';
// 컴포넌트에 props 나중에 추가해야함
const UserWarningHistoryComponent = ()=>{
    return (
        <W.WarnComponentWrapper>
            <W.TimeText>2025-01-21 10:52:03</W.TimeText>
            <W.DefaultText>경고 5회</W.DefaultText>
            <W.DefaultText style={{width:'521px'}}>사유 :&nbsp;&nbsp; 욕설 및 수치심을 주는 발언</W.DefaultText>
        </W.WarnComponentWrapper>
    );
};
const AdminUserWarningHistory = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    useEffect(()=>{

    },[])
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper>
                <AdminDiv>
                    <W.WarningTitle>경고 히스토리</W.WarningTitle>
                    <W.WarningSubTitle>자세한 경고 사유 및 누적 횟수 확인</W.WarningSubTitle>
                    <UserWarningHistoryComponent/>
                    <UserWarningHistoryComponent/>
                    <UserWarningHistoryComponent/>
                    <UserWarningHistoryComponent/>
                    <UserWarningHistoryComponent/>
                    <UserWarningHistoryComponent/>
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminUserWarningHistory;