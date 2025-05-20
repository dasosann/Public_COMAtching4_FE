import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/MatchProfiles.css";
import hobbyData from "../../data/hobbyData";

const MatchProfiles = ({ profiles = [] }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
  };

  const mapHobbiesWithIcons = (hobbyList) => {
    if (!hobbyList || hobbyList.length === 0) return ["취미 없음"];
    return hobbyList.map((hobbyName) => {
      const category = hobbyData.find((cat) =>
        cat.hobbies.some((h) => h.name === hobbyName)
      );
      const matched = category?.hobbies.find((h) => h.name === hobbyName);
      return matched ? `${matched.emoji} ${hobbyName}` : hobbyName;
    });
  };

  if (profiles.length === 0) {
    return (
      <div className="no-match">
        <img src="/assets/Mainpage/logo.svg" alt="No Match" className="no-match-icon" />
        <p className="no-match-text">
          아직 매칭된 상대가 없어요.
          <br /> 나와 딱 맞는 이성친구를 만들어봐요!
        </p>
      </div>
    );
  }

  return (
    <div className="profile-slider-wrapper">
      <Slider {...settings} className="profile-slider">
        {profiles.map((profile, idx) => (
          <div key={idx}>
            <div className="profile-box">
              <p>안녕하세요?</p>
              <p>저는 <span>{profile.major}</span> 전공이고,</p>
              <p><span>{profile.age}</span> 살이에요.</p>
              <p>MBTI는 <span>{profile.mbti}</span>, 연락빈도는 <span>{profile.contactFrequency || "알 수 없음"}</span> 이에요.</p>
              <p>요즘은 <span>{mapHobbiesWithIcons(profile.hobby).join(", ")}</span>을(를) 좋아해요.</p>
              <p>좋아하는 노래는 <br /><span>🎵{profile.song || "없음"}</span> 입니다!</p>
              <p>제 장점은 <span>{profile.comment} 😊</span></p>
              <div className="contact-container">
                <div className={`profile-contact ${profile.contact_id?.startsWith("@") ? "instagram" : "kakao"}`}>
                  <div className="profile-text">{profile.contact_id || "연락처 없음"}</div>
                  <div className="profile-right">
                    {profile.contact_id?.startsWith("@") ? (
                      <img
                        src="/assets/Mainpage/send.svg"
                        alt="Instagram Link"
                        onClick={() => {
                          const id = profile.contact_id.replace("@", "");
                          window.open(`https://www.instagram.com/${id}`, "_blank");
                        }}
                      />
                    ) : (
                      <img
                        src="/assets/Mainpage/kakao.svg"
                        alt="Kakao Link"
                        style={{ cursor: profile.contact_id ? "pointer" : "default", opacity: profile.contact_id ? 1 : 0.5 }}
                      />
                    )}
                    <img src="/assets/Mainpage/more.svg" alt="More Options" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MatchProfiles;
