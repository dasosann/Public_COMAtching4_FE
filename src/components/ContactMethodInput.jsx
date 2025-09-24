import React from "react";
import MyInput from "./MyInput";
import * as styles from "../css/components/ContactMethodInput.css.ts";
import axios from "../axiosConfig";

function ContactMethodInput({ handleChange, isContactVerified,setIsContactVerified,user, setUser  }) {
  // 중복 여부 확인 함수
  // const checkIfExists = async () => {
    // contact_id가 @로 시작하면 @를 제거
    // const contactId = user.contact_id.startsWith("@")
    //   ? user.contact_id.slice(1)
    //   : user.contact_id;
    // const contact = user.contact;
    // 서버에 중복 여부를 확인하는 GET 요청
    // const response = await axios.get(
    //   `/account/contact/duplication?contactId=${contactId}&contactType=${contact}`
    // );
    // 응답 코드에 따른 처리
  //   if (response.data.status === 200) {
  //     const duplication = response.data.data.is_duplication;
  //     return duplication;
  //   } else {
  //     throw new Error("Unexpected response code or status");
  //   }
  // };
  // 입력 값 확인 및 유효성 검사 함수
  const handleCheck = async () => {
    // 카카오 ID 유효성 검사 패턴
    const kakaoPattern = /^(?!.*\..)(?!.*\.$)(?!^\.)[a-zA-Z0-9-_.]{3,15}$/;
    // 인스타그램 ID 유효성 검사 패턴
    const instagramPattern = /^@[a-zA-Z0-9_.]+$/;
    // 휴대폰 번호 11자리 정수 패턴 (010으로 시작, 하이픈 없이)
    const phonePattern = /^010\d{8}$/;

    // contact 값에 따른 유효성 검사
    if (user.contact === "kakao") {
      if (!kakaoPattern.test(user.contact_id)) {
        alert("카카오 ID 형식이 올바르지 않습니다.");
        return;
      }
      setUser(prevUser => ({ ...prevUser, contact_id_Verified: true }));
      alert('입력한 정보는 사용 가능합니다.');
      setIsContactVerified(true);
    } else if (user.contact === "instagram") {
      if (!instagramPattern.test(user.contact_id)) {
        alert("인스타 아이디는 @을 붙이고 영어, 숫자, 언더바(_), 마침표(.)만 가능합니다.");
        return;
      }
      setUser(prevUser => ({ ...prevUser, contact_id_Verified: true }));
      setIsContactVerified(true);
      alert('입력한 정보는 사용 가능합니다.');
    } else if (user.contact === "phone") {
      if (!phonePattern.test(user.contact_id)) {
        alert("휴대폰 번호는 010으로 시작하는 11자리 숫자(하이픈 없이)여야 합니다.");
        return;
      }
      setUser(prevUser => ({ ...prevUser, contact_id_Verified: true }));
      setIsContactVerified(true);
      alert('입력한 정보는 사용 가능합니다.');
    }

    // 중복 여부 확인
   
  };
  return (
    <div className={styles.contactInput}>
      <MyInput
        name="contact_id"
        value={user.contact_id}
        onChange={handleChange}
        placeholder={
          user.contact === "kakao"
            ? "ex) kakao12"
            : user.contact === "instagram"
            ? "ex) @cuk_coma (@ 필수)"
            : user.contact === "phone"
            ? "ex) 01012345678"
            : "연락처를 입력하세요"
        }
        className={styles.inputField}
      />
      <button
        type="button"
        className={`${styles.checkButton} ${isContactVerified ? styles.verifiedButton : ''}`}
        onClick={handleCheck}
        disabled={isContactVerified} // 인증됐으면 비활성화
      >
        {isContactVerified ? "확인완료" : "중복확인"}
      </button>

    </div>
  );
}

export default ContactMethodInput;