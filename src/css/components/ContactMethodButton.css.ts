import { style } from '@vanilla-extract/css';

export const contactMethodButtonImg = style({
  width: '16px',
  height: '16px',
  marginTop: '-3px',
});

export const phonebutton = style({
  width: '25%',
  height: '28px',
  borderRadius: '40px',
  backgroundColor: '#ffffff',
  border: 'none',
  marginTop: '17px',
  marginRight: '6px',
  transition: 'all 0.3s',
});

export const active = style({
  outline: 'none',
  border: 'none',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
});
export const kakaoWrapper = style({
  backgroundImage: 'linear-gradient(135deg,rgba(255, 235, 106, 0.29), rgb(255, 235, 106))', 
  
});
export const instagramWrapper = style({
  backgroundImage: 'linear-gradient(135deg, #ff775e, #ff4d61, #e83abc)', 
  
});
export const inactive = style({
  borderRadius: '40px',
  backgroundColor: '#ffffff',
  color: '#a5a5a5',
  border: '2px solid #e0e0e0',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25) inset',
});

export const activeImg = style({
  filter: 'brightness(0) invert(1)',
});