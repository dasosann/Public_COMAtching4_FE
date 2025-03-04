import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/components/Navbar.css'; // 별도의 CSS 파일을 사용한다고 가정

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="navbar">
      <Link to="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
        <img
          src={pathname === '/' ? './assets/homeactive.svg' : './assets/home.svg'}
          alt="Home"
          className="icon"
        />
        <span className="label">Home</span>
      </Link>

      <Link to="/chat" className={`nav-item ${pathname === '/chat' ? 'active' : ''}`}>
        <img
          src={pathname === '/chat' ? './assets/chatactive.svg' : './assets/chat.svg'}
          alt="Chat"
          className="icon"
        />
        <span className="label">Chat</span>
      </Link>

      <Link to="/mypage" className={`nav-item ${pathname === '/mypage' ? 'active' : ''}`}>
        <img
          src={pathname === '/mypage' ? './assets/mypageactive.svg' : './assets/mypage.svg'}
          alt="My Page"
          className="icon"
        />
        <span className="label">My Page</span>
      </Link>
    </div>
  );
};

export default NavBar;
