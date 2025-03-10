import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminHeader } from '../components/Admin/AdminHeader';
import { AdminDiv, MainWrapper } from '../css/pages/Admin/AdminCSS';
import S from '../css/pages/Admin/AdminSendWarnStyle';
import Downshift from 'downshift';
import { ToggleButton } from '@mui/material';

const AdminSendWarn = () => {
  const { state } = useLocation();
  const userInfo = state?.userInfo;
  const [adminSelect, setAdminSelect] = useState('가입자관리');
  const [selectedMenu, setSelectedMenu] = useState(null);
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

  return (
    <div>
      <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect} />
      <MainWrapper style={{ gap: '40px' }}>
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
        <AdminDiv>
          <S.TitleDiv>전송할 경고 사유</S.TitleDiv>
          <div>
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
                  <S.MenuList {...getMenuProps()}>
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
          </div>
        </AdminDiv>
      </MainWrapper>
    </div>
  );
};

export default AdminSendWarn;
