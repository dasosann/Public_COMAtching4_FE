import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import ProgressNav from "../components/ProgressNav.jsx";
import Background from "../components/Background.jsx";
import SearchBar from "../components/SearchBar.jsx";
import hobbyData from "../data/hobbyData.js";
import "../css/pages/Hobby.css";
import decomposeHangul from "../utils/getChosung.js";

import { motion } from "framer-motion";

function Hobby() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [pickHobby, setPickHobby] = useRecoilState(userState);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input
  const [customHobbyInput, setCustomHobbyInput] = useState(""); // 커스텀 관심사 입력값
  const [customHobbies, setCustomHobbies] = useState([]); // 사용자 추가 관심사 목록

  const handleCustomHobbyChange = (e) => {
    const input = e.target.value;
    if (input.length <= 10) {
      setCustomHobbyInput(input);
    } else {
      alert("관심사는 10글자 이내로 입력해주세요.");
    }
  };
  
  

  


  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };
  const handleCustomHobbyKeyDown = (e) => {
    if (e.key === "Enter" && customHobbyInput.trim() !== "") {
      if (customHobbies.length < 3) {
        setCustomHobbies((prev) => [...prev, customHobbyInput.trim()]);
        setCustomHobbyInput(""); // 입력 필드 초기화
      } else {
        alert("최대 3개의 관심사만 추가할 수 있습니다.");
      }
    }
  };

  const filteredHobbyData = hobbyData.map((category) => ({
    ...category,
    hobbies: category.hobbies.filter((hobby) => {
      const decomposedHobby = decomposeHangul(hobby.name);
      const decomposedSearch = decomposeHangul(searchQuery);
  
      return decomposedSearch.every((searchChar, index) => {
        const hobbyChar = decomposedHobby[index];
        if (!hobbyChar) return false; // 검색어가 더 길면 제외
  
        // 초성, 중성, 종성 비교 조건
        if (decomposedSearch.length === 1) {
          // 검색어가 초성만 있을 경우
          return hobbyChar.chosung === searchChar.chosung;
        } else if (decomposedSearch.length === 2) {
          // 검색어가 초성 + 중성만 있을 경우
          return (
            hobbyChar.chosung === searchChar.chosung &&
            hobbyChar.jungsung === searchChar.jungsung
          );
        } else {
          // 검색어가 초성 + 중성 + 종성일 경우
          return (
            hobbyChar.chosung === searchChar.chosung &&
            hobbyChar.jungsung === searchChar.jungsung &&
            hobbyChar.jongsung === searchChar.jongsung
          );
        }
      });
    }),
  }));
  
  
  

  const handleSubmit = () => {
    if (pickHobby.hobby.length < 1) {
      alert("관심사를 최소 1개 이상 선택해주세요.");
      return false;
    }
    setUser((prevUser) => ({
      ...prevUser,
      hobby: pickHobby.hobby,
    }));
    console.log(user);
    navigate("/userinfo");
  };

  const handleHobbyClick = (name) => {
    const isAlreadySelected = pickHobby.hobby.includes(name);
    const updatedHobbies = isAlreadySelected
      ? pickHobby.hobby.filter((hobby) => hobby !== name)
      : pickHobby.hobby.length < 3
      ? [...pickHobby.hobby, name]
      : pickHobby.hobby;

    setPickHobby((prevUser) => ({
      ...prevUser,
      hobby: updatedHobbies,
    }));
  };

  return (
    <div className="container">
      <Background />
      <ProgressNav step={2} />
      <div className="text-container">
        <div className="main-text">당신의 관심사를 알려주세요.</div>
        <div className="sub-text">
          요즘 관심있는 것들을 1개 이상 선택해주세요. <br /> 최대 3개까지 선택할 수
          있어요.
        </div>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="hobby-container">
        {filteredHobbyData.map(
          (category, index) =>
            category.hobbies.length > 0 && ( // Display only categories with filtered hobbies
              <div className="hobby-category" key={index}>
                <div className="hobby-category-title">{category.category}</div>
                <div className="hobby-list">
                  {category.hobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className={`hobby-items ${
                        pickHobby.hobby.includes(hobby.name) ? "selected" : ""
                      }`}
                      onClick={() => handleHobbyClick(hobby.name)}
                    >
                      <span className="hobby-emoji">
                        {hobby.emoji} {hobby.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
        
      </div>
      <div className="hobby-container">
        <div className="hobby-category">
          <div className="hobby-category-title">내 관심사 추가하기</div>
          <div className="hobby-list">
            
            {customHobbies.map((hobby, index) => (
              <div
                key={index}
                className={`hobby-items ${
                  pickHobby.hobby.includes(hobby) ? "selected" : ""
                }`}
                onClick={() => handleHobbyClick(hobby)}
              >
                {hobby}
              </div>
            ))}
            <div className="hobby-items">
              <input
                type="text"
                value={customHobbyInput}
                onChange={handleCustomHobbyChange}
                onKeyDown={handleCustomHobbyKeyDown}
                placeholder="+내 관심사 추가하기"
                className="custom-hobby-input"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: `60px` }} />
      
      <button
        className={`submits-button ${
          pickHobby.hobby.length >= 1 ? "active" : "inactive"
        }`}
        onClick={pickHobby.hobby.length >= 1 ? handleSubmit : null}
        disabled={pickHobby.hobby.length < 1}
      >
        다음으로
      </button>
    </div>
  );
}

export default Hobby;