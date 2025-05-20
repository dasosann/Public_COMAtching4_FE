import React, { useState } from "react";
import "../css/pages/QnAPage.css";
import Background from "../components/Background";
import HeaderBack from "../components/HeaderBack";

const qnaData = [
  {
    question: "계좌 번호를 모르겠어요?",
    answer: "토스뱅크 1001-4935-3543 예금주: 서승준",
  },
  {
    question: "AI 작동방법",
    answer: "매칭 시작 버튼을 누르면 AI가 조건에 맞는 상대를 추천해 줍니다.",
  },
  {
    question: "포인트 충전 시간은 얼마나 걸리나요?",
    answer: "포인트충전은 평균 2~3분 내로 완료됩니다.",
  },
  {
    question: "충전이 안 들어와요",
    answer: `다음과 같은 경우일 수 있습니다:\n- 실명으로 미입금한 경우\n- 실명으로 입금했으나 서비스 내에 실명을 입력하지 않은 경우\n👉 위 사항을 확인해주시고, 문제가 지속되면 인스타그램 @coma 계정으로 문의주세요.`,
  },
  {
    question: "오류가 발생했어요",
    answer: "통합 오류가 발생한 경우 coma 인스타그램(@coma)로 문의해주세요!",
  },
  {
    question: "매칭이 안돼요",
    answer: "조건이 너무 까다로운 경우 매칭이 지연될 수 있습니다. 조건을 완화해보세요.",
  },
  {
    question: "연락이 안와요",
    answer: "상대방이 아직 메시지를 확인하지 않았을 수 있습니다. 조금만 기다려주세요.",
  },
];

const QnAPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="qna-page">
      <Background />
      <HeaderBack />
      <h2 className="qna-title">자주 묻는 질문 (Q&A)</h2>
      <div className="qna-list">
        {qnaData.map((item, index) => (
          <div key={index} className="qna-item">
            <div className="qna-question" onClick={() => toggleIndex(index)}>
              {item.question}
            </div>
            {openIndex === index && (
              <div className="qna-answer">
                {item.answer.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;
