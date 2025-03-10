import React, { useState } from 'react';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import { adminUserState } from '../Atoms';
import S from '../css/pages/Admin/AdminUserDetail';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
const AdminUserDetail = () => {
      const [adminSelect, setAdminSelect] = useState('가입자관리');
      let isBlacklisted = true;
      let gender = '남';
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper style={{gap:'40px'}}>
                <AdminDiv height="274px" style={{paddingRight:'24px' }}>
                    <S.TitleDiv style={{marginBottom:'24px'}}>가입자 상세정보
                        {isBlacklisted && <S.BlackListText>(이용제한 가입자)</S.BlackListText>}
                    </S.TitleDiv>
                    <div>
                        <S.NicknameAndGenderDiv>
                            <S.TitleSpan>Nickname :</S.TitleSpan>
                            <S.NameSpan>&nbsp;가지&nbsp;&nbsp;</S.NameSpan>
                            {/* 여기에서 데이터받아서 써야한다. */}
                            {gender==="남" ? <img src='/assets/Admin/male-icon.svg' alt='남성 아이콘'/>:<img src='/assets/Admin/female-icon.svg' alt='여성 아이콘'/> }
                        </S.NicknameAndGenderDiv>
                        <S.EmailDiv>
                            <S.TitleSpan>E-mail :</S.TitleSpan>
                            <S.EmailSpan isBlacklisted={isBlacklisted}>&nbsp;comatching@catholic.ac.kr</S.EmailSpan> 
                        </S.EmailDiv>
                    </div>
                    <S.ButtonWrapper>
                        <S.FunctionButton onClick={()=>navigate(`${location.pathname}/warnhistory`)}>경고 히스토리</S.FunctionButton>
                        <S.FunctionButton onClick={()=>navigate(`${location.pathname}/SendWarnMessage`, {
                            state : {
                                userInfo : {
                                    nickname: "가지",
                                    email: "comatching@catholic.ac.kr",
                                    gender: '여',
                                }
                            }
                        })}>
                            경고 메시지 전송
                        </S.FunctionButton>
                        {isBlacklisted ? <S.FunctionButton isBlacklisted={isBlacklisted}>블랙리스트 해제</S.FunctionButton>:<S.FunctionButton>블랙리스트 추가</S.FunctionButton>}
                    </S.ButtonWrapper>
                </AdminDiv>
                <S.SecondAdminDivWrapper style={{width:'100%'}}>
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}}><S.TitleDiv>결제 내역</S.TitleDiv><S.SubText>결제내역 확인</S.SubText></AdminDiv>
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}}><S.TitleDiv>포인트 사용 내역</S.TitleDiv><S.SubText>포인트 사용내역 확인</S.SubText></AdminDiv>
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}}><S.TitleDiv>포인트 조정</S.TitleDiv><S.SubText>포인트 수동조정</S.SubText></AdminDiv>
                </S.SecondAdminDivWrapper>
            </MainWrapper>
        </div>
    );
};

export default AdminUserDetail;