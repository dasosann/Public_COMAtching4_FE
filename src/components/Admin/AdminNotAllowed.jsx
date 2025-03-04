import React from 'react';
import { MainWrapper } from '../../css/pages/Admin/AdminCSS';
const AdminNotAllowed = () => {
    return (
        <MainWrapper style={{paddingTop:"200px"}}>
                    <div>
                        <img src="/assets/Admin/not-allowed.svg" alt="오류" />
                        <div style={{fontSize:'36px', fontWeight:'700', color:"rgba(77,77,77,1)"}}>
                            미승인 오퍼레이터입니다.<br/>관리자의 승인을 대기해 주세요.
                        </div>
                    </div>
        </MainWrapper>
    );
};

export default AdminNotAllowed;