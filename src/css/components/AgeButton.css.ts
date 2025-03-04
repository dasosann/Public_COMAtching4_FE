import { style } from '@vanilla-extract/css';
import React, { useState } from "react";

export const ageButton = style({
  width: '25%',
  height: '54px',
  fontSize: '22px',
  margin: '0px 5px',
  borderRadius: '40px',
  backgroundColor: '#ffffff',
  fontWeight: "bold",
  color: '#a5a5a5',
  border: '2px solid #e0e0e0',
});

export const active = style({
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: "bold",
  background: 'linear-gradient(45deg, #F8D1E0 0%, #FFFFFF 75%)', // 기존 색상보다 더 연한 핑크
  color: "#F57DB2",
  border: "1px solid #F57DB2", // 2px 두께의 경계선, 색상은 #F57DB2
});
