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
import mainLogo from '../ModuTayo.png';
import mainLogoBG from '../ModuTayoBG.png';
import mainLogoBGTitle from '../ModuTayoBGTitle.png';
import Ticketinfoform from './Ticketinfoform';
import {Skeleton,Typography} from '@mui/material';
import Footer from './Footer.js';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [banner,setBanner]=useState([]);
  const [imageData,setImageData]=useState([]);
  const [noticeData,setNoticeData]=useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function callNotices() {
      try {
        const [responseNotices, responseBanner] = await Promise.all([
          axios.get('/notices'),
          axios.get('/banner/getbannerList')
        ]);
        setNotices(responseNotices.data);
        setBanner(responseBanner.data);  
       
        // bannerPhoto를 Blob URL로 변환
        const imageUrls = responseBanner.data.map(banner => {
          if(banner.bannerPhoto!==null){
          const binaryString = window.atob(banner.bannerPhoto);
          const bytes = new Uint8Array(binaryString.length);
          for (let j = 0; j < binaryString.length; j++) {
              bytes[j] = binaryString.charCodeAt(j);
          }
          const blob = new Blob([bytes], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        } });

        setImageData(imageUrls); // 변환된 Blob URL을 상태에 저장

        const imageNoticeUrls = responseNotices.data.map(banner => {
          if(banner.file!==null){
          const binaryString = window.atob(banner.file);
          const bytes = new Uint8Array(binaryString.length);
          for (let j = 0; j < binaryString.length; j++) {
              bytes[j] = binaryString.charCodeAt(j);
          }
          const blob = new Blob([bytes], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
      }});

        setNoticeData(imageNoticeUrls); // 변환된 Blob URL을 상태에 저장
        
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }

    callNotices();
    
  }, []);

 
    
    return (
       <div className = "main">
        <h1 className = "mainSentence">기차와 버스, 여행지 정보까지! 모두타요</h1>
        <div className = "slide-banner">
         <Carousel data-bs-theme = "dark">
          {banner.map((item,index)=>(
      <Carousel.Item interval={5000}>
         {imageData[index]?
        <img className = "d-block w-100" src = {imageData[index]}  alt = "First Slide" height={550}/>:
        <Skeleton variant="rectangular"  className = "d-block w-100" height={550}/>}  
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </Carousel.Caption>
      </Carousel.Item>))
      }
    </Carousel>
        </div>
        <br>
        </br>
       <Ticketinfoform />
        <br></br>
        <div className = "notice-list">
            <h2> 공지사항 </h2>
            <Row xs={1} md={3} className="g-4">
          {notices.map((notice,idx) => (
            <Col key={idx}>
            <Card key={notice.num} border="dark"  onClick={() => {
              // 해당 게시글 상세보기 페이지로 프로그래밍 방식으로 이동
              navigate(`/notice/${notice.num}`);
            }} className = "notice-card-link" >  
            {noticeData[idx]?
            <Card.Img height={359} src={noticeData[idx]} />:<Skeleton variant="rectangular"  className = "d-block w-100" height={359}/>}   
            <Card.Body className = "notice-card-body">
                <Card.Title>{notice.title}</Card.Title>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
        </div>
       </div>
    );
}
