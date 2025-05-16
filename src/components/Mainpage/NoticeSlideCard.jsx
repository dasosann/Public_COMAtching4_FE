import { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchRequest from '../../fetchConfig';

const NoticeSlideCard = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // 슬라이더 표시 여부 상태
  const dummyNotices = [
  {
    title: '가나다라마바사아아아아아앙아아',
    content: '아아아아아아아아아아아아아아아아아아\n시스템 점검이 5월 16일 02:00~04:00에 진행됩니다.\n이용에 불편을 드려 죄송합니다.',
  },
  {
    title: '111111111111111111',
    content: '신규 사용자 이벤트!\n5월 말까지 가입 시 포인트 1000P 지급.\n아아아아아아아아아아아아아아아아아아',
  },
  {
    title: '업데이트 소식',
    content: '새로운 매칭 기능 추가!\nAI 매칭 정확도가 20% 향상되었습니다.\n자세한 내용은 가이드북을 확인하세요.',
  },
];
  // 공지사항 데이터 가져오기
  // useEffect(() => {
  //   const fetchNotices = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetchRequest('/auth/admin/notice?state=OPEN', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const data = await response.json();
  //       setNotices(data || []); // 데이터가 없으면 빈 배열
  //       setIsLoading(false);
  //     } catch (err) {
  //       setError('공지사항을 불러오는 데 실패했습니다.');
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchNotices();
  // }, []);

  // 토글 핸들러
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  

  // if (error || notices.length === 0) {
  //   return null; // 에러 또는 공지사항이 없으면 컴포넌트 표시 안 함
  // }

  return (
    <ModalContainer>
      <ToggleButton onClick={handleToggle}>
        {isOpen ? '공지사항 닫기' : '공지사항 보기'}
      </ToggleButton>
      {isOpen && (
        <SliderWrapper>
          {dummyNotices.map((notice, index) => (
            <NoticeCard key={index}>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <NoticeContent>{notice.content}</NoticeContent>
            </NoticeCard>
          ))}
        </SliderWrapper>
      )}
    </ModalContainer>
  );
};

// Styled Components
const ModalContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  margin-top: 10px;
`;

const SliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  gap: 16px;

  &::-webkit-scrollbar {
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

const NoticeCard = styled.div`
  box-sizing: border-box;
  flex: 0 0 100%; /* 화면 너비 - 좌우 패딩(16px * 2) */
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  /* margin: 5px; */
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(50px);
  scroll-snap-align: start;
  border: 2px solid #e5e5e5;
    clip-path: polygon(
        16px 0,
        calc(100% - 16px) 0,
        100% 16px,
        100% calc(100% - 16px),
        calc(100% - 16px) 100%,
        16px 100%,
        0 calc(100% - 16px),
        0 16px
    );
`;

const NoticeTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const NoticeContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #666;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  margin-bottom: 8px;
`;


const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ToggleButton = styled.div`
  padding: 10px 20px;
  background: conic-gradient(from -36.07deg at 64.06% -102.34%, #E83ABC 0deg, rgba(255, 119, 94, 0.1) 0.04deg, rgba(255, 77, 97, 0.6) 169.2deg, #E83ABC 360deg);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 5px;

`;

export default NoticeSlideCard;


