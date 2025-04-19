import styled from "styled-components";
import hobbyData from "../data/hobbyData"

// 연락빈도에 따른 화살표 반환 함수
export const getArrowByFrequency = (frequency) => {
    switch (frequency) {
        case "자주":
            return "⬆️";
        case "보통":
            return "➡️";
        case "가끔":
            return "↘️";
        default:
            return "❔";
    }
};

// 취미 리스트를 이모티콘과 함께 매핑하는 함수
export const mapHobbiesWithIcons = (hobbyList) => {
    if (!hobbyList || hobbyList.length === 0) 
        return ["취미 없음"];
    
    return hobbyList.map((hobbyName) => {
        const matchedCategory = hobbyData.find(
            (category) => category.hobbies.some((hobby) => hobby.name === hobbyName)
        );
        const matchedHobby = matchedCategory?.hobbies.find((hobby) => hobby.name === hobbyName);

         matchedHobby? `${matchedHobby.emoji} ${hobbyName}`: hobbyName;
    });
};
export const mapHobbiesWithIconsButton = (hobbyList) => {
    if (!hobbyList || hobbyList.length === 0) return ['취미 없음'];
    
    return hobbyList.map((hobbyName) => {
      const matchedCategory = hobbyData.find((category) =>
        category.hobbies.some((hobby) => hobby.name === hobbyName)
      );
      const matchedHobby = matchedCategory?.hobbies.find((hobby) => hobby.name === hobbyName);
  
      return matchedHobby ? `${matchedHobby.emoji} ${hobbyName}` : hobbyName;
    });
  };
