import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { CardGroup } from 'reactstrap';
import Card from 'react-bootstrap/Card';
import logoExpress from '../logoExpress.png';
import Ticketinfoform from './Ticketinfoform';


export default function Home() {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function callNotices() {
      try {
        const response = await axios.get('/notices'); // 수정해야 할 경로
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }

    callNotices();
  }, []);

  const topNotices = notices
    .slice()
    .sort((a, b) => b.num - a.num)
    .slice(0, 3);
  
    
    return (
       <div className = "main">
        <div className = "slide-banner">
         <Carousel data-bs-theme = "dark">
      <Carousel.Item interval={1000}>
       <img className = "d-block w-100" src = {logoExpress}  alt = "First Slide" /> 
        <Carousel.Caption>
          <h3>첫번째 임시 이미지</h3>
          <p>첫번째 임시 이미지입니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img className = "d-block w-100" src = {logoExpress}  alt = "Seconde Slide" /> 
        <Carousel.Caption>
          <h3>두번째 임시 이미지</h3>
          <p>두번째 임시 이미지입니다.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className = "d-block w-100" src = {logoExpress}  alt = "Third Slide" /> 
        <Carousel.Caption>
          <h3>세번째 임시 이미지</h3>
          <p>
           세번째 임시 이미지입니다.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
        <br>
        </br>
       <Ticketinfoform />
        <br></br>
        <div className = "notice-list">
            <h2> 공지사항 </h2>

            <CardGroup>
          {topNotices.map((notice) => (
            <Card key={notice.num} border="dark" style={{ width: '18rem' }} onClick={() => {
              // 해당 게시글 상세보기 페이지로 프로그래밍 방식으로 이동
              navigate(`/notice/${notice.num}`);
            }}
             className = "notice-card-link" 
             >
              <Card.Body className = "notice-card-body">
                <Card.Title>{notice.title}</Card.Title>
                <Card.Text>{notice.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
        </div>
       </div>
    );
}
