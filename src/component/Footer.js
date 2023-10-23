import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './Footer.css';

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  const location = useLocation();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    // 페이지의 스크롤 높이를 가져옴
    const pageHeight = document.body.scrollHeight;
    // 브라우저 창의 높이를 가져옴
    const windowHeight = window.innerHeight;

    // 내용이 적을 때만 Footer를 고정
    if (pageHeight < windowHeight) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [location.pathname]);

  const footerStyle = {
    position: isFixed ? 'fixed' : 'static',
    bottom: 0,
    width: '100%',
  };

  return (
    <div id="main-footer" className="text-center p-2" style={footerStyle}>
      <Row>
        <Col>
          <p>
            Copyright &copy; <span>{thisYear()} Korea Polytechnics 2-B 1st Group Project</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
