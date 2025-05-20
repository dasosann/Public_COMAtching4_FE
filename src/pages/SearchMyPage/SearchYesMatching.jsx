import React, { useEffect, useRef, useState, useMemo } from 'react';
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

const SearchYesMatching = ({ matchingData,userNumber,username}) => {
  const [sortType, setSortType] = useState('오래된순');
  const [textStage, setTextStage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
  const messageContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sortedProfiles, setSortedProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState(matchingData); // 필터링된 프로필
  // SearchResultCard에 맞게 데이터 매핑
  const mappedProfiles = useMemo(() => {
    const profiles = matchingData.map((profile) => ({
      username: profile.username || '알 수 없음', // contactId를 닉네임으로 사용
      mbti: profile.mbti || 'N/A',
      age: profile.age || 0,
      contactId: profile.contactId || '',
      song: profile.song || '',
      comment: profile.comment || '',
      hobbyList: profile.hobbyList || [],
      contactFrequency: profile.contactFrequency || '',
      major: profile.major || '',
      gender: profile.gender || '',
      matchedAt: profile.matchedAt || new Date().toISOString(),
    }));
    console.log('mappedProfiles:', profiles); // mappedProfiles 로그 추가
    return profiles;
  }, [matchingData]);
  // 검색어로 프로필 필터링
  const handleSearchClick = () => {
    console.log('Search query:', searchQuery);
    if (!searchQuery.trim()) {
      setFilteredProfiles(mappedProfiles);
      return;
    }
    const query = searchQuery.toLowerCase();
    const result = mappedProfiles.filter((profile) => {
      const hobbies = Array.isArray(profile.hobbyList) ? profile.hobbyList : [];
      const matches = (
        profile.age.toString().includes(query) ||
        (profile.major || '').toLowerCase().includes(query) ||
        (profile.username || '').toLowerCase().includes(query) ||
        (profile.mbti || '').toLowerCase().includes(query) ||
        hobbies.some((hobby) => (hobby || '').toLowerCase().includes(query))
      );
      console.log(`Profile ${profile.id} matches:`, matches, 'Profile data:', profile);
      return matches;
    });
    console.log('Filtered profiles:', result);
    setFilteredProfiles(result);
  };


  // sortType 또는 filteredProfiles 변경 시 프로필 정렬
  useEffect(() => {
    const sortProfiles = () => {
      const profilesCopy = [...filteredProfiles];
      switch (sortType) {
        case '최신순':
          return profilesCopy.reverse(); // 배열 역순
        case '오래된순':
          return profilesCopy; // 원본 순서 유지
        case '나이순':
          return profilesCopy.sort((a, b) => a.age - b.age); // 오름차순
        default:
          return profilesCopy;
      }
    };
    setSortedProfiles(sortProfiles());
  }, [sortType, filteredProfiles]);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log('Setting up IntersectionObserver');
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver entry:', entry.isIntersecting, 'BoundingClientRect:', entry.boundingClientRect);
        if (entry.isIntersecting) {
          console.log('MessageContainer is visible');
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (messageContainerRef.current) {
      observer.observe(messageContainerRef.current);
    } else {
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
        const duration = 1000;
        const startScroll = window.scrollY;
        const rect = messageContainerRef.current.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top + rect.height - window.innerHeight;

        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeInOut = progress * (2 - progress);
          const scrollPosition = startScroll + (targetScroll - startScroll) * easeInOut;

          window.scrollTo({ top: scrollPosition, behavior: 'auto' });

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            const finalRect = messageContainerRef.current.getBoundingClientRect();
            const finalTarget = window.scrollY + finalRect.top + finalRect.height - window.innerHeight;
            if (Math.abs(window.scrollY - finalTarget) > 10) {
              window.scrollTo({ top: finalTarget, behavior: 'smooth' });
            }
          }
        };

        requestAnimationFrame(animateScroll);
      }, 100);
    }
  };

  useEffect(() => {
    console.log('isVisible:', isVisible, 'textStage:', textStage);
    if (!isVisible) return;

    const interval = setInterval(() => {
      setTextStage((prevStage) => {
        if (prevStage === 0) {
          return 1;
        }
        if (prevStage === 1) {
          return 2;
        }
        return prevStage;
      });
    }, 1000);

    scrollToMessageContainerBottom();

    return () => clearInterval(interval);
  }, [isVisible]);

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

  const handleMatchButtonClick = () => {
    navigate('/matching');
  };

  return (
    <div style={{ width: '100%' }}>
      <Y.SearchInputWrapper>
        <Y.SearchInput
          placeholder="닉네임, 나이, 전공, MBTI 등을 입력하세요"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Y.SearchIcon src="/assets/search.svg" alt="검색" onClick={handleSearchClick} role='button'/>
      </Y.SearchInputWrapper>
      <Y.SortDiv onClick={() => setIsModalOpen(true)}>
        <Y.SortImg src="/assets/sortbutton.svg" alt="정렬" />
        <span>{sortType}</span>
      </Y.SortDiv>
      <Y.CardWrapper>
        {sortedProfiles.map((profile,index) => (
          <SearchResultCard key={index} profile={profile} />
        ))}
      </Y.CardWrapper>
      <Y.MessageContainer ref={messageContainerRef}>
        {!isVisible && (
          <div style={{ color: 'red', textAlign: 'center' }}>
            내가 뽑은 매칭 리스트를 가져오는 중이에요......
          </div>
        )}
        {isVisible && (
          <Y.MoveText key="stage0" data-stage="stage0">
            내가 뽑은 사람들을 모두 확인했어요.
          </Y.MoveText>
        )}
        {isVisible && (textStage === 1 || textStage === 2) && (
          <Y.MoveText key="stage1" data-stage="stage1">
            아직 {userNumber}명이 {username}님을 기다리고 있어요!
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