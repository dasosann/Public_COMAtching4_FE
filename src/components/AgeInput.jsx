import React, { Fragment } from "react";
import * as styles from "../css/components/AgeInput.css";
import AgeSelectorElement from "./AgeSelectorElement.jsx";

function AgeInputInput({ user, setUser }) {
  // 연도, 월, 일 옵션 배열 (예시: 1980~2019, 1~12, 1~31)
  const year = Array.from({ length: 40 }, (_, i) => (1980 + i).toString());
  const month = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const day = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  // 연도 변경 핸들러
  const handleYearChange = (e) => {
    setUser((prev) => ({
      ...prev,
      year: e.target.value,
    }));
  };

  // 월 변경 핸들러
  const handleMonthChange = (e) => {
    setUser((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };

  // 일 변경 핸들러
  const handleDayChange = (e) => {
    setUser((prev) => ({
      ...prev,
      day: e.target.value,
    }));
  };

  return (
    <Fragment>
      <h3 className={styles.agetitle}>생년월일</h3>
      <div className={styles.age}>
        {/* 연도 셀렉트 */}
        <AgeSelectorElement
          placeholder="년도"
          fieldType={styles.Field}
          selectname="year"
          value={user.year || ""}
          onChange={handleYearChange}
          options={year}
        />

        {/* 월 셀렉트 */}
        <AgeSelectorElement
          placeholder="월"
          fieldType={styles.Field}
          selectname="month"
          value={user.month || ""}
          onChange={handleMonthChange}
          options={month}
        />

        {/* 일 셀렉트 */}
        <AgeSelectorElement
          placeholder="일"
          fieldType={styles.Field}
          selectname="day"
          value={user.day || ""}
          onChange={handleDayChange}
          options={day}
        />
      </div>
    </Fragment>
  );
}

export default AgeInputInput;
