import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { priorityState, MatchPickState } from "../../Atoms.jsx";
import "../../css/components/MatchPriorityModal.css"

const mbtiLabels = {
  E: "외향형",
  I: "내향형",
  S: "감각형",
  N: "직관형",
  T: "사고형",
  F: "감정형",
  J: "판단형",
  P: "인식형",
};

const priorityMessages = {
  mbti: (value) => `${value}인 사람이면 좋겠어!`,
  hobby: (value) => `${value}에 관심이 많은 사람이면 좋겠어!`,
  age: (value) => {
    if (value === "YOUNGER") return "나보다 어린 사람이면 좋겠어!";
    if (value === "OLDER") return "나보다 나이 많은 사람이면 좋겠어!";
    return "나와 동갑인 사람이면 좋겠어!";
  },
  contact: (value) => {
    if (value === "FREQUENT") return "연락을 자주 하는 사람이면 좋겠어!";
    if (value === "NORMAL") return "연락을 적당히 하는 사람이면 좋겠어!";
    return "연락을 가끔 하는 사람이면 좋겠어!";
  },
};

const AnimatedBubble = ({ text }) => {
  return <div className="animated-bubble fade-in-top">{text}</div>;
};

const MatchPriorityModal = ({ modalOpen, toggleModal, togglePrioritySelection }) => {
  const [priorities] = useRecoilState(priorityState);
  const matchState = useRecoilValue(MatchPickState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBubble, setShowBubble] = useState(false);
  const [touchingItem, setTouchingItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dropZoneRef = useRef();

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalOpen]);

  const handleTouchStart = (item, e) => {
    setTouchingItem(item);
    setTouchPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!touchingItem || !isDragging) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    setTouchPos({ x, y });
  };

  const handleTouchEnd = () => {
    if (!touchingItem || !dropZoneRef.current) return;

    const dropRect = dropZoneRef.current.getBoundingClientRect();

    if (
      touchPos.x >= dropRect.left &&
      touchPos.x <= dropRect.right &&
      touchPos.y >= dropRect.top &&
      touchPos.y <= dropRect.bottom
    ) {
      setSelectedItem(touchingItem);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }

    setTouchingItem(null);
    setIsDragging(false);
  };

  const getOptionValue = (key) => {
    const { formData } = matchState;
    if (key === "age") return formData.ageOption;
    if (key === "contact") return formData.contactFrequencyOption;
    if (key === "hobby") return formData.hobbyOption[0] || "";
    if (key === "mbti") {
      const letters = formData.mbtiOption.split(",");
      return letters.map((l) => mbtiLabels[l] || l).join(", ");
    }
    return "";
  };

  const getMessage = (key) => {
    const rawValue = getOptionValue(key);
    return priorityMessages[key]?.(rawValue) || "";
  };

  if (!modalOpen) return null;

  return (
    <div className="match-modal-overlay">
      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-modal-header">
          <p className="modal-title">중요한 옵션 선택</p>
          <button className="close-button" onClick={toggleModal}>닫기</button>
        </div>

        <div className="match-modal-body">
          <p>가장 중요하게 생각하는 옵션을 하나만 올려주세요.</p>
          <p>AI가 해당 옵션을 가장 우선순위로 생각할 거에요!</p>

          <div className="priority-drop-zone" ref={dropZoneRef}>
            {selectedItem ? (
              <>
                <div className="selected-priority-box fade-in-top">Comatching AI 야, 이 옵션은 꼭 지켜줘!</div>
                <div className="selected-priority2-box fade-in-bottom">{getMessage(selectedItem.key)}</div>
                <button
                  className="cancel-selection-button fade-in-bottom"
                  onClick={() => setSelectedItem(null)}
                >
                  선택 취소
                </button>
              </>
            ) : (
              <div className="drop-placeholder">
                <img src="/assets/Match/important.svg" alt="" />
                <p>중요한 옵션을 여기 올려놓으세요!</p>
              </div>
            )}
            {showBubble && <AnimatedBubble text="AI가 이걸 제일 중요하게 생각할게요!" />}
          </div>

          <div className="priority-buttons">
            {priorities
              .filter((item) => item.id !== selectedItem?.id)
              .map((item) => (
                <div
                  key={item.id}
                  className={`priority-box-item ${isDragging && touchingItem?.id === item.id ? "" : "animated-option"}`}
                  onTouchStart={(e) => handleTouchStart(item, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={
                    isDragging && touchingItem?.id === item.id
                      ? {
                          position: "absolute",
                          left: touchPos.x - 60,
                          top: touchPos.y - 30,
                          zIndex: 1000,
                          pointerEvents: "none",
                        }
                      : {}
                  }
                >
                  <div className="priority-box-label">
                    {item.label}
                    <span className="priority-box-value">{getOptionValue(item.key)}</span>
                  </div>
                  <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
                </div>
              ))}
          </div>

          <div
            className={`modal-button ${selectedItem ? "enabled" : "disabled"}`}
            onClick={() => {
              if (!selectedItem) return;
              console.log("선택된 옵션:", selectedItem);
              toggleModal();
              togglePrioritySelection();
            }}
          >
            {selectedItem ? "선택 완료" : "옵션을 선택해주세요"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPriorityModal;
