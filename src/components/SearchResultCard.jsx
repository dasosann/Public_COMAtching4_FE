import React, { useState, useRef, useEffect } from "react";
import C from '../css/components/SearchResultCardStyle.js';
import { mapHobbiesWithIconsButton } from "../utils/profileUtils.js";
import '../css/components/SearchResultCard.css';
const SearchResultCard = ({ profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  // 토글 함수
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 콘텐츠 높이 계산
  useEffect(() => {
    if (contentRef.current) {
      // 전체 콘텐츠 높이 (확장 상태)
      const fullHeight = isExpanded? contentRef.current.scrollHeight+16 : contentRef.current.scrollHeight;
      // 축소 상태 높이 (예: 초기 높이, 스타일에 따라 조정)
      const collapsedHeight = 161; // C.InformationContainer의 기본 높이
      setContentHeight(isExpanded ? fullHeight : collapsedHeight);
    }
  }, [isExpanded]);

  // 연락처 복사 함수
  const handleCopyContactId = async () => {
    if (profile.contact_id) {
      try {
        await navigator.clipboard.writeText(profile.contact_id);
        alert(`${profile.contact_id}가 클립보드에 복사되었습니다!`);
      } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const hobbiesWithIcons = Array.isArray(mapHobbiesWithIconsButton(profile.hobby || []))
    ? mapHobbiesWithIconsButton(profile.hobby || [])
    : ['취미 없음'];

  return (
    <C.ProfileContainer>
      <C.InformationContainer
        ref={contentRef}
        isExpanded={isExpanded}
        style={{ height: `${contentHeight}px` }} // 동적 높이 적용
      >
        <C.NameDiv isExpanded={isExpanded}>
          <span>{profile.nickname}</span>
          <img
            src={isExpanded ? "/assets/gray-arrow-up.svg" : "/assets/gray-arrow-bottom.svg"}
            alt="화살표"
            onClick={toggleExpand}
          />
        </C.NameDiv>
        <C.AgeAndMajorWrapper>
          <C.AgeWrapper>
            <C.GraySpan>나이</C.GraySpan>
            <C.BlackSpan>{profile.age}</C.BlackSpan>
          </C.AgeWrapper>
          <C.MajorWrapper>
            <C.GraySpan>전공</C.GraySpan>
            <C.BlackSpan>{profile.major}</C.BlackSpan>
          </C.MajorWrapper>
        </C.AgeAndMajorWrapper>
        <C.HobbyWrapper>
          <C.GraySpan style={{ fontSize: '10px', height: '10px' }}>관심사</C.GraySpan>
          <C.HobbyButtonWrapper isExpanded={isExpanded}>
            {hobbiesWithIcons.map((hobby, index) => (
              <C.HobbyButton key={index}>{hobby}</C.HobbyButton>
            ))}
          </C.HobbyButtonWrapper>
        </C.HobbyWrapper>
        <C.AgeAndMajorWrapper>
          <C.AgeWrapper>
            <C.GraySpan>MBTI</C.GraySpan>
            <C.BlackSpan>{profile.mbti}</C.BlackSpan>
          </C.AgeWrapper>
          <C.MajorWrapper>
            <C.GraySpan>연락빈도</C.GraySpan>
            <C.BlackSpan>{profile.contactFrequency}</C.BlackSpan>
          </C.MajorWrapper>
        </C.AgeAndMajorWrapper>
        <C.MajorWrapper style={{ textAlign: 'left', width: '100%'}}>
          <C.GraySpan>좋아하는 노래</C.GraySpan>
          <C.BlackSpan>{profile.song}</C.BlackSpan>
        </C.MajorWrapper>
        <C.LastWrapper style={{ textAlign: 'left'}}>
          <C.GraySpan>나를 소개하는 한마디</C.GraySpan>
          <C.BlackSpan>{profile.comment}</C.BlackSpan>
        </C.LastWrapper>
      </C.InformationContainer>
      <div className="contact-container2">
        <div
          className={`profile-contact2 ${profile.contact_id?.startsWith("@") ? "instagram" : "kakao"}`}
        >
          <div className="profile-text" onClick={handleCopyContactId}>
            {profile.contact_id || "연락처 없음"}
          </div>
          <div className="profile-right">
            {profile.contact_id?.startsWith("@") ? (
              <img
                src="/assets/Mainpage/send.svg"
                alt="Instagram Link"
                onClick={() => {
                  const cleanedContactId = profile.contact_id.replace("@", "");
                  window.open(`https://www.instagram.com/${cleanedContactId}`, "_blank");
                }}
              />
            ) : (
              <img
                src="/assets/Mainpage/kakao.png"
                alt="Kakao Link"
                style={{ cursor: profile.contact_id ? "pointer" : "default", opacity: profile.contact_id ? 1 : 0.5 }}
              />
            )}
            <img src="/assets/Mainpage/more.svg" alt="More Options" />
          </div>
        </div>
      </div>
    </C.ProfileContainer>
  );
};

export default SearchResultCard;