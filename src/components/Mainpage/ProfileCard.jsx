import React from "react";
import "../../css/components/MatchProfiles.css"; 
import { getArrowByFrequency, mapHobbiesWithIcons }  from "../../utils/profileUtils.js"

const ProfileCard  = ({ profile }) => {
  return (
    <div  className="profile-box">
    <p>
      안녕하세요?
    </p>
    
    <p>
      저는 <span>{profile.major}</span> 전공이고,
    </p>
    <p>
      <span>{profile.age}</span> 살이에요.
    </p>
    <div className="mb"></div>
    <p>
      MBTI는 <span>{profile.mbti}</span>, 연락빈도는 <span>{profile.contactFrequency || "알 수 없음"}{" "}
      {getArrowByFrequency(profile.contactFrequency)}</span> 이에요.
    </p>
    <p>
      저는 요즘{" "}
      <span>{mapHobbiesWithIcons(profile.hobby).join(", ")}</span>을(를)
      좋아해요.
    </p>
    <div className="mb"></div>
    <p>
      요즘 좋아하는 노래는,
      <br />
      <span>🎵{profile.song || "없음"}</span> 입니다!
    </p>
    <div className="mb"></div>
    <p>마지막으로,제 장점은요</p>
    <p>
      <span>{profile.comment}😊</span>
    </p>
    <div className="contact-container">
      <div
        className={`profile-contact ${profile.contact_id?.startsWith("@") ? "instagram" : "kakao"}`}
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
  </div>
  );
};

export default ProfileCard;
