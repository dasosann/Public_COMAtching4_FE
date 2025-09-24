import { style } from '@vanilla-extract/css';

export const contactMethodButtonImg = style({
  width: '16px',
  height: '16px',
  marginTop: '-3px',
});
export const snsText = style({
  fontWeight: 600,
  fontSize: '14px',
  transition: 'color 0.2s',
});

export const snsTextKakaoActive = style({
  color: '#000',
});
export const snsTextKakaoInactive = style({
  color: '#b3b3b3',
});
export const snsTextInstagramActive = style({
  color: '#fff',
});
export const snsTextInstagramInactive = style({
  color: '#b3b3b3',
});
export const snsTextPhoneActive = style({
  color: '#fff',
});
export const snsTextPhoneInactive = style({
  color: '#b3b3b3',
});
export const phonebutton = style({
  flex: '1',
  height: '48px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: 'none',
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const active = style({
  outline: 'none',
  border: 'none',
});
export const kakaoWrapperActive = style({
  backgroundColor: '#fee500',
});
export const kakaoWrapperInactive = style({
  backgroundColor: '#f5f5f5',
});
export const instagramWrapperActive = style({
  backgroundImage: 'linear-gradient(135deg, #ff775e, #ff4d61, #e83abc)',
});
export const instagramWrapperInactive = style({
  backgroundColor: '#f5f5f5',
});
export const phoneWrapperActive = style({
  backgroundColor: '#00d076',
});
export const phoneWrapperInactive = style({
  backgroundColor: '#f5f5f5',
});
export const inactive = style({
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.5)',
  color: '#b3b3b3',
  border: '1px solid #E8E8E8',
});

export const activeImg = style({
  filter: 'brightness(0) invert(1)',
});