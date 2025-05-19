import { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchRequest from '../../fetchConfig';

const NoticeSlideCard = () => {
    const [notices, setNotices] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true); // 기본값 true

    // 공지사항 데이터 가져오기
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetchRequest('/auth/user/notice', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('공지사항 요청 실패');
                }
                const data = await response.json();
                console.log("가져온 공지사항",data)
                setNotices(data.data || []); // 데이터가 없으면 빈 배열
            } catch (err) {
                setError('공지사항을 불러오는 데 실패했습니다.');
                setNotices([]);
            } 
        };
        fetchNotices();
    }, []);

    // 토글 핸들러
    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    
    // 에러 발생 또는 공지사항이 없으면 컴포넌트 렌더링 안 함
    if (error || notices.length === 0) {
        return null;
    }

    return (
        <ModalContainer>
            <ToggleButton onClick={handleToggle}>
                {isOpen ? '공지사항 닫기' : '공지사항 보기'}
            </ToggleButton>
            {isOpen && (
                <SliderWrapper>
                    {notices.map((notice) => (
                        <NoticeCard key={notice.id}>
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
    flex: 0 0 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
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
    white-space: pre-wrap;
    margin-bottom: 8px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ToggleButton = styled.div`
    padding: 10px 20px;
    background: conic-gradient(from -36.07deg at 64.06% -102.34%, #e83abc 0deg, rgba(255, 119, 94, 0.1) 0.04deg, rgba(255, 77, 97, 0.6) 169.2deg, #e83abc 360deg);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 5px;
`;

export default NoticeSlideCard;