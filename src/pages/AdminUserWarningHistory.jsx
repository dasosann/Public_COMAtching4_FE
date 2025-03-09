import React, { useEffect, useState } from 'react';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import W from '../css/pages/Admin/AdminUserWarningHistoryStyle';
const AdminUserWarningHistory = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    useEffect(()=>{

    },[])
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper>
                <AdminDiv>
                
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminUserWarningHistory;