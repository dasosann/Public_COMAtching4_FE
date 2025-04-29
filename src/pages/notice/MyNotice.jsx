import React, { useState } from 'react';
import E from '../../css/pages/MyPageSearch/SearchMyPageStyle';
import Background from '../../components/Background';
import N from '../../css/pages/MyNoticeStyle';

const MyNotice = () => {
  const [menu, setMenu] = useState("전체");

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuName) => {
    console.log('Menu clicked:', menuName);
    setMenu(menuName);
  };

  return (
    <N.MainContainer>
      <Background />
      <E.BackArrowDiv>
        <img src="/assets/MainPayment/arrow-left.svg" alt="화살표" />
      </E.BackArrowDiv>
      <N.TitleWrapper>
        <N.TitleDiv>알림 및 공지사항</N.TitleDiv>
        <N.SubTitleDiv>매칭 알림, 혹은 공지사항을 확인할 수 있어요.</N.SubTitleDiv>
      </N.TitleWrapper>
      <N.MenuWrapper>
        <N.MenuTag
          isActive={menu === '전체'}
          onClick={() => handleMenuClick('전체')}
          role="button"
          aria-pressed={menu === '전체'}
        >
          전체
        </N.MenuTag>
        <N.MenuTag
          isActive={menu === '안읽음'}
          onClick={() => handleMenuClick('안읽음')}
          role="button"
          aria-pressed={menu === '안읽음'}
        >
          안읽음
        </N.MenuTag>
        <N.MenuTag
          isActive={menu === '알림'}
          onClick={() => handleMenuClick('알림')}
          role="button"
          aria-pressed={menu === '알림'}
        >
          알림
        </N.MenuTag>
        <N.MenuTag
          isActive={menu === '공지사항'}
          onClick={() => handleMenuClick('공지사항')}
          role="button"
          aria-pressed={menu === '공지사항'}
        >
          공지사항
        </N.MenuTag>
      </N.MenuWrapper>
    </N.MainContainer>
  );
};

export default MyNotice;