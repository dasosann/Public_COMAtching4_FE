import React, { useState, useEffect } from "react";
import "../css/pages/Loading.css";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import HeaderBack from "../components/Match-result/Header.jsx";
const Loading = () => {
  const [offset, setOffset] = useState(-100);
  const navigate = useNavigate();

  useEffect(() => {
    
    const redirectTimeout = setTimeout(() => {
      navigate("/match-result");

    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="container">
      <Background/>
      <HeaderBack />
      <div className="contents">
        <div className="LoadingText">
          코매칭 AI가 입력하신 결과를 바탕으로 <br />
          비슷한 매칭 상대를 찾고 있어요..
        </div>
        
        
      </div>
    </div>
  );
};

export default Loading;