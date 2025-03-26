import React, { useEffect, useState } from 'react';
import {AdminHeader} from '../../components/Admin/AdminHeader';
import {AdminMyPageMain,AdminMyPageManage, AdminTeamManage} from '../../components/Admin/AdminMyPageMain';
import { adminUserState } from '../../Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AdminNotAllowed from '../../components/Admin/AdminNotAllowed';
import { useLocation, useNavigate } from 'react-router-dom';
const Adminpage_MyPage = () => {
    const navigate = useNavigate();
    const [adminSelect, setAdminSelect] = useState("Main");
    const {role} = useRecoilValue(adminUserState);
    const location = useLocation();
    useEffect(() => {
    if (location.state?.selectedTab) {
        setAdminSelect(location.state.selectedTab);
    }
    }, [location.state]);
    if(role==="ROLE_SEMI_OPERATOR"){
        return (
            <>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
                <AdminNotAllowed/>
            </>
        )
    }
    else if(role==="ROLE_SEMI_ADMIN"){
        navigate("/adminpage/webmail-check",{replace:true})
        return;
    }
    else{
        return (
            <div>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
                {adminSelect === 'Main' && <AdminMyPageMain />} 
                {adminSelect === '가입자관리' && <AdminMyPageManage />} 
                {adminSelect === '팀관리' && <AdminTeamManage />}
            </div>
        );
    }
};

export default Adminpage_MyPage;