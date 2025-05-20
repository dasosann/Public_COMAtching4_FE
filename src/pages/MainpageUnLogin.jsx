import { useEffect, useState } from "react";
import "../css/pages/MainpageUnLogin.css";
import Footer from "../components/Footer.jsx";
import TotalUsersCounter from "../components/TotalUsersCounter.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background.jsx";
import UnloginModal from "../components/Mainpage/UnloginModal.jsx";
import HeaderUnlogin from "../components/Mainpage/Header.jsx";
import { motion, AnimatePresence } from "framer-motion"; // ✅ 추가

function MainpageUnLogin() {
  const navigate = useNavigate();
  const [numParticipants, setNumParticipants] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleKakaoLogin = () => {
    // window.location.href = "https://backend.comatching.site/oauth2/authorization/kakao";
    alert("5월 21일 오전 10시부터 시작합니다!!")
  };

  const handleGoogleLogin = () => {
    // window.location.href = "https://backend.comatching.site/oauth2/authorization/google";
    alert("5월 21일 오전 10시부터 시작합니다!!")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend.comatching.site/api/participations");
        if (response.status === 200) {
          setNumParticipants(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setNumParticipants]);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Background />
      <HeaderUnlogin />

      {/* 인삿말 애니메이션 */}
      <motion.div
        className="greeting-message"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        반갑습니다<br />
        코매칭이라면 당신은<br />
        이미 커플입니다
      </motion.div>

      <div style={{ marginTop: "69px" }}>
        <div className="bubble">
          <TotalUsersCounter font_size="16px" numParticipants={numParticipants} />
        </div>
        <motion.button
        className="kakao-login"
        onClick={handleKakaoLogin}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="kakao-login-element">
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/kakao.svg`}
            alt="카카오"
          />
          <p>카카오로 시작하기</p>
        </div>
      </motion.button>
        
      </div>

      <motion.div
        className="help-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        또는
      </motion.div>

      <motion.a
        className="privacy-button"
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
      >
        다른방법 로그인
      </motion.a>

      {/* 모달 등장 애니메이션 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            <UnloginModal
              onClose={() => setShowModal(false)}
              handleGoogleLogin={handleGoogleLogin}
              handleKakaoLogin={handleKakaoLogin}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MainpageUnLogin;
