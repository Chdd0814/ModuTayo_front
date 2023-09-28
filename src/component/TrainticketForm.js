import React, {useState,useEffect} from "react";
import { Button, ButtonGroup, FormControl,  ListSubheader, Select, InputLabel, MenuItem, 
  Menu, Modal, Box, Grid, Tabs, Tab, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Divider } from "@mui/material";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import calluserInfo from "./calluserInfo";


function TrainTicketForm() {

    const [tripType, setTripType] = useState("one-way"); 
    const [selectedType, setSelectedType] = useState(''); 
    const [selectLocation, setSelectLocation] = useState([]);
    const [ktxStationsByCity, setKtxStationsByCity] = useState({}); 
    const [datevalue, setdatevalue] = useState(dayjs()); // 날짜 
    const [party, setParty] = useState(''); // 인원
    const [trainTicketinfo, settrainTicketinfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const [name, setName] = useState(''); // 이름 상태
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [mileage, setMileage] = useState(''); // 마일리지 상태
    const [isUsingMileage, setIsUsingMileage] = useState(false);
    const [mileageDiscount, setMileageDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const mileageDiscountRate = 0.2;

    

    const handleSubmit = async (event) => {

        event.preventDefault();
    
         // 선택한 출발지와 도착지 값 가져오기
    const depPlaceId = event.target.elements.depPlace.value;
    const arrPlaceId = event.target.elements.arrPlace.value;
    const formattedDate = datevalue.format("YYYYMMDD");

    const handleMileageUsage = () => {
      setIsUsingMileage(!isUsingMileage); // 마일리지 사용 상태 토글
    };

    try {
      // Axios를 사용하여 백엔드 API에 POST 요청 보내기
      const response = await axios.get("/publicApi/getTrainInfoList", {
        params: {
          depPlaceId,
          arrPlaceId,
          depPlaceTime: formattedDate, 
        },
      });

      // 응답 데이터 출력
      console.log("응답 데이터:", response.data);
      settrainTicketinfo(response.data);
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
    
      };

      const handleParty = (event) => {
        setParty(event.target.value);
      };

    const handleTripTypeChange = (type) => {
        setTripType(type);
        setSelectedType(selectedType);
      };

      useEffect(() => {
        const userinfo = calluserInfo();
        if (userinfo) {
          setName(userinfo.name);
          setPhoneNumber(userinfo.phonenumber);
          setMileage(userinfo.mileage);
        }
      }, []);
      useEffect(() => {
        const fetchStationsForCities = async () => {
          const tempStationsByCity = {};
          for (const city of selectLocation) {
            const response = await axios.get(`/publicApi/getCitySttnList?cityCode=${city.cityCode}`);
            const responseData = response.data;
            tempStationsByCity[city.cityCode] = responseData; // responseData가 지하철역 정보 배열
          }
          setKtxStationsByCity(tempStationsByCity);
        };
        fetchStationsForCities();
      }, [selectLocation]);
      
      
      useEffect(() => {
        const fetchcityCodeList = async () => {
          try {
            const response = await axios.get('/publicApi/getCityCodeList');
            const responseData = response.data;
            setSelectLocation(responseData);
          } catch (error) {
            console.error("API 호출 실패(지역코드)", error);
          }
        };
        fetchcityCodeList();
      }, []);

      const handleSelection = (item) => {
        // 선택된 데이터(selectedItem)를 예매 페이지로 전달하는 로직을 구현
        // 예: 예매 페이지로 이동하면서 선택된 데이터를 URL 매개변수로 전달
        // 예매 페이지로 이동하는 부분은 React Router나 다른 라우팅 방식을 사용하실 수 있습니다.
        setSelectedItem(item);
        setIsModalOpen(true);
      };

      const handleSuccessCloseModal = () => {
        // 모달 닫기
        setIsModalOpen(false);
        
        // 여기에서 결제 페이지로 이동하도록 구현
        window.location.href = "/PaymentPage"; // 예시 URL
      };
      
      const handleCloseModal = () => {
        setIsModalOpen(false);

      }




      const handleSeatSelect = (seat) => {
        setSelectedSeat(seat);
      };

      const handleMileageUsage = () => {
        if (!isUsingMileage) {
          // 마일리지를 사용하는 경우
          const discountAmount = (selectedItem.Fare * mileageDiscountRate).toFixed(0);
          const discountedPrice = selectedItem.Fare - discountAmount;
      
          // 할인된 가격과 마일리지 사용 여부를 업데이트
          setMileageDiscount(discountAmount);
          setTotalPrice(discountedPrice);
        } else {
          // 마일리지를 사용하지 않는 경우
          // 할인된 가격을 초기화
          setMileageDiscount(0);
          // 원래 가격으로 복원
          setTotalPrice(selectedItem.Fare);
        }
      
        // 마일리지 사용 여부를 토글
        setIsUsingMileage(!isUsingMileage);
      };
    


    return (
    <div className = "Trainticket-form">

    <div className="trainform-button-status-group">
    <ButtonGroup variant="outlined" aria-label = "outlined button group">
    <Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
    <Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
    </ButtonGroup>
    </div>


{tripType === 'one-way' && (
    
    <form onSubmit = {handleSubmit} className = "form-ticketinfo-form">
  <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">출발지</InputLabel>
        <Select defaultValue="" id="depPlace"name="depPlace" label="Grouping">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectLocation.map(city => [
              <ListSubheader key={city.cityCode}>{city.cityName}</ListSubheader>,
              ...(ktxStationsByCity[city.cityCode] || []).map(station => (
                  <MenuItem key={station.nodeId} value={station.nodeId}>
                {station.nodeName}
              </MenuItem>
            ))
        ])}
      </Select>
    </FormControl>

<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">도착지</InputLabel>
        <Select defaultValue="" id="arrPlace" name="arrPlace" label="Grouping">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectLocation.map(city => [
              <ListSubheader key={city.cityCode}>{city.cityName}</ListSubheader>,
            ...(ktxStationsByCity[city.cityCode] || []).map(station => (
              <MenuItem key={station.nodeId} value={station.nodeId}>
                {station.nodeName}
              </MenuItem>
            ))
        ])}
        </Select>
      </FormControl>

<FormControl sx={{ m: 1, minWidth: 120 }}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="날짜"
          value={datevalue}
          onChange={(newdatevalue) => setdatevalue(newdatevalue)}
          />
        </DemoContainer>
       </LocalizationProvider>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">인원</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={party}
          label="Age"
          onChange={handleParty}
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {[...Array(10)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
        {index + 1}
      </MenuItem>
    ))}
        </Select>
        </FormControl>
        <IconButton type="sumbit" color = "primary" aria-label = "search submit" size = "large">
            <SearchOutlinedIcon fontSize="inherit"/>
        </IconButton>
          </form>
)}

{trainTicketinfo.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>출발지</TableCell>
                <TableCell>도착지</TableCell>
                <TableCell>출발시간</TableCell>
                <TableCell>도착시간</TableCell>
                <TableCell>기차종류</TableCell>
                <TableCell>가격</TableCell>
                {/* 추가 열 제목들 */}
                <TableCell>선택</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainTicketinfo.map((item) => (
                <TableRow key={item.trainNum}>
                  <TableCell>{item.depPlaceName}</TableCell>
                  <TableCell>{item.arrPlaceName}</TableCell>
                  <TableCell>{item.depPlandTime}</TableCell>
                  <TableCell>{item.arrPlandTime}</TableCell>
                  <TableCell>{item.trainGradeName}-{item.trainNum}</TableCell>
                  <TableCell>{item.Fare}</TableCell>
                  {/* 추가 열 데이터들 */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelection(item)}
                    >
                      선택
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
      )}

  <Modal open={isModalOpen} onClose={handleCloseModal} style = {{display : 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="train-modal-content">
            {/* 모달 내용 */}
            {selectedItem && (
            
            <Grid container spacing={2} sx={{ backgroundColor: 'background.paper', borderRadius: '8px', width: '800px', height: '650px' }}>
            <Grid item xs={8}>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  width: '80%',
                  height: '70%', // 높이를 100%로 지정
                  margin: '16px',
                  padding : '16px',
                  
                }}
              >
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>탑승정보</Typography>
                <TextField id="standard-basic" label="이름" variant="standard" className="fieldStyles" defaultValue= {name} InputProps={{ readOnly: true }}/>
                <TextField id="standard-basic" label="전화번호" variant="standard" className="fieldStyles" defaultValue = {phoneNumber} InputProps={{ readOnly: true }} />
                <ChildModal onSelectSeat={handleSeatSelect}/>
                
                {/* 좌석 선택 칸 만들기 */}
              </Box>
            </Grid>
    
            <Grid item xs={4}>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  width: '80%',
                  height: '70%', // 높이를 100%로 지정
                  margin: '16px',
                  padding: '16px 16px 0px',
                  
                }}
              >
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>기차정보</Typography>
                <Typography>{selectedItem.depPlaceName} - {selectedItem.arrPlaceName} </Typography>
                <Typography>{datevalue.format("YYYYMMDD")}</Typography>
                <Typography>{selectedItem.depPlandTime} ~ {selectedItem.arrPlandTime} </Typography>
                <Typography>{selectedItem.trainGradeName} - {selectedItem.trainNum}</Typography>
                {/* <Typography>가격 : {selectedItem.Fare}</Typography> */}
              </Box>
            </Grid>
    
            <Grid item xs={8}>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  width: '80%',
                  height: '30%', // 높이를 100%로 지정
                  margin: '16px',
                  padding: '16px 16px 0px',
                }}
              >
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>기차표 수령방법</Typography>
                <Typography sx = {{ textAlign: 'left', fontWeight : 'light',fontSize : 12}}>전자탑승권</Typography>
                <Typography sx = {{fontSize : 10, fontWeight : 'bold'}}>기차표 인쇄가 필요하지 않습니다. 즉시 발권 및 사용 가능합니다.</Typography>
                <Typography sx = {{fontSize : 10, fontWeight : 'bold'}}>모두타요 웹에서 확인 가능합니다.</Typography>
              </Box>
            </Grid>

            
            <Grid item xs={4} sx = {{height : '30%'}}>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  width: '80%',
                  height: '30%', // 높이를 100%로 지정
                  margin: '16px',
                  padding: '16px 16px 0px',
                }}
              >
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>요금정보</Typography>
                <Typography>기차표 운임</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{selectedItem.Fare} 원</Typography>
                <Typography>마일리지 할인</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{mileageDiscount} 원</Typography>
                <Divider/>
                <Typography>총금액</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}> {totalPrice}원</Typography>
              </Box>
              </Grid>

            <Grid item xs={8} >
      <Box
        sx={{
          background: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        width: '80%',
        height: '30%', // 높이를 100%로 지정
        margin: '16px',
        padding: '1px 8px 0px',
        textAlign: 'center', // 가운데 정렬
        }}
      >
        <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>할인</Typography>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // 가로 선상에 정렬
          justifyContent: 'flex-start', // 텍스트 필드와 버튼 사이에 간격 주기
        }}
      >
        <TextField
          id="standard-read-only-input"
          label="내 마일리지"
          value={isUsingMileage ? mileage - mileageDiscount : mileage}
          InputProps={{ readOnly: true }}
          variant="standard"
          className="fieldStyles"
        />
        <Button variant="text" color="primary" onClick={handleMileageUsage}>
        {isUsingMileage ? "사용취소" : "사용하기"}
        </Button>
      </Box>
      </Box>
    </Grid>      

              
    
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="train-sumbitBtn-Group" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    className="PaymentSuccessBtn"
                    variant="contained"
                    color="primary"
                    onClick={handleSuccessCloseModal}
                    sx={{
                      width: '150px',
                      height: '30px',
                    }}
                  >
                    결제
                  </Button>
                </Box>
              </Grid>
    
              <Grid item xs={6}>
                <Box className="train-sumbitBtn-Group" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button
                    className="PaymentCancelBtn"
                    variant="contained"
                    color="primary"
                    onClick={handleCloseModal}
                    sx={{
                      width: '150px',
                      height: '30px',
                    }}
                  >
                    취소
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
            )}
          </div>
        </Modal>
      </div>


      );

  }

  function ChildModal({ onSelectSeat }) {

    const [open, setopen] = React.useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [seatText, setSeatText] = useState("");
    const [CarText, setCarText] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);

    const handleOpen = () => {
      setopen(true);
    }
    const handleClose = () => {
      setopen(false);
    }

    const handleCarClick = (carNumber) => {
      setSelectedCar(carNumber);
      setCarText(carNumber); 
    };

    const handleSeatClick = (seat) => {
      // 좌석을 선택하면 해당 좌석을 상태에 저장
      setSelectedSeat(seat);
      setSelectedCar(selectedCar); 
      onSelectSeat(selectedSeat);
      setSeatText(seat);
      setopen(false);
    };


    const seatLayout = [];
    const rows = 5; // 행 수
    const cols = 10; // 열 수
    const columns = ["A", "B", "", "C", "D"]; // 빈 열 추가
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (columns[i] !== "") {
          row.push(`${columns[i]}${j + 1}`);
        } else {
          row.push(""); // 빈 데이터 추가
        }
      }
      seatLayout.push(row);
    }

    const carData = Array.from({ length: 10 }, (_, index) => index + 1); // 1부터 10까지 칸 번호 생성

    

    


    return ( 
  <React.Fragment>
    <TextField
      id="standard-basic"
      label="좌석선택"
      variant="standard"
      className="fieldStyles"
      onClick={handleOpen}
      value = {seatText}
      
    />

  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        width: 800, // 모달의 너비 조정
        height: 400, // 모달의 높이 조정
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 2,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column", // 내부 요소를 세로로 정렬
        alignItems: "center", // 가로로 가운데 정렬
      }}
    >
      {/* 좌석 선택 UI */}
      <Grid container spacing={1} style={{ marginBottom: "20px" }}>
        <Grid item>
          {carData.map((carNumber) => (
            <Button
              key={carNumber}
              variant="contained"
              color={selectedCar === carNumber ? "error" : "primary"}
              style={{ width: '60px', height: '40px', fontSize: '12px', marginBottom: "10px" }}
              onClick={() => handleCarClick(carNumber)}
            >
              {carNumber}호차
            </Button>
          ))}
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            {seatLayout.map((row, rowIndex) => (
              <Grid key={rowIndex} container spacing={1}>
                {row.map((seat) => (
                  <Grid key={seat} item>
                    {seat ? (
                      <Button
                        variant="contained"
                        color={selectedSeat === seat ? "error" : "primary"}
                        style={{ width: '40px', height: '40px', fontSize: '12px' }}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {seat}
                      </Button>
                    ) : (
                      <div style={{ width: '40px', height: '40px' }}></div>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={handleClose}>닫기</Button>
    </Box>
  </Modal>
  </React.Fragment>

  );

}

export default TrainTicketForm;