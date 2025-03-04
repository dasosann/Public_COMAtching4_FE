import React from 'react';
import A from '../../css/components/AdminHeader';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminHeader = ({ adminSelect, setAdminSelect }) => {
  const navigate = useNavigate();
  const goToMainButton = ()=>{
    navigate("/adminpage")
  }
  return (
    <A.HeaderContainer>
      <A.HeaderImg src="/assets/Admin/header_logo.svg" alt="코매칭 로고" onClick={goToMainButton} />

      <A.HeaderMenu style={{padding:"0 20px"}}>
        <A.HeaderText
          onClick={() => setAdminSelect("Main")}
          isActive={adminSelect === "Main"}
          style={{ paddingLeft:'24px', paddingRight:'24px' }}
        >
          Main
        </A.HeaderText>

        <A.HeaderText
          onClick={() => setAdminSelect("가입자관리")}
          isActive={adminSelect === "가입자관리"}
          style={{ paddingLeft:'8px', paddingRight:'8px' }}
        >
          가입자관리
        </A.HeaderText>

        {/* "팀 관리 + 알람" 영역을 A.MenuItem으로 그룹화 */}
        <A.MenuItem
          onClick={() => setAdminSelect("팀관리")}
          isActive={adminSelect === "팀관리"}
        >
          <A.HeaderText>
            팀 관리
          </A.HeaderText>
          <A.AlarmImg>3</A.AlarmImg>
        </A.MenuItem>
      </A.HeaderMenu>

      <A.HeaderProfile>
        <div style={{ display:'flex', flexDirection:"column", fontWeight:'500' }}>
          <div style={{ color:'#808080' }}>가톨릭대학교</div>
          <div>관리자 박승원님</div>
        </div>
        <img src="/assets/Admin/under-triangle.svg" alt="코매칭 로고" />
      </A.HeaderProfile>
    </A.HeaderContainer>
  );
};
const AdminRegisterHeader = ()=>{
  const navigate = useNavigate();
  const goToMainButton = ()=>{
    navigate("/adminpage")
  }
  return (
    <A.HeaderContainer>
      <A.HeaderImg src="/assets/Admin/header_logo.svg" alt="코매칭 로고" onClick={goToMainButton} />
    </A.HeaderContainer>
  );
}

export {AdminHeader, AdminRegisterHeader};
