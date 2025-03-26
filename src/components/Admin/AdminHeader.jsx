import React from 'react';
import A from '../../css/components/AdminHeader';
import { Navigate, useNavigate } from 'react-router-dom';
import { selected } from '../../css/components/MBTIMaker.css';
import { useRecoilValue } from 'recoil';
import { adminUserState } from '../../Atoms';

const AdminHeader = ({ adminSelect, setAdminSelect }) => {
  const navigate = useNavigate();
  const goToMainButton = ()=>{
    setAdminSelect("Main")
    navigate("/adminpage/myPage")
  }
  const goToTeamButton = ()=>{
    setAdminSelect("팀관리");
    navigate("/adminpage/myPage", {state: {selectedTab:"팀관리"}})
  }
  const goToMemberButton = ()=>{
    setAdminSelect("가입자자관리");
    navigate("/adminpage/myPage", {state: {selectedTab:"가입자관리"}})
  }
  const {nickname, role, university} = useRecoilValue(adminUserState);
  return (
    <A.HeaderContainer>
      <A.HeaderImg src="/assets/Admin/header_logo.svg" alt="코매칭 로고" onClick={()=>navigate("/adminpage",{replace:true})} />

      <A.HeaderMenu style={{padding:"0 20px"}}>
        <A.HeaderText
          onClick={goToMainButton}
          isActive={adminSelect === "Main"}
          style={{ paddingLeft:'24px', paddingRight:'24px' }}
        >
          Main
        </A.HeaderText>

        <A.HeaderText
          onClick={goToMemberButton}
          isActive={adminSelect === "가입자관리"}
          style={{ paddingLeft:'8px', paddingRight:'8px' }}
        >
          가입자관리
        </A.HeaderText>

        {/* "팀 관리 + 알람" 영역을 A.MenuItem으로 그룹화 */}
        <A.MenuItem
          onClick={goToTeamButton}
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
          <div style={{ color:'#808080' }}>{university}</div>
          <div>{role} {nickname}님</div>
        </div>
        <img src="/assets/Admin/under-triangle.svg" alt="코매칭 로고" />
      </A.HeaderProfile>
    </A.HeaderContainer>
  );
};
const AdminRegisterHeader = ()=>{
  const navigate = useNavigate();
  const goToMainButton = ()=>{
    navigate("/adminpage",{replace:true} )
  }
  return (
    <A.HeaderContainer>
      <A.HeaderImg src="/assets/Admin/header_logo.svg" alt="코매칭 로고" onClick={goToMainButton} />
    </A.HeaderContainer>
  );
}

export {AdminHeader, AdminRegisterHeader};
