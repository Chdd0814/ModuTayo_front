import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './Footer.css';

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  const footerStyle = {
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
