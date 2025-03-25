import { style } from '@vanilla-extract/css';

export const genderButton = style({
  width: '80%',
  height: '40px',
  margin: '0px 5px',
  marginBottom: ' 10px',
  borderRadius: '40px',
  background: 'rgba(255, 244, 248, 0.81)', // 기존 색상보다 더 연한 핑크
  color: "#F57DB2",
  border: "1px solid #F57DB2",
  
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: 'bold',
  fontSize: '19px',
  
});

export const inactive = style({
  background: '#ffffff',
  border: '1px solid #e0e0e0',
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#a5a5a5',
});