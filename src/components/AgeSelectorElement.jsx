import React from "react";
import * as styles from "../css/components/MajorSelector.css.ts"; // Vanilla Extract 스타일 임포트
function AgeSelectorElement({
  placeholder,
  fieldType,
  selectname,
  value,
  onChange,
  options,
}) {
  return (
    <div className={fieldType}>
      
      <select
        className={styles.majorSelectorElementSelect}
        name={selectname}
        value={value}
        onChange={onChange}
      >
        <option value="" className={styles.majorSelectorElementOption} disabled>
          선택
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AgeSelectorElement;
