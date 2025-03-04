import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { priorityState } from "../../Atoms.jsx";
import "../../css/pages/Matching.css";

const MatchPriorityModal = ({ modalOpen, toggleModal ,togglePrioritySelection}) => {
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // 📌 Cleanup: 모달이 언마운트될 때 `modal-open`을 무조건 제거
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalOpen]);

  const [priorities, setPriorities] = useRecoilState(priorityState);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  if (!modalOpen) return null;

  // 📌 터치 시작 (드래그 시작)
  const onTouchStart = (event, index) => {
    const touch = event.touches[0]; // 첫 번째 터치 가져오기
    setDraggingItem(index);
    setDragOffset({
      x: touch.clientX - event.target.getBoundingClientRect().left,
      y: touch.clientY - event.target.getBoundingClientRect().top,
    });
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  // 📌 터치 이동 (드래그 중)
  const onTouchMove = (event) => {
    if (draggingItem === null) return;
    const touch = event.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });

    const newList = [...priorities];
    const draggedBox = newList[draggingItem];

    // 📌 드래그 위치를 기준으로 새 위치 찾기
    let newIndex = newList.findIndex((_, i) => {
      const rect = document.getElementById(`priority-item-${i}`).getBoundingClientRect();
      return touch.clientY < rect.top + rect.height / 2;
    });

    // 📌 맨 아래로 드래그하면 자동으로 4번째로 이동
    const lastItemRect = document.getElementById(`priority-item-${newList.length - 1}`).getBoundingClientRect();
    if (touch.clientY > lastItemRect.bottom - 10) {
      newIndex = newList.length - 1; // 마지막 순서로 이동
    }

    // 위치 변경
    if (newIndex !== -1 && newIndex !== draggingItem) {
      newList.splice(draggingItem, 1);
      newList.splice(newIndex, 0, draggedBox);
      setDraggingItem(newIndex);
      setPriorities(newList);
    }
  };

  // 📌 터치 끝 (위치 확정)
  const onTouchEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div className="match-modal-overlay" onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-modal-header">
          <p className="modal-title">우선순위 선택</p>
          <button className="close-button" onClick={toggleModal}>닫기</button>
        </div>

        <div className="match-modal-body">
          <p>AI가 우선순위를 설정해서 골라줘요.</p>
          <p>내가 원하는 상대를 더 잘 고를 수 있어요!</p>
        </div>

        {/* 우선순위 리스트 */}
        <div className="priority-list">
          {priorities.map((item, index) => (
            <div
              key={item.id}
              id={`priority-item-${index}`}
              className={`priority-item ${draggingItem === index ? "dragging" : ""}`}
              onTouchStart={(event) => onTouchStart(event, index)}
              style={
                draggingItem === index
                  ? { position: "absolute", left: `${touchPos.x - dragOffset.x}px`, top: `${touchPos.y - dragOffset.y}px`, zIndex: 1000 }
                  : {}
              }
            >
              <div className="circle">{index + 1}</div>
              <div className="priority-box">
                <span className="priority-text">{item.label}</span>
                <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="modal-button" onClick={() => { 
          toggleModal(); 
          togglePrioritySelection(); 
        }}>
          선택 완료
        </div>
      </div>
    </div>
  );
};

export default MatchPriorityModal;
