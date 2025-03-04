import { style } from '@vanilla-extract/css';

export const header = style({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    zIndex:'3',
    paddingTop:'30px',
});
export const left = style({
    
    zIndex: 30, 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});
export const logoImg = style({
    width: '140px',
    height: '40px',
    cursor: 'pointer',
    
});
export const right = style({
    width: '78px',
    height: '20px',
    zIndex: 30, 
    cursor: 'pointer',
    borderRadius: '24px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
});

// 첫 번째 이미지 (point) 스타일
export const pointImage = style({
    width: '20px',
    height: '20px',
    marginRight: '8px', // 텍스트와 이미지 사이에 간격 추가
});

// 두 번째 이미지 (toggle) 스타일
export const toggleImage = style({
    width: '8px',
    height: '8px',
});

// span 요소 스타일
export const spanText = style({
    fontFamily: 'Pretendard',
    fontWeight: 'bold',
    fontSize: '15px',
    marginRight: '8px', // 텍스트와 이미지 사이에 간격 추가
});
export const center = style({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    fontSize: '15px',
    fontWeight: 'bold',
});

export const logoImage = style({
    width: '108px',
    height: '47px',
    marginRight:'5px',
    cursor: 'pointer',
});
export const iconWrapper = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "white",
    borderRadius: "50%",
  });
  
  export const iconImage = style({
    width: "25px",
    height: "25px",
    objectFit: "contain",
  });