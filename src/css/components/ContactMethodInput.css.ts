import { style } from '@vanilla-extract/css';

export const contactInput = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  whiteSpace: 'nowrap',
  marginTop: '6px',
});

export const inputField = style({
  marginRight: '10px',
  marginLeft: '0px',
  color: '#858585',
  fontFamily: '"Pretendard", Helvetica',
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  border: '1px solid #ccc',
  borderRadius: '15px',
  padding: '8px',
  position: 'relative',
});

export const checkButton = style({
  color:'#B3B3B3',
  height: '40px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '15px',
  marginLeft: '15px',
  fontSize:'14px',
});
export const verifiedButton = style({
  backgroundColor: ' #d3d3d3', // 연한 회색
  color: '#666',
  cursor: 'default',
});