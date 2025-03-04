import React, { useState } from 'react';
import {AdminHeader} from '../components/Admin/AdminHeader';
import {AdminMyPageMain,AdminMyPageManage, AdminTeamManage} from '../components/Admin/AdminMyPageMain';
import { adminUserState } from '../Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AdminNotAllowed from '../components/Admin/AdminNotAllowed';
import { useNavigate } from 'react-router-dom';
const Adminpage_MyPage = () => {
    const navigate = useNavigate();
    const [adminSelect, setAdminSelect] = useState("Main");
    const {isChecked} = useRecoilValue(adminUserState);
    const {authority} = useRecoilValue(authority);
    
    // if(!isChecked && authority==="오퍼레이터" ){
    //     return (
    //         <>
    //             <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}></AdminHeader>
    //             <AdminNotAllowed/>
    //         </>
    //     )
    // }
    // else if(!isChecked && authority==="관리자"){
    //     navigate("/adminpage/webmail-check")
    // }
    return (
            <div>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
                {adminSelect === 'Main' && <AdminMyPageMain />} 
                {adminSelect === '가입자관리' && <AdminMyPageManage />} 
                {adminSelect === '팀관리' && <AdminTeamManage />}
            </div>
    );
};

export default Adminpage_MyPage;