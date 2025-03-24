import React from "react";
import "../../css/components/MatchProfiles.css"; // 필요하면 따로 스타일링 분리

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-box">
      <p>
        저는, <span>{profile.department}</span> 에 다니는,
      </p>
      <p>
        <span>{profile.age}</span> 살, <span>{profile.nickname}</span> 이라고 합니다!
      </p>
      <br />
      <p>
        MBTI는 <span>{profile.mbti}</span>, 연락빈도는 <span>보통 ➡️</span> 이에요.
      </p>
      <p>
        저는 요즘 <span>{profile.interests}</span>을 좋아해요.
      </p>
      <br />
      <p>
        요즘 좋아하는 노래는,
        <br />
        <span>{profile.favoriteSong}</span> 입니다!
      </p>
      <br />
      <p>마지막으로,</p>
      <p>
        <span>{profile.introduction}</span>
      </p>
      <div className="contact-container">
        <div className={`profile-contact ${profile.contactId.startsWith("@") ? "instagram" : "kakao"}`}>
          <div className="profile-text">{profile.contactId}</div>
          <div className="profile-right">
            <img src="/assets/Mainpage/send.svg" alt="" />
            <img src="/assets/Mainpage/more.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
