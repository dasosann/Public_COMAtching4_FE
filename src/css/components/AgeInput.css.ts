import { style } from '@vanilla-extract/css';

export const age = style({
  display: 'flex',
  justifyContent: 'space-between', // 좌우 공간 균등 분배
  alignItems: 'center',
  marginTop: '6px',
  marginBottom: '24px',
});



export const agetitle = style({
  marginTop:"25px"
});
export const myinput = style({
  flex: 1,
  border: 'none', // 기존 테두리 제거
  borderBottom: '3px rgb(223, 223, 223) solid', 
  background: 'none',
  fontSize: '18px', // 글자 크기
  fontWeight: '600', // 세미볼드
  
});
export const input = style({
  
  background: 'none',
  border: 'none',
});

export const Field = style({
  width: "28%",
  height: "48px",
  
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});