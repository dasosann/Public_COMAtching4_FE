import React, { useEffect, useState } from 'react';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../../css/pages/Admin/AdminCSS';
import { adminUserState } from '../../Atoms';
import S from '../../css/pages/Admin/AdminUserDetail';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetchRequest from '../../fetchConfig';
import Spinner from '../../components/Admin/Spinner';
const AdminUserDetail = () => {
      const [adminSelect, setAdminSelect] = useState('가입자관리');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [userData, setUserData] = useState(null); // 사용자 정보를 저장할 상태
      const { uuid } = useParams();  // URL 경로에서 uuid 추출
      let isBlacklisted = false;
      let gender = '남';
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state?.warnSent) {
          setIsModalOpen(true);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, [location.state]);
    useEffect(()=>{
        
        if (!uuid) {
            alert("유효하지 않은 사용자 정보입니다.");
            return;
        } 
        const getUserData  = async () =>{
            try{
                const response = await fetchRequest(`/auth/operator/user?uuid=${uuid}`,{
                    method:"GET"
                });
                const data = await response.json();
                console.log(data)
                setUserData(data);
            }catch(error){
                console.error("사용자 정보를 가져오는데 실패했습니다",error)
            }
        };
        getUserData();
    },[]);
    if(!userData){
        return Spinner;
    }

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    return (
        <div>
            <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
            <MainWrapper style={{gap:'40px'}}>
                <AdminDiv height="274px" style={{paddingRight:'24px', cursor:'default' }}>
                    <S.TitleDiv style={{marginBottom:'24px'}}>가입자 상세정보
                        {isBlacklisted && <S.BlackListText>(이용제한 가입자)</S.BlackListText>}
                    </S.TitleDiv>
                    <div>
                        <S.NicknameAndGenderDiv>
                            <S.TitleSpan>Nickname :</S.TitleSpan>
                            <S.NameSpan>&nbsp;{userData.data.username}&nbsp;&nbsp;</S.NameSpan>
                            {/* 여기에서 데이터받아서 써야한다. */}
                            {/* {gender==="남" ? <img src='/assets/Admin/male-icon.svg' alt='남성 아이콘'/>:<img src='/assets/Admin/female-icon.svg' alt='여성 아이콘'/> } */}
                        </S.NicknameAndGenderDiv>
                        <S.EmailDiv>
                            <S.TitleSpan>E-mail :</S.TitleSpan>
                            <S.EmailSpan isBlacklisted={isBlacklisted}>&nbsp;{userData.data.email}</S.EmailSpan> 
                        </S.EmailDiv>
                    </div>
                    <S.ButtonWrapper>
                        <S.FunctionButton onClick={()=>navigate(`${location.pathname}/warnhistory`)}>경고 히스토리</S.FunctionButton>
                        <S.FunctionButton onClick={()=>navigate(`${location.pathname}/SendWarnMessage`, {
                            state : {
                                userInfo : {
                                    nickname: userData.data.username,
                                    email: userData.data.email,
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
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}} onClick={()=>navigate(`${location.pathname}/PaymentHistory`)}><S.TitleDiv>결제 내역</S.TitleDiv><S.SubText>결제내역 확인</S.SubText></AdminDiv>
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}}><S.TitleDiv>포인트 사용 내역</S.TitleDiv><S.SubText>포인트 사용내역 확인</S.SubText></AdminDiv>
                    <AdminDiv height='117px' style={{cursor:'pointer', flex:'1'}} onClick={()=>navigate(`${location.pathname}/pointManage`)}><S.TitleDiv>포인트 조정</S.TitleDiv><S.SubText>포인트 수동조정</S.SubText></AdminDiv>
                </S.SecondAdminDivWrapper>
                {isModalOpen && (
                    <S.Overlay>
                      <S.ModalContainer>
                        <S.ModalContent>해당 가입자에게 경고 메시지가 <br/>전송 되었습니다.</S.ModalContent>
                        <S.ModalConfirm onClick={handleCloseModal}>확인</S.ModalConfirm>
                      </S.ModalContainer>
                    </S.Overlay>
                )}
            </MainWrapper>
        </div>
    );
};

export default AdminUserDetail;