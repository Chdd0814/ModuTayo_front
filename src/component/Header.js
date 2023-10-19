import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainLogoTitle from '../ModuTayoBGTitle.png';
import './Header.css'; // CSS 파일을 import

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    onLogout();
    handleNavigation('/');
  };

  return (
    <Navbar className="custom-navbar"> {/* 커스텀 클래스를 적용 */}
      <Container>
        <Navbar.Brand onClick={() => handleNavigation('/')}>
          <img
            alt=""
            src={mainLogoTitle}
            width="150"
            height="35"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => handleNavigation('/train')}>기차</Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/bus')}>버스</Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/lineinfo')}>노선정보</Nav.Link>
          <Nav.Link onClick={() => handleNavigation('/notice')}>공지사항</Nav.Link>
        </Nav>
        <Nav className="me-2">
          {isLoggedIn ? (
            <>
              <Nav.Link onClick={() => handleNavigation('/mypage')}>마이페이지</Nav.Link>
              <Button variant="secondary" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Nav.Link onClick={() => handleNavigation('/login')}>로그인</Nav.Link>
              <Nav.Link onClick={() => handleNavigation('/register')}>회원가입</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
  