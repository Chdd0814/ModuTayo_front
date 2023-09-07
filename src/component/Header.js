
import React  from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logoExpress from '../logoExpress.png';
import mainLogo from '../mainLogo.png';

function Header({ isLoggedIn, onLogout }) {

  const navigate = useNavigate(); // useNavigate 훅에서 반환되는 함수

  const handleNavigation = (path) => {
    navigate(path); // 내비게이션 함수 호출
  };

  const handleLogout = () => {
    onLogout(); // 로그아웃 버튼 클릭 시 로그아웃 처리
    handleNavigation('/'); // 네비게이션 바 변경
  };
    return (
        // <Navbar fixed = "top" className="bg-body-tertiary" bg = "primary" data-bs-theme ="dark">
        // <Container>
          <Navbar bg="primary" lg = "" data-bs-theme="dark" className = "bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={() => handleNavigation('/')}> 
          <img
              alt=""
              src= {mainLogo}
              width="100"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation('/train')}>기차</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/bus')}>버스</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/lineinfo')}>노선정보</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/notice')}>공지사항</Nav.Link>
          </Nav>
          {isLoggedIn ? ( 
           <Nav className = "me-2">
           <Nav.Link onClick={() => handleNavigation('/mypage')}>마이페이지</Nav.Link>
           <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
            </Nav>
          ):(
            <Nav className = "me-2">
            <Nav.Link onClick={() => handleNavigation('/login')}>로그인</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/register')}>회원가입</Nav.Link>
            </Nav>
          )}
       
        </Container>
      </Navbar>
      
      
    );
  
}

export default Header;