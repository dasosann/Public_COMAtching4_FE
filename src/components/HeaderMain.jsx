import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css"; // Vanilla Extract 스타일 import
import { useState } from "react";
import styled, { keyframes } from "styled-components"; // 애니메이션용 스타일드 컴포넌트
import Modal from "../css/pages/Admin/AdminModalAll";
import fetchRequest from "../fetchConfig";

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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [isClosing, setIsClosing] = useState(false); // 닫힘 애니메이션 상태
  const copyAccountNumber = async () => {
    const accountNumber = "123-456-789012"; // 복사할 계좌번호
    try {
      await navigator.clipboard.writeText(accountNumber);
      alert("계좌번호가 복사되었습니다!"); // 사용자 피드백
    } catch (err) {
      console.error("계좌번호 복사 실패:", err);
      alert("계좌번호 복사에 실패했습니다.");
    }
  };
  const get1000Button = async () => {
    const res = fetchRequest("/auth/user/tempay/make1000", {
      method: "GET", // POST에서 GET으로 변경
    });
    const data = await res.json();
    console.log(data)
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
          <img
            className={styles.iconImage}
            src="/assets/Mainpage/kr-currency.svg"
            alt="알림 아이콘"
            onClick={openModal}
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
                <Modal.EventTextDiv
                  style={{ fontSize: "18px" }}
                  onClick={copyAccountNumber}
                >
                  입금 계좌
                  <br />
                  국민은행 123-456-789012 <br />
                  (예금주: 천승환)
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