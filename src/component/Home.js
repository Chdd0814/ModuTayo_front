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
// import { Autocomplete, TextField, Box, Button } from '@mui/material';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

// function TicketInfoform() {
//   const [tripType, setTripType] = useState('one-way');
//   const [transportType, setTransportType] = useState('train');
//   const [selectedType, setSelectedType] = useState('');

//   const handleTripTypeChange = (type) => {
//     setTripType(type);
//     setSelectedType(selectedType);
//   };

//   const handleTransportTypeChange = (type) => {
//     setTransportType(type);
//     setSelectedType(type === 'train' ? '기차' : '버스');
//   };
  



  // return (
    
//     <div className="ticket-info-form">
//       <h3>빠른 검색</h3>
//       <Form>
//         <ButtonGroup className = "ticket-info-form-buttonGroup">
//           <Button onClick={() => handleTripTypeChange('round-trip')} variant="light">왕복</Button>
//           <Button onClick={() => handleTripTypeChange('one-way')} variant="light">편도</Button>
//           <DropdownButton as={ButtonGroup} title={selectedType ? selectedType : '종류'} id="bg-nested-dropdown" variant="light">
//             <Dropdown.Item eventKey="train" onClick={() => handleTransportTypeChange('train')}>기차</Dropdown.Item>
//             <Dropdown.Item eventKey="bus" onClick={() => handleTransportTypeChange('bus')}>버스</Dropdown.Item>
//           </DropdownButton>
//         </ButtonGroup>

//         {tripType === 'round-trip' && transportType === 'train' && (
//           <Row xs="auto">
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
            
//             <br />
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
           
//           </Row>
          
//         )}

//         {tripType === 'one-way' && transportType === 'train' && (
//           <Row xs="auto">
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
            
//           </Row>
//         )}

// {tripType === 'round-trip' && transportType === 'bus' && (
//           <Row xs="auto">
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
           
//             <br />
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
            
//           </Row>
          
//         )}

//         {tripType === 'one-way' && transportType === 'bus' && (
//           <Row xs="auto">
//             <FormSelectControl label="출발지" />
//             <FormSelectControl label="도착지" />
//             <FormSelectControl label="출발시간" />
//             <FormSelectControl label="인원" />
            
//           </Row>
//         )}
      

//         <Button className = "ticket-info-form-submitButton"variant="secondary" size="lg" type="submit" xs = "auto">
//           검색
//         </Button>
//       </Form>
//     </div>
//   );

// }

// function FormSelectControl({ label }) {
//   return (
//     <Col>
//       <FloatingLabel controlId={`floatingSelectGrid-${label}`} label={label}>
//         <Form.Select aria-label={`Floating label select for ${label}`}>
//           <option>Open this select menu</option>
//           <option value="1">One</option>
//           <option value="2">Two</option>
//           <option value="3">Three</option>
//         </Form.Select>
//       </FloatingLabel>
//     </Col>
//   );
// }

export default function Home() {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function callNotices() {
      try {
        const response = await axios.get('/api/notices'); // 수정해야 할 경로
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
