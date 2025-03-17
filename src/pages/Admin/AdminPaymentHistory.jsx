import React, { useState } from 'react';
import P from '../../css/pages/Admin/AdminPaymentHistoryStyle';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
const PaymentHistoryComponent = () =>{
    return (
        <div>
            
        </div>
    )
}
const AdminPaymentHistory = () => {
    const [adminSelect, setAdminSelect] = useState('가입자관리');
    
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper>
                <AdminDiv>
                    <P.PaymentTitle>결제내역</P.PaymentTitle>
                    <P.SubText>최신순 정렬</P.SubText>
                    <P.PaymentHistoryDiv>

                    </P.PaymentHistoryDiv>
                </AdminDiv>
            </MainWrapper>
        </div>
    );
};

export default AdminPaymentHistory;