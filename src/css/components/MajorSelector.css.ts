
import { style } from '@vanilla-extract/css';

export const schoolRow = style({
  display: 'flex',
  marginBottom: '20px',
});

export const departmentRow = style({
  display: 'flex',
  gap: '22px',
  marginBottom: '15px',
});

export const school = style({
  width: '100%',
});

export const depart = style({
  width: 'calc(33%)',
  marginRight: '12px',
});

export const major = style({
  width: 'calc(67%)',
});

export const majorSelectorElementSelect = style({
  display: 'block',
  width: '100%',
  height: '35px',
  background: 'none',
  border: 'none', // 기존 테두리 제거
  borderBottom: '3px rgb(223, 223, 223) solid', // 아래에만 테두리 적용
  borderRadius: '0', // 둥근 모서리 제거
  padding: '0 12px',
  fontSize: '18px', // 글자 크기
  fontWeight: '600', // 세미볼드
  outline: 'none', // 클릭 시 기본 아웃라인 제거
});

export const emailVerificationRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px',
});

export const emailLabel = style({
  fontSize: '18px',
  fontWeight: '700',
  textAlign:'left',
});

export const emailInputContainer = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

export const emailInput = style({
  flex: '1',
  height: '35px',
  padding: '8px',
  fontSize: '14px',
  border: 'none',
  borderBottom: '2px solid #B3B3B3',
  outline: 'none',
});

export const verifyButton = style({
  height: '35px',
  padding: '0 15px',
  fontSize: '14px',
  fontWeight: 'bold',
  background: '#fff',
  color: '#000',
  border: '1px solid black',
  borderRadius: '5px',
  cursor: 'pointer',
});
export const verificationMessage = style({
  fontSize: '14px',
  fontWeight: '500',
  color: '#666666',
  marginTop: '8px',
  marginBottom:'2px',
  textAlign: 'left',
});

export const resendMessage = style({
  fontSize: '14px',
  fontWeight: '500',
  color: '#999999',
  marginTop: '0px',
  textAlign: 'left',
});

export const resendLink = style({
  color: '#999999',
  textDecoration: 'underline',
  cursor: 'pointer',
});
