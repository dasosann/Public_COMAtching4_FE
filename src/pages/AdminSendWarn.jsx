import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import S from '../css/pages/Admin/AdminSendWarnStyle';
import Downshift from 'downshift';
import { ToggleButton } from '@mui/material';
const ConfirmMessageComponent = ({nickname,warningMessage,setShowConfirm})=>{

  return (
      <S.WarningComponentDiv>
        <AdminDiv height="247px" style={{gap:'0px',padding:'0px'}}>
            <S.StyledDiv>
              <S.PreviewWaringDiv>
                <S.PreviewWaringP>{nickname}님. {warningMessage}(으)로<br/>1번 경고 드립니다.<br/>- 관리자 안내 - </S.PreviewWaringP>
              </S.PreviewWaringDiv>
              <S.ButtonContainer>
                <S.StyledButton style={{borderRight:'1px solid #b3b3b3',borderRadius:'0 0 0 24px'}}>
                  취소
                </S.StyledButton>
                <S.StyledButton style={{borderRadius:'0 0 24px 0'}}>
                  전송
                </S.StyledButton>
              </S.ButtonContainer>
            </S.StyledDiv>
        </AdminDiv>
        <AdminDiv height="247px" style={{gap:'16px',padding:'26px 24px 29px 24px'}}>
          <S.TitleDiv>경고 메시지 미리보기</S.TitleDiv>
          <S.SubText>왼쪽과 같은 형태로 위 가입자에게 경고 메시지가 전송됩니다.<br/>경고 메시지는 신중하게 전송해 주십시오.<br/>이에 동의하십니까?</S.SubText>
          <S.ButtonWrapper>
            <S.WarnButton style={{backgroundColor:'#ff775e'}} onClick={(()=>setShowConfirm(true))}>돌아가기</S.WarnButton>
            <S.WarnButton style={{backgroundColor:'#dd272a'}} >전송하기</S.WarnButton>
          </S.ButtonWrapper>
        </AdminDiv>
      </S.WarningComponentDiv>
  )
}
    
const AdminSendWarn = () => {
  const { state } = useLocation();
  const userInfo = state?.userInfo;
  const [adminSelect, setAdminSelect] = useState('가입자관리');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [customReason, setCustomReason] = useState(""); // 직접 입력된 사유 관리
  const [showConfirm, setShowConfirm] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [finalNickname, setFinalNickname] = useState("");
  const warningMenu = [
    "욕설 및 수치심을 주는 발언",
    "특정인에 대한 비하 및 조롱",
    "명예훼손, 사생활 노출, 신상 털기",
    "협박 및 폭력성 발언, 인총자별",
    "불법성(마약 등) 단어 언급",
    "부적절한 미팅장소 제시",
    "금전적 거래",
    "불순한 의도의 다계정 생성",
    "타인 명의 계정 이용 및 거래",
    "스팸 및 광고 활동",
    "단순 팔로워 늘리기 목적 및 홍보",
    "포교 활동",
    "조건 만남 및 성매매",
    "스토킹",
    "허위 프로필 및 사기, 관리자 사칭"
  ];
  const handleSubmit = async () => {
    // 경고 사유가 선택되지 않거나, 직접 입력된 사유가 없는 경우 알림
    if (!selectedMenu && !customReason) {
      alert("경고 사유를 선택하거나 직접 입력해주세요.");
      return;
    }

    // 경고 메시지 준비
    let warningMessage = "";
    if (selectedMenu && customReason) {
      // 두 개의 값이 있을 경우 공백을 추가하여 합침
      warningMessage = `${selectedMenu}, ${customReason}`;
    } else if (selectedMenu) {
      warningMessage = selectedMenu;
    } else if (customReason) {
      warningMessage = customReason;
    }
    setFinalMessage(warningMessage);
    setFinalNickname(userInfo?.nickname || "에러"); // 혹은 userInfo.nickname이 있음을 가정
    setShowConfirm(false)
  }

  return (
    <div>
      <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
      <MainWrapper style={{ gap: '40px'}}>
        <AdminDiv height="226px">
          <S.TitleDiv style={{ marginBottom: '24px' }}>
            가입자 상세정보
          </S.TitleDiv>
          <div>
            <S.NicknameAndGenderDiv>
              <S.TitleSpan>Nickname :</S.TitleSpan>
              <S.NameSpan>&nbsp;가지&nbsp;&nbsp;</S.NameSpan>
              {userInfo.gender === "남" ? (
                <img src='/assets/Admin/male-icon.svg' alt='남성 아이콘' />
              ) : (
                <img src='/assets/Admin/female-icon.svg' alt='여성 아이콘' />
              )}
            </S.NicknameAndGenderDiv>
            <S.EmailDiv>
              <S.TitleSpan>E-mail :</S.TitleSpan>
              <S.EmailSpan>&nbsp;comatching@catholic.ac.kr</S.EmailSpan>
            </S.EmailDiv>
          </div>
        </AdminDiv>
        {showConfirm ? (
          <AdminDiv style={{gap:'16px', paddingRight:'24px'}}>
          <S.TitleDiv>전송할 경고 사유</S.TitleDiv>
          <S.SendWarningDiv>
            <Downshift
              onChange={selection => setSelectedMenu(selection)}
              itemToString={item => (item ? item : '')}
            >
              {({
                getRootProps,
                getToggleButtonProps,
                getMenuProps,
                getItemProps,
                isOpen,
                highlightedIndex,
                selectedItem,
              }) => (
                <S.DropDownContainer {...getRootProps()}>
                  <S.ToggleButton {...getToggleButtonProps()}>
                    {selectedMenu || "선택"}
                    <img src="/assets/arrowbottom.svg" alt="" />
                  </S.ToggleButton>
                  <S.MenuList {...getMenuProps()} isOpen={isOpen}>
                    {isOpen &&
                      warningMenu.map((item, index) => (
                        <S.MenuItem
                          key={item}
                          {...getItemProps({ item, index })}
                          highlighted={highlightedIndex === index}
                          selected={selectedMenu === item}
                        >
                          {item}
                        </S.MenuItem>
                      ))}
                  </S.MenuList>
                </S.DropDownContainer>
              )}
            </Downshift>
            <S.Text>또는</S.Text>
            <S.DirectInput type='text' placeholder='직접 입력하기' value={customReason} onChange={e=>setCustomReason(e.target.value)}/>
            <S.Text>(으)로</S.Text>
          </S.SendWarningDiv>
          <S.SendWarningDiv style={{justifyContent:'space-between'}}>
            <S.Text>해당 가입자에게 경고 메시지를 보냅니다.</S.Text>
            <S.SendWarnButton onClick={handleSubmit}>확인</S.SendWarnButton>
          </S.SendWarningDiv>
        </AdminDiv>) : (
          <ConfirmMessageComponent setShowConfirm={setShowConfirm} nickname={finalNickname}
          warningMessage={finalMessage}/>
        )}
        
      </MainWrapper>
    </div>
  );
};

export default AdminSendWarn;
