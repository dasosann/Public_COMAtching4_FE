import React, { useEffect } from 'react';
import M from '../../css/components/AdminMyPageMain'
import MasterManageComponent from './MasterManageComponent';
import OperatorManageComponent from './OperatorManageComponent';
import { adminUserState } from '../../Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MainWrapper } from '../../css/pages/Admin/AdminCSS';
const AdminMyPageMain = () => {
    const { nickname, role,university,schoolEmail} = useRecoilValue(adminUserState);
    return (
        <M.MainWrapper>
            <M.MainContainer>
                <M.MyInformText>내 정보</M.MyInformText>
                <M.AuthorityText>모든 기능을 이용할 수 있습니다</M.AuthorityText>
                <div style={{gap:'19px', display:'flex', flexDirection:'column'}}>
                    <M.DefaultText>이름 : <M.AccentText>{nickname}</M.AccentText></M.DefaultText>
                    <M.DefaultText>권한 : <M.AccentText>{role}</M.AccentText></M.DefaultText>
                    <M.DefaultText>소속 : {university}</M.DefaultText>
                    <M.DefaultText>웹메일 : {schoolEmail}</M.DefaultText>
                 </div>

            </M.MainContainer>
        </M.MainWrapper>
    );
};
const AdminMyPageManage = ()=>{
    const {role} = useRecoilValue(adminUserState);
    return (
        <MainWrapper>
              {role === 'ROLE_OPERATOR' && <OperatorManageComponent />}
              {role === 'ROLE_ADMIN' && <MasterManageComponent />}
        </MainWrapper>
    )
}
const AdminTeamManage = ()=>{
    return(
    <M.MainWrapper>
        <M.TeamManageContainer>
            <M.TeamManageDiv>
                <div style={{display:'flex', gap:"8px"}}>
                    <M.TeamManageTitle>오퍼레이터 승인 요청</M.TeamManageTitle>
                    <M.AlarmImg>3</M.AlarmImg>
                </div>
                <M.TeamManageSub>오퍼레이터 승인 요청</M.TeamManageSub>
            </M.TeamManageDiv>
            <M.TeamManageDiv>
                <M.TeamManageTitle>오퍼레이터 관리</M.TeamManageTitle>
                <M.TeamManageSub>오퍼레이터 관리</M.TeamManageSub>
            </M.TeamManageDiv>
        </M.TeamManageContainer>
    </M.MainWrapper>
    )
}

export { AdminMyPageMain, AdminMyPageManage, AdminTeamManage};