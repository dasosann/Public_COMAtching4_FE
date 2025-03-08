import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/MatchProfiles.css";

const MatchProfiles = ({ profiles = [] }) => {
  const settings = {
    dots: true,             // 페이지네이션 점을 보여줍니다.
    infinite: false,        // 무한 슬라이드 여부 (true로 하면 마지막에서 첫번째로 자연스럽게 이동)
    speed: 500,             // 애니메이션 속도 (ms)
    slidesToShow: 1,        // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1,      // 한 번에 이동할 슬라이드 수
    swipe: true,            // 터치 스와이프 활성화
    arrows: false,          // 좌우 화살표 비활성화 (필요에 따라 true로 변경 가능)
  };

  if (profiles.length === 0) {
    return (
      <div className="no-match">
        <img src="/assets/Mainpage/logo.svg" alt="No Match" className="no-match-icon" />
        <p className="no-match-text">아직 매칭된 상대가 없어요.</p>
        <p className="no-match-subtext">나와 딱 맞는 이성친구를 만들어봐요!</p>
      </div>
    );
  }

  return (
    <Slider {...settings} className="profile-slider">
      {profiles.map((profile, index) => (
        <div key={index} className="profile-box">
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
      ))}
    </Slider>
  );
};

export default MatchProfiles;
