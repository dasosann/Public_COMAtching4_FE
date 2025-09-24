import { style } from '@vanilla-extract/css';

export const contactMethodPick = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  whiteSpace: 'nowrap',
});

export const snsWrapper = style({
  width: '100%',
  display:'flex',
  justifyContent:'space-between',
  gap:'8px',
  marginTop:'12px',
})
