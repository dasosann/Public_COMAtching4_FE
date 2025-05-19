import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css"; // Vanilla Extract 스타일 import
import { useState } from "react";
import styled, { keyframes } from "styled-components"; // 애니메이션용 스타일드 컴포넌트
import Modal from "../css/pages/Admin/AdminModalAll";
import fetchRequest from "../fetchConfig";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
const AccountLine = styled.div`
  display: block;
  margin-bottom: 0.2rem; /* 줄 간격 조정 */
  text-align: center;
  font-size: 18px;
  letter-spacing: -0.03em;
`;
// 애니메이션 정의
const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const fadeOutSlideDown = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
`;

// Modal.ModalContainer를 감싸는 애니메이션 래퍼
const AnimatedModalContainer = styled.div`
  animation: ${({ isClosing }) =>
    isClosing ? fadeOutSlideDown : fadeInSlideUp} 0.3s ease-out forwards;
`;

  
function HeaderMain() {
  const [userInfo, setUserInfo] = useRecoilState(userState); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [isClosing, setIsClosing] = useState(false); // 닫힘 애니메이션 상태
  const fetchUserPoints = async () => {
    try {
      const response = await fetchRequest("/auth/user/api/points", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo((prev)=>({
          ...prev,
          point: data.data,
        })); // 백엔드에서 point 반환 가정
      } else {
        console.error("포인트 조회 실패");
      }
    } catch (error) {
      console.error("포인트 조회 중 오류:", error);
    }
  };
  const copyAccountNumber = async () => {
    const accountNumber = "1001-4935-3543"; // 복사할 계좌번호
    try {
      await navigator.clipboard.writeText(accountNumber);
      alert("계좌번호가 복사되었습니다!"); // 사용자 피드백
    } catch (err) {
      console.error("계좌번호 복사 실패:", err);
      alert("계좌번호 복사에 실패했습니다.");
    }
  };
  
const get1000Button = async () => {
  try {
      const res = await fetchRequest("/auth/user/tempay/make1000", {
          method: "GET",
      });
      const data = await res.json();
      console.log("1000원 버튼 응답:", data);
      // 포인트 재조회
      if(data.code==="GEN-000"){
        await fetchUserPoints();
        alert("1000원 버튼 요청이 완료되었습니다!");
        return;
      }
      else if(data.code==="CHR-001"){
        alert("보유 포인트가 1000원 이상입니다.");
        return;

      }
      else if(data.code==="CHR-002"){
        alert("이미 천원 버튼을 사용했습니다..");
        return;

      }
      else if(data.code==="CHR-003"){
        alert("현재 천원 버튼이 비활성화 되어 있습니다.");
        return;

      }
  } catch (err) {
      console.error("1000원 버튼 요청 실패:", err);
  }
};
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false); // 열릴 때는 닫힘 애니메이션 비활성화
  };

  // 모달 닫기
  const closeModal = () => {
    setIsClosing(true); // 닫힘 애니메이션 시작
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false); // 애니메이션 완료 후 초기화
    }, 300); // 애니메이션 지속 시간(0.3s)과 일치
  };
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <object
          className={styles.logoImg}
          data={`${import.meta.env.VITE_PUBLIC_URL}../../assets/logoblacknav.svg`}
          type="image/svg+xml"
          aria-label="로고"
        >
          <span>로고</span>
        </object>
      </div>
      <div>
        <div className={styles.iconWrapper}>
          <img style={{width:'17px', height:'17px'}}
            className={styles.iconImage}
            src="/assets/Mainpage/kr-currency.svg"
            alt="알림 아이콘"
            // onClick={openModal}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal.Overlay onClick={closeModal}>
          <AnimatedModalContainer isClosing={isClosing}>
            <Modal.ModalContainer onClick={(e) => e.stopPropagation()} style={{transform: 'translate(-50%, -50%)'}}>
              <Modal.ModalContent
                style={{
                  letterSpacing: "-0.03em",
                  textAlign: "center",
                  flexDirection: "column",
                  paddingTop: "30px",
                  gap: "20px",
                  paddingBottom: "30px",
                }}
              >
                  <Modal.EventTextDiv onClick={copyAccountNumber}   style={{ fontSize: "18px" }}>
                    <AccountLine>입금 계좌</AccountLine>
                    <AccountLine>토스뱅크 1001-4935-3543</AccountLine>
                    <AccountLine>(예금주: 서승준)</AccountLine>
                  </Modal.EventTextDiv>
                <button
                  style={{
                    backgroundColor: "#ff",
                    borderRadius: "8px",
                  }} onClick={get1000Button}
                >
                  1000원 맞추기
                </button>
              </Modal.ModalContent>
              <Modal.ModalConfirm>
                <Modal.ModalConfirmButton onClick={closeModal}>
                  확인
                </Modal.ModalConfirmButton>
              </Modal.ModalConfirm>
            </Modal.ModalContainer>
          </AnimatedModalContainer>
        </Modal.Overlay>
      )}
    </div>
  );
}

export default HeaderMain;