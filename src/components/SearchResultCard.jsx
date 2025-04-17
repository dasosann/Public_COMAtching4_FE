import React from "react";
import "../css/components/SearchResultCard.css"; 
import {mapHobbiesWithIconsButton }  from "../utils/profileUtils.js"
import C from '../css/components/SearchResultCardStyle.js'
const SearchResultCard = ({ profile }) => {
  const hobbiesWithIcons = Array.isArray(mapHobbiesWithIconsButton(profile.hobby || []))
    ? mapHobbiesWithIconsButton(profile.hobby || [])
    : ['취미 없음'];
  return (
    <C.ProfileContainer>
      <C.InformationContainer>
        <C.NameDiv>
          <span>{profile.nickname}</span>
          <img src="/assets/arrowbottom.svg" alt="화살표" />
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
          <C.GraySpan>관심사</C.GraySpan>
          <C.HobbyButtonWrapper>
            {hobbiesWithIcons.map((hobby, index) => (
              <C.HobbyButton key={index}>{hobby}</C.HobbyButton>
            ))}
          </C.HobbyButtonWrapper>
        </C.HobbyWrapper>
      </C.InformationContainer>
      <div className="contact-container2">
      <div
        className={`profile-contact2 ${profile.contact_id?.startsWith("@") ? "instagram" : "kakao"}`}
      >
        <div className="profile-text">{profile.contact_id || "연락처 없음"}</div>
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
