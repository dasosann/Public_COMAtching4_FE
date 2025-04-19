import React, { useEffect, useRef, useState } from 'react';
import SearchResultCard from '../../components/SearchResultCard';
import Y from '../../css/pages/MyPageSearch/SearchYesMatchingStyle';

const TypeSelectModal = ({ setSortType, setIsModalOpen, sortType }) => {
  const [tempSortType, setTempSortType] = useState(sortType);

  const handleConfirm = () => {
    setSortType(tempSortType);
    setIsModalOpen(false);
  };

  return (
    <Y.ModalOverlay onClick={() => setIsModalOpen(false)}>
      <Y.ModalContent onClick={(e) => e.stopPropagation()}>
        <Y.SortOption
          isActive={tempSortType === '오래된순'}
          onClick={() => setTempSortType('오래된순')}
        >
          오래된순
          <Y.CheckIcon
            isActive={tempSortType === '오래된순'}
            src="/assets/sort-check.svg"
            alt="체크"
          />
        </Y.SortOption>
        <Y.SortOption
          isActive={tempSortType === '최신순'}
          onClick={() => setTempSortType('최신순')}
        >
          최신순
          <Y.CheckIcon
            isActive={tempSortType === '최신순'}
            src="/assets/sort-check.svg"
            alt="체크"
          />
        </Y.SortOption>
        <Y.SortOption
          isActive={tempSortType === '나이순'}
          onClick={() => setTempSortType('나이순')}
        >
          나이순
          <Y.CheckIcon
            isActive={tempSortType === '나이순'}
            src="/assets/sort-check.svg"
            alt="체크"
          />
        </Y.SortOption>
        <Y.CloseButton onClick={handleConfirm}>확인</Y.CloseButton>
      </Y.ModalContent>
    </Y.ModalOverlay>
  );
};

const SearchYesMatching = () => {
  const [sortType, setSortType] = useState("오래된순");
  const [textStage, setTextStage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("Setting up IntersectionObserver");
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("IntersectionObserver entry:", entry.isIntersecting, "BoundingClientRect:", entry.boundingClientRect);
        if (entry.isIntersecting) {
          console.log("MessageContainer is visible");
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // 요소의 10%가 보일 때 트리거
    );

    if (messageContainerRef.current) {
      console.log("Observing MessageContainer:", messageContainerRef.current);
      observer.observe(messageContainerRef.current);
    } else {
      console.log("messageContainerRef.current is null");
    }

    return () => {
      if (messageContainerRef.current) {
        observer.unobserve(messageContainerRef.current);
      }
    };
  }, []);

  // 스크롤 애니메이션 함수
  const scrollToMessageContainerBottom = () => {
    if (messageContainerRef.current) {
      setTimeout(() => {
        const startTime = performance.now();
        const duration = 1000; // 애니메이션 지속 시간 (1초)
        const startScroll = window.scrollY;
        const rect = messageContainerRef.current.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top + rect.height - window.innerHeight; // MessageContainer 하단

        console.log("Scroll Info:", {
          startScroll,
          rectTop: rect.top,
          rectHeight: rect.height,
          windowHeight: window.innerHeight,
          targetScroll
        });

        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeInOut = progress * (2 - progress); // easeInOutQuad
          const scrollPosition = startScroll + (targetScroll - startScroll) * easeInOut;

          window.scrollTo({ top: scrollPosition, behavior: 'auto' });
          console.log("Scrolling: progress:", progress, "scrollPosition:", scrollPosition);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            // 스크롤 완료 후 위치 확인 및 보정
            const finalRect = messageContainerRef.current.getBoundingClientRect();
            const finalTarget = window.scrollY + finalRect.top + finalRect.height - window.innerHeight;
            if (Math.abs(window.scrollY - finalTarget) > 10) {
              console.log("Correcting scroll position to:", finalTarget);
              window.scrollTo({ top: finalTarget, behavior: 'smooth' });
            }
            console.log("Scroll animation completed");
          }
        };

        requestAnimationFrame(animateScroll);
      }, 100); // 100ms 지연
    }
  };

  useEffect(() => {
    console.log("isVisible:", isVisible, "textStage:", textStage);
    if (!isVisible) return;

    // 텍스트 애니메이션: textStage 전환
    const interval = setInterval(() => {
      setTextStage((prevStage) => {
        if (prevStage === 0) {
          console.log("Transition to textStage 1");
          return 1;
        }
        if (prevStage === 1) {
          console.log("Transition to textStage 2 - Button should render");
          return 2;
        }
        return prevStage; // textStage 2에서 유지
      });
    }, 1000); // 1000ms 간격으로 전환

    // 초기 스크롤
    scrollToMessageContainerBottom();

    return () => clearInterval(interval); // cleanup
  }, [isVisible]);

  // textStage 변경 시 스크롤 갱신
  useEffect(() => {
    if (isVisible && textStage > 0) {
      scrollToMessageContainerBottom();
    }
  }, [textStage, isVisible]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const sampleProfiles = [
    {
      nickname: "JaneDoe",
      major: "컴퓨터공학과",
      mbti: "INTJ",
      age: 22,
      admissionYear: 23,
      contact_id: "@janedoe",
      song: "IU - Love Poem",
      comment: "안녕하세요!!",
      hobby: ["해외여행"],
      contactFrequency: "보통",
    },
    {
      nickname: "JohnSmith",
      major: "경영학과",
      mbti: "ENTP",
      age: 24,
      admissionYear: 21,
      contact_id: "@johnsmith",
      song: "Coldplay - Fix You",
      comment: "새로운 도전을 즐깁니다!",
      hobby: ["인디음악", "사랑", "인디음악", "사랑", "인디음악", "사랑", "인디음악", "사랑"],
      contactFrequency: "자주",
    },
    {
      nickname: "AliceKim",
      major: "심리학과",
      mbti: "INFJ",
      age: 23,
      admissionYear: 22,
      contact_id: "@alicekim",
      song: "BTS - Spring Day",
      comment: "심리학이 흥미로워요!",
      hobby: ["영화"],
      contactFrequency: "가끔",
    },
  ];

  const handleMatchButtonClick = () => {
    alert("매칭 페이지로 이동합니다!");
    // 예: navigate('/matching');
  };

  return (
    <div style={{ width: '100%' }}>
      <Y.SearchInputWrapper>
        <Y.SearchInput
          placeholder="닉네임, 나이, 전공, MBTI 등을 입력하세요"
        />
        <Y.SearchIcon src="/assets/search.svg" alt="검색" />
      </Y.SearchInputWrapper>
      <Y.SortDiv onClick={() => setIsModalOpen(true)}>
        <Y.SortImg src="/assets/sortbutton.svg" alt="정렬" />
        <span>{sortType}</span>
      </Y.SortDiv>
      <Y.CardWrapper>
        {sampleProfiles.map((profile, index) => (
          <SearchResultCard key={index} profile={profile} />
        ))}
      </Y.CardWrapper>
      <Y.MessageContainer ref={messageContainerRef}>
        {!isVisible && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            MessageContainer is not visible yet
          </div>
        )}
        {isVisible && (
          <Y.MoveText key="stage0" data-stage="stage0">
            내가 뽑은 사람들을 모두 확인했어요.
          </Y.MoveText>
        )}
        {isVisible && (textStage === 1 || textStage === 2) && (
          <Y.MoveText key="stage1" data-stage="stage1">
            아직 732명이 겨울이오길님을 기다리고 있어요!
          </Y.MoveText>
        )}
        {isVisible && textStage === 2 && (
          <Y.MatchingButton onClick={handleMatchButtonClick}>
            <span>매칭하러 가기</span>
            <img src="/assets/white-arrow.svg" alt="화살표" />
          </Y.MatchingButton>
        )}
      </Y.MessageContainer>
      {isModalOpen && (
        <TypeSelectModal
          setSortType={setSortType}
          setIsModalOpen={setIsModalOpen}
          sortType={sortType}
        />
      )}
    </div>
  );
};

export default SearchYesMatching;