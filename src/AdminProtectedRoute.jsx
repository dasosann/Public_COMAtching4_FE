// ProtectedRoute.jsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { adminUserState } from './Atoms'; // 경로는 실제 프로젝트에 맞게 수정
import { Navigate } from 'react-router-dom';
import Adminpage_MyPage from './pages/Admin/Adminpage_MyPage';
import AdminWebmail from './pages/Admin/AdminWebmail';

const AdminProtectedRoute = ({ children, allowedAuthorities }) => {
  const { role } = useRecoilValue(adminUserState);
  // 1) 로그인 안 된 경우 (role === "")
  // if (!role) {
  //   alert("로그인 해주세요.");
  //   return <Navigate to="/adminpage" replace />;
  // }
  if (role==='ROLE_SEMI_OPERATOR'){
    alert("관리자의 승인을 받아주세요")
    return <Adminpage_MyPage/>;
  }
  if (role==='ROLE_SEMI_ADMIN'){
    alert("관리자는 이메일 인증을 해주세요")
    return <AdminWebmail/>;
  }


  // 2) 권한 체크
  // allowedAuthorities가 비어있지 않고, 현재 authority가 목록에 포함되지 않으면 접근 불가
  // if (allowedAuthorities?.length > 0 && !allowedAuthorities.includes(role)) {
  //   alert("권한이 없습니다. 접근이 제한됩니다.");
  //   return <Navigate to="/adminpage" replace />;
  // }

  // 접근 허용
  return children;
};

export default AdminProtectedRoute;
