// Background.jsx
import React from 'react';
import '../css/components/Background.css'; // Make sure to create and import the CSS file

function Background() {
  return (
    <div className="background">
      <div className="blur-box right-box"></div>
      <div className="blur-box left-box"></div>
    </div>
  );
}

export default Background;