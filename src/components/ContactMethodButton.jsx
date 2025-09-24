import React from "react";
import * as styles from "../css/components/ContactMethodButton.css.ts";

function ContactMethodButton({ isActive, onClick, type, image, alt }) {
  // type에 따라 텍스트 지정
  let label = "";
  if (type === "kakao") label = "카카오";
  else if (type === "instagram") label = "인스타";
  else if (type === "phone") label = "전화번호";


  // 타입별 텍스트 색상 클래스 (active/unactive)
  let textClass = styles.snsText;
  if (type === "kakao") textClass += ` ${isActive ? styles.snsTextKakaoActive : styles.snsTextKakaoInactive}`;
  else if (type === "instagram") textClass += ` ${isActive ? styles.snsTextInstagramActive : styles.snsTextInstagramInactive}`;
  else if (type === "phone") textClass += ` ${isActive ? styles.snsTextPhoneActive : styles.snsTextPhoneInactive}`;

  // Wrapper 스타일 분기
  let wrapperClass = styles.phonebutton + ' ' + (isActive ? styles.active : styles.inactive);
  if (type === "kakao") wrapperClass += ' ' + (isActive ? styles.kakaoWrapperActive : styles.kakaoWrapperInactive);
  else if (type === "instagram") wrapperClass += ' ' + (isActive ? styles.instagramWrapperActive : styles.instagramWrapperInactive);
  else if (type === "phone") wrapperClass += ' ' + (isActive ? styles.phoneWrapperActive : styles.phoneWrapperInactive);

  // type/active에 따라 color 값 분기 (SVG fill="currentColor" 필요)
  let iconColor = '';
  if (type === "kakao") iconColor = isActive ? '#fee500' : '#b3b3b3';
  else if (type === "instagram") iconColor = isActive ? '#ff4d61' : '#b3b3b3';
  else if (type === "phone") iconColor = isActive ? '#00d076' : '#b3b3b3';

  return (
    <button
      type="button"
      className={wrapperClass}
      onClick={onClick}
    >
      <img
        src={image}
        alt={alt}
        className={styles.contactMethodButtonImg}
        style={{ color: iconColor }}
      />
      <span className={textClass}>{label}</span>
    </button>
  );
}

export default ContactMethodButton;
