import React, { useEffect, useState } from 'react';
import SearchResultCard from '../../components/SearchResultCard';
import Y from '../../css/pages/MyPageSearch/SearchYesMatchingStyle';
const TypeSelectModal = ({setSortType, setIsModalOpen,sortType})=>{
  const [tempSortType, setTempSortType] = useState(sortType);
  
  const handleConfirm = () => {
    setSortType(tempSortType); // "확인" 클릭 시 선택된 정렬 타입 적용
    setIsModalOpen(false); // 모달 닫기
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // 컴포넌트 언마운트 시 스크롤 복원
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
          hobby: ["인디음악", "사랑","인디음악", "사랑","인디음악", "사랑","인디음악", "사랑"],
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
          hobby: [  "영화"],
          contactFrequency: "가끔",
        },
      ];
    return (
      <div style={{ width: '100%' }}>
      <Y.SearchInputWrapper>
        <Y.SearchInput
          placeholder="닉네임, 나이, 전공, MBTI 등을 입력하세요"
        />
        <Y.SearchIcon
          src="/assets/search.svg"
          alt="검색"
        />
      </Y.SearchInputWrapper>
      <Y.SortDiv onClick={()=>setIsModalOpen(true)}>
        <Y.SortImg src="/assets/sortbutton.svg" alt="정렬" />
        <span>{sortType}</span>
      </Y.SortDiv>
      <Y.CardWrapper>
        {sampleProfiles.map((profile, index) => (
          <SearchResultCard key={index} profile={profile} />
        ))}
      </Y.CardWrapper>
      {isModalOpen && <TypeSelectModal setSortType={setSortType} setIsModalOpen={setIsModalOpen} sortType={sortType}/>}
    </div>
    );
};

export default SearchYesMatching;