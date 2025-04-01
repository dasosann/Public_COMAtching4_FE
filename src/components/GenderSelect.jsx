import { Fragment } from "react";
import GenderButton from "./GenderButton";
import * as styles from "../css/components/GenderSelect.css.ts";

function GenderSelect({ user, setUser, setIsGenderSelected  }) {
  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value,
    }));
    setIsGenderSelected(true);
  };

  return (
    <Fragment>
      <h3>성별</h3>
      <div className={styles.genderContainer}>
        <GenderButton
          isActive={user.gender === "MALE"}
          value="MALE"
          onClick={() => handleGenderSelection("MALE")}
          label="남자"
        />
        <GenderButton
          isActive={user.gender === "FEMALE"}
          value="FEMALE"
          onClick={() => handleGenderSelection("FEMALE")}
          label="여자"
        />
      </div>
    </Fragment>
  );
}

export default GenderSelect;
