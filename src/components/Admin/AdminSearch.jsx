// AdminSearch.tsx
import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';

const AdminSearch = () => {
  const [adminSelect, setAdminSelect] = useState('가입자관리');

  return (
    // 1) 전체를 세로로 쌓는 flex 컨테이너
    
      <div style={{boxSizing:'border-box'}}>
        <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
        <MainWrapper>
          <AdminDiv style={{marginTop:'24px'}}>
            sadasdas
          </AdminDiv>
        </MainWrapper>
      </div>
  );
};

export default AdminSearch;
