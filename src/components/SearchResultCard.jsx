import React, { useState } from "react";
import "../css/components/SearchResultCard.css"; 
import {mapHobbiesWithIconsButton }  from "../utils/profileUtils.js"
import C from '../css/components/SearchResultCardStyle.js'
const SearchResultCard = ({ profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleCopyContactId = async () => {
    if (profile.contact_id) {
      try {
        await navigator.clipboard.writeText(profile.contact_id);
        console.log('연락처가 복사되었습니다:', profile.contact_id);
        // 사용자 피드백 (예: alert)
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
      <C.InformationContainer isExpanded={isExpanded}>
      <C.NameDiv isExpanded={isExpanded}>
          <span>{profile.nickname}</span>
          {!isExpanded ? <img
            src="/assets/gray-arrow-bottom.svg"
            alt="화살표"
            onClick={toggleExpand}
          /> : 
          <img
          src="/assets/gray-arrow-up.svg"
          alt="화살표"
          onClick={toggleExpand}
        />}
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
        <C.HobbyWrapper >
          <C.GraySpan style={{fontSize:'10px',height:'10px'}}>관심사</C.GraySpan>
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
        <C.MajorWrapper style={{textAlign:'left',width:'100%'}}>
          <C.GraySpan>좋아하는 노래</C.GraySpan>
          <C.BlackSpan>{profile.song}</C.BlackSpan>
        </C.MajorWrapper>
        <C.MajorWrapper style={{textAlign:'left',width:'100%'}}>
          <C.GraySpan>나를 소개하는 한마디</C.GraySpan>
          <C.BlackSpan>{profile.comment}</C.BlackSpan>
        </C.MajorWrapper>
      </C.InformationContainer>
      <div className="contact-container2">
      <div
        className={`profile-contact2 ${profile.contact_id?.startsWith("@") ? "instagram" : "kakao"}`}
      >
        <div className="profile-text" onClick={handleCopyContactId}>{profile.contact_id || "연락처 없음"}</div>
        <div className="profile-right">
          {profile.contact_id?.startsWith("@") ? (
            // ✅ Instagram 아이콘 (send.svg)
            <img
              src="/assets/Mainpage/send.svg"
              alt="Instagram Link"
              onClick={() => {
                const cleanedContactId = profile.contact_id.replace("@", ""); // '@' 제거
                window.open(`https://www.instagram.com/${cleanedContactId}`, "_blank");
              }}
            />
          ) : (
            // ✅ Kakao 아이콘 (kakao.svg)
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
  )
}
export default SearchResultCard;
