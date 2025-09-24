import React from "react";
import ContactMethodButton from "./ContactMethodButton";
import * as styles from "../css/components/ContactMethodPick.css.ts";

function  ContactMethodPick({ user, setUser ,
  setIsContactVerified}) {
  const handleContactMethod = (method) => {
    setUser((prev) => ({
      ...prev,
      contact: method,
    }));
    setIsContactVerified(false);
  };

  return (
    <div className={styles.contactMethodPick}>
      <h3 style={{margin:0}}>연락수단</h3>
      <div className={styles.snsWrapper}>
        <ContactMethodButton
          isActive={user.contact === "instagram"}
          onClick={() => handleContactMethod("instagram")}
          type="instagram"
          image={`${import.meta.env.VITE_PUBLIC_URL}../../assets/insta.svg`}
          alt="인스타그램"
        />
        <ContactMethodButton
          isActive={user.contact === "kakao"}
          onClick={() => handleContactMethod("kakao")}
          type="kakao"
          image={`${import.meta.env.VITE_PUBLIC_URL}../../assets/kakao.svg`}
          alt="카카오아이디"
        />
        <ContactMethodButton
          isActive={user.contact === "phone"}
          onClick={() => handleContactMethod("phone")}
          type="phone"
          image={`${import.meta.env.VITE_PUBLIC_URL}../../assets/phone-number.svg`}
          alt="전화번호"
        />
      </div>
    </div>
  );
}

export default ContactMethodPick;