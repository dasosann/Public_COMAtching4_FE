// mbtiMaker.css.ts
import { style } from "@vanilla-extract/css";

export const mbtiMaker = style({
  boxSizing: "border-box", // 올바른 box-sizing 속성
  textAlign: "center",
  maxWidth:'376px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: "calc(100% - 18px)", // 9px + 9px = 18px
  position: "fixed", // 화면 아래에 고정
  bottom: "0px", // 화면의 아래쪽에 위치
  // left: "0px", // 양쪽 여백 균등하게 설정 (40px 중 절반)
  display: "inline-block",
  borderRadius: "16px 16px 0 0", // 위쪽만 둥글게
  padding: "25px 20px", // 적절한 패딩
  // boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)", // 위쪽 그림자
  // border: "1px solid rgba(49, 14, 14, 0.8)", // 테두리
  // backgroundColor: "white", // 배경색 제거
  backdropFilter: "blur(50px)", // 선택적으로 배경 블러 유지
  backgroundColor: 'radial-gradient(100% 195.02% at 3.86% 0%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)' /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.08), 0px 4px 16px rgba(0, 0, 0, 0.08)',
});


export const mbtiMakerText = style({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
  textAlign: "left",
  marginLeft: "5px",
});

export const mbtiMakerChooseButton = style({
  display: "flex",
  alignItems: "center",
  background: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "32px",
  marginBottom: "12px",
  width: "100%",
  fontFamily: '"Pretendard", sans-serif',
  color: "#000000",
  fontSize: "18px",
  fontWeight: "bold",
  opacity: '0.8',
});

export const selected = style({
  backgroundImage: "linear-gradient(135deg, #ff775e, #ff4d61, #e83abc)", // 사진의 그라데이션 색상
  border: "1px solid rgba(255, 119, 94, 0.8)", // 업데이트된 테두리 색상
  color: "#ffffff",
  boxShadow: `inset 2px 2px 10px rgba(255, 119, 94, 0.5),
              inset 0px 4px 10px rgba(0, 0, 0, 0.15),
              inset 4px 4px 15px rgba(0, 0, 0, 0.2)`, // 내부 그림자
              opacity: '1',
});


export const mbtiMakerButtonTitle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000000",
  color: "#ffffff",
  width: "36px",
  height: "36px",
  borderRadius: "100px",
  marginRight: "15px",
  
});

export const mbtiMakerButtonText = style({
  fontWeight: "600",
  marginLeft:'auto',
  marginRight:'auto',
  fontSize:'20px',
});

export const mbtiMakerSubmitButton = style({
  backgroundImage: "linear-gradient(135deg, #ff775e, #ff4d61, #e83abc)",
  borderRadius: "36px",
  height: "40px",
  width: "40%",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "60%",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  marginBottom:"10px",
  
});