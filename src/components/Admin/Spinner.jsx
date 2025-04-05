import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading, size = 50, color = "#123abc" }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px' // 원하는 높이로 조정 가능
    }}>
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Spinner;
