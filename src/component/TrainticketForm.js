import React, {useState,useEffect} from "react";
import { Button, ButtonGroup, FormControl,  ListSubheader, Select, InputLabel, MenuItem, 
  Menu, Modal, Box, Grid, Tabs, Tab, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Divider, CircularProgress } from "@mui/material";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import calluserInfo from "./calluserInfo";
import { useNavigate } from 'react-router-dom';
import Traintabpanel from "./Traintabpanel";


  function TrainTicketForm({ isLoggedIn }) {

      const [tripType, setTripType] = useState("one-way"); 
      const [selectedType, setSelectedType] = useState(''); 
      const [selectLocation, setSelectLocation] = useState([]);
      const [ktxStationsByCity, setKtxStationsByCity] = useState([]); 
      const [datevalue, setdatevalue] = useState(dayjs()); // 날짜 
      const [party, setParty] = useState(1); // 인원
      const [roundparty,setroundParty] = useState(1);
      const [trainTicketinfo, settrainTicketinfo] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedItems, setSelectedItems] = useState(null);
      const [selectedroundItems, setSelectedroundItems] = useState(null);
      const [selectedSeat, setSelectedSeat] = useState(null);
      const [selectedCar, setSelectedCar] = useState(null);
      const [roundselectedSeat, setroundSelectedSeat] = useState(null);
      const [roundselectedCar, setroundSelectedCar] = useState(null);
      const [name, setName] = useState(''); // 이름 상태
      const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
      const [mileage, setMileage] = useState(''); // 마일리지 상태
      const [id, setid] = useState('');
      const [isUsingMileage, setIsUsingMileage] = useState(false);
      const [mileageDiscount, setMileageDiscount] = useState(0);
      const [ticketPrice, setTicketPrice] = useState(0);
      const [totalPrice, setTotalPrice] = useState(0);
      const [roundticketPrice, setroundTicketPrice] = useState(0);
      const [roundtotalPrice, setroundTotalPrice] = useState(0);
      const navigate = useNavigate(); 
      const [usedMileage, setusedMileage] = useState(0);


      const [depStation, setdepStation] = useState(''); // 기차 출발지
      const [depStationName, setdepStationName] = useState(''); // 기차 출발지 이름
      const [arrStation, setarrStation] = useState(''); // 기차 도착지
      const [arrStationName, setarrStationName] = useState(''); // 기차 도착지 이름
      const [rounddepStation, setrounddepStation] = useState(''); // 기차 출발지 왕복
      const [rounddepStationName, setrounddepStationName] = useState(''); // 기차 출발지 이름
      const [roundarrStation, setroundarrStation] = useState(''); // 기차 도착지 왕복
      const [roundarrStationName, setroundarrStationName] = useState(''); // 기차 도착지 이름 왕복
      const [rounddepPlaceTime, setrounddepPlaceTime] = useState(dayjs());
      const [trainCityCode, settrainCityCode] = useState(11);
      const [trainModalopen, settrainModalOpen] = useState(false);
      const [trainModalopen2, settrainModalOpen2] = useState(false);
      const [checkData, setcheckData] = useState(false);
      const [roundtrainInfo, setroundtrainInfo] = useState([]);
      const [trainCombinedata, settrainCombinedata] = useState([]);
      const [trainShowtable, settrainShowtable] = useState(true);
      const [trainroundShowtable,settrainroundShowtable] = useState(false);
      const [sumPrice,setsumPrice] = useState(totalPrice + roundtotalPrice);
      

      const handleLoginCheck = () => {
        if (!isLoggedIn) {
          // 비로그인 사용자인 경우 /login 페이지로 이동
          alert('로그인이 필요합니다.'); // 또는 원하는 메시지를 표시할 수 있습니다.
          navigate('/login');
        } else {
          // 로그인된 사용자의 경우 다른 작업 수행
          
        }
      };

   // 무작위로 기차 좌석(trainCarNumber)과 좌석 번호(trainseatNumber)를 생성하는 함수
function generateRandomTrainSeat() {
  const maxCarNumber = 10; // 총 량 수 (예: 10량)
  const seatsPerCar = 40; // 각 량의 좌석 수 (예: 40개 좌석)

  // 무작위로 량 번호(trainCarNumber) 생성 (1부터 maxCarNumber까지)
  const randomCarNumber = Math.floor(Math.random() * maxCarNumber) + 1;

  // 무작위로 좌석 번호(trainseatNumber) 생성 (A1부터 D10까지)
  const seatLetters = ["A", "B", "C", "D"];
  const randomLetter = seatLetters[Math.floor(Math.random() * seatLetters.length)];
  const randomSeatNumber = Math.floor(Math.random() * 10) + 1; // 1부터 10까지의 숫자

  return { trainCarNumber: randomCarNumber, trainseatNumber: `${randomLetter}${randomSeatNumber}` };
}
function bookRandomTrainSeat() {
  const { trainCarNumber, trainseatNumber } = generateRandomTrainSeat();
  

  setSelectedCar(trainCarNumber);
  setSelectedSeat(trainseatNumber);

}

function roundbookRandomTrainSeat() {
  const { trainCarNumber, trainseatNumber } = generateRandomTrainSeat();
  

  setroundSelectedCar(trainCarNumber);
  setroundSelectedSeat(trainseatNumber);

}

useEffect(() => {
  bookRandomTrainSeat();
  roundbookRandomTrainSeat();
}, []);


      const handleSubmit = async (event) => {

          event.preventDefault();

        if (tripType === 'one-way') {

        
          // 선택한 출발지와 도착지 값 가져오기
      const depPlaceId = depStation;
      const arrPlaceId = arrStation;
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
        sessionStorage.removeItem("trainReservation");

      
    
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    } else if (tripType === 'round-trip') {

      const depPlaceId = depStation;
      const arrPlaceId = arrStation;
      const formattedDate = datevalue.format("YYYYMMDD");

      let wayData = [];
      let roundData = [];

      try {
        const response = await axios.get("/publicApi/getTrainInfoList", {
          params: {
            depPlaceId,
            arrPlaceId,
            depPlaceTime: formattedDate,
          },
        });

        console.log("가는편 응답 데이터:", response.data);
        wayData = response.data;
        settrainTicketinfo(response.data);
      } catch (error) {
        console.error("가는편 API 호출 실패:", error);
      }

      // 오는편 정보 가져오기
      const rounddepPlaceId = rounddepStation;
      const roundarrPlaceId = roundarrStation;
      const roundformattedDate = rounddepPlaceTime.format("YYYYMMDD");

      try {
        const roundResponse = await axios.get("/publicApi/getTrainroundInfoList", {
          params: {
            depPlaceId: rounddepPlaceId,
            arrPlaceId: roundarrPlaceId,
            depPlaceTime: roundformattedDate,
          },
        });

        console.log("오는편 응답 데이터:", roundResponse.data);
        roundData = roundResponse.data; 
        setroundtrainInfo(roundResponse.data);
        sessionStorage.removeItem("trainReservation");
      } catch (error) {
        console.error("오는편 API 호출 실패:", error);
      }

    }
        };

      const handleParty = (event) => {
        setParty(event.target.value);
      };

      const handleroundParty = (event) => {
        setroundParty(event.target.value);
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
          setid(userinfo.sub);
        }
      }, []);

      useEffect(() => {
        // 세션 스토리지에서 데이터 읽어오기
        const trainInfoStr = sessionStorage.getItem("trainReservation");
        const trainInfo = JSON.parse(trainInfoStr);
       
        if (trainInfo !== null) {
          // 기차 정보가 있는 경우 상태를 업데이트
          setTripType(trainInfo.tripType);
          setdepStation(trainInfo.depStationId);
          setarrStation(trainInfo.arrStationId);
          setdepStationName(trainInfo.depStationName);
          setarrStationName(trainInfo.arrStationName);
          setdatevalue(dayjs(trainInfo.depDate));
          setParty(trainInfo.party);
          setroundParty(trainInfo.roundparty);
          setrounddepStation(trainInfo.roundDepStationId);
          setroundarrStation(trainInfo.roundArrStationId);
          setrounddepStationName(trainInfo.roundDepStationName);
          setroundarrStationName(trainInfo.roundArrStationName);
          setrounddepPlaceTime(dayjs(trainInfo.roundDepDate));
        }
      
        // 해당 상태가 변경될 때마다 실행하도록 종속성 배열 설정
      }, [setdepStation, setarrStation, setdepStationName, 
        setarrStationName, setdatevalue, setrounddepStation, 
        setroundarrStation, setrounddepStationName, setroundarrStationName, 
        setrounddepPlaceTime,setParty,setroundParty]);

      
        useEffect(() => {
          const fetchMileage = async () => {
            try {
              const response = await axios.get("/Mileage/getMileage", {
                params: {
                  id: id,
                },
              });
      
              if (response.status === 200) {
                setMileage(response.data);
              } else {
                console.error('Failed to fetch mileage.');
              }
            } catch (error) {
              console.error('An error occurred:', error);
            }
          };
      
          fetchMileage();
        }, [id]);



      // 선택한 지역 코드에 맞는 지하철역 데이터를 가져오는 API 호출
 const fetchStationsForCity = async (cityCode) => {
  try {
    const response = await axios.get(`/publicApi/getCitySttnList?cityCode=${cityCode}`);
    const responseData = response.data;
    
    setKtxStationsByCity(responseData);
    console.log(responseData); // 여기에서 출력
  } catch (error) {
    console.error("API 호출 실패(지하철역)", error);
  }
};
      
      
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
        setTicketPrice(item.Fare * party);
        setTotalPrice(item.Fare * party);
        setSelectedItems(item);
        if (tripType === 'one-way') {
          setIsModalOpen(true);
          settrainShowtable(false);
        } else {
          settrainShowtable(false);
          settrainroundShowtable(true);
        }
      };

      const handleroundSelection = (item) => {
        // 선택된 데이터(selectedItem)를 예매 페이지로 전달하는 로직을 구현
        // 예: 예매 페이지로 이동하면서 선택된 데이터를 URL 매개변수로 전달
        setroundTicketPrice(item.roundFare * roundparty);
        setroundTotalPrice(item.roundFare * roundparty);
        setsumPrice(calSumprice(ticketPrice,item.roundFare * party));
        setSelectedroundItems(item);
        setIsModalOpen(true);
        setroundtrainInfo(true);

      };

      const calSumprice = (totalPrice, roundTotalPrice) => {
        return totalPrice + roundTotalPrice;
      };

     
      const handleSuccessCloseModal = () => {
        // 모달 닫기
        setIsModalOpen(false);
        
        saveDataTobeforePay();
        navigate("/payment");
      };
      
      const handleCloseModal = () => {
        setIsModalOpen(false);

      }


      const trainTabsSelect = (event, newValue) => {
        settrainCityCode(newValue);
        fetchStationsForCity(newValue);
      };
      
      // 지하철역을 선택했을 때 호출되는 함수
      const handleStationSelect = (stationName,stationId) => {
        setdepStationName(stationName); // 선택한 지하철역 이름 업데이트
        setdepStation(stationId);
       
      };
      
      const handleStationarrSelect = (stationName,stationId) => {
        setarrStationName(stationName); 
        setarrStation(stationId)
        handleTrainModalClose(); // 모달 닫기
      }
      
      // 지하철역을 선택했을 때 호출되는 함수
      const handleroundStationSelect = (stationName,stationId) => {
        setrounddepStationName(stationName); // 선택한 지하철역 이름 업데이트
        setrounddepStation(stationId);
       
      };
      
      const handleroundStationarrSelect = (stationName,stationId) => {
        setroundarrStationName(stationName); 
        setroundarrStation(stationId)
        handleRoundTrainModalClose(); // 모달 닫기
      }

      const handleTrainModalOpen = () => {
        settrainModalOpen(true);
      }
      
      const handleRoundTrainModalOpen = () => {
        settrainModalOpen2(true);
      }
      
      
      const handleTrainModalClose = () => {
        
        settrainModalOpen(false);
      }
      const handleRoundTrainModalClose = () => {
        settrainModalOpen2(false);
      }
      

  




      const handleSeatSelect = (seat, car) => {
        setSelectedSeat(seat);
        setSelectedCar(car);
      };


      const handleMileageUsage = () => {
        // 사용자의 마일리지
        const userMileage = mileage;
    
        // 20% 할인율
        const mileagePercentageDiscount = 0.20;
        

        
      
        if (!isUsingMileage) {
          // 마일리지를 사용하는 경우
          if (tripType === 'one-way') {
            const maxDiscountAmount = Math.min(userMileage, ticketPrice * mileagePercentageDiscount);
        
            if (maxDiscountAmount > 0) {
              // 할인된 가격과 마일리지 사용 여부를 업데이트
              const discountedPrice = ticketPrice - maxDiscountAmount;
              setMileageDiscount(maxDiscountAmount);
              setTotalPrice(discountedPrice);
  
              // 사용하고 남은 마일리지를 계산하고 업데이트
          const remainingMileage = userMileage - maxDiscountAmount;
          setusedMileage(remainingMileage);
            } 
          } else {
            const roundticketPrices = ticketPrice + roundticketPrice;
            const maxDiscountAmount = Math.min(userMileage, roundticketPrices * mileagePercentageDiscount);
        
            if (maxDiscountAmount > 0) {
              // 할인된 가격과 마일리지 사용 여부를 업데이트
              const discountedPrice = roundticketPrices - maxDiscountAmount;
              setMileageDiscount(maxDiscountAmount);
              setsumPrice(discountedPrice);
  
              // 사용하고 남은 마일리지를 계산하고 업데이트
          const remainingMileage = userMileage - maxDiscountAmount;
          setusedMileage(remainingMileage);
          }
        } 
      } else {
        const roundticketPrices = ticketPrice + roundticketPrice;
          // 마일리지를 사용하지 않는 경우
          // 할인된 가격을 초기화
          setMileageDiscount(0);
          // 원래 가격으로 복원
          if (tripType === 'one-way') {
            setTotalPrice(ticketPrice);
          } else {
            setsumPrice(roundticketPrices);
          }
        }
      
        // 마일리지 사용 여부를 토글
        setIsUsingMileage(!isUsingMileage);
      };
    
      const saveDataTobeforePay = () => {
        
        if (tripType === 'one-way') {

          const dataToSave = {
            depPlace: selectedItems.depPlaceName, // 출발지
            arrPlace: selectedItems.arrPlaceName, // 도착지
            depPlandTime: selectedItems.depPlandTime, // 출발시간
            arrPlandTime: selectedItems.arrPlandTime, // 도착시간
            trainGradeName: selectedItems.trainGradeName, // 기차종류
            trainNum: selectedItems.trainNum, // 기차번호
            datevalue: datevalue.format("YYYYMMDD"), // 선택한 날짜
            selectedItem: selectedItems, // 혹시 몰라서 기차정보 전부다 들고감.
            party: party, // 인원수
            name: name, // 예매자 이름
            id : id, //예매자 아이디
            phoneNumber: phoneNumber, // 예매자 번호
            totalPrice: totalPrice, // 총 가격
            ticketPrice : ticketPrice, //기차표 가격
            Mileage: usedMileage, // 사용하고 남은 마일리지
            useMileage : mileageDiscount, //사용한 마일리지 (결제 내역에 뽑아주기 위함)
            trainCarNumber : selectedCar, // 선택한 호차 
            trainSeatNumber : selectedSeat, // 선택한 좌석
            tripType : tripType,
          };
          sessionStorage.setItem('saveTicketinfo', JSON.stringify(dataToSave));
        } else if (tripType === 'round-trip') {

          const dataToSave = {
            depPlace: selectedItems.depPlaceName, // 출발지
            arrPlace: selectedItems.arrPlaceName, // 도착지
            rounddepPlace : selectedroundItems.rounddepPlaceName, // 오는편 출발지
            roundarrPlace : selectedroundItems.roundarrPlaceName, // 오는편 도착지
            depPlandTime: selectedItems.depPlandTime, // 출발시간
            arrPlandTime: selectedItems.arrPlandTime, // 도착시간
            rounddepPlandTime: selectedroundItems.rounddepPlandTime, // 오는편 출발시간
            roundarrPlandTime: selectedroundItems.roundarrPlandTime, // 오는편 도착시간
            trainGradeName: selectedItems.trainGradeName, // 기차종류
            roundtrainGradeName: selectedroundItems.roundtrainGradeName, // 오는편 기차종류
            trainNum: selectedItems.trainNum, // 기차번호
            roundtrainNum : selectedroundItems.roundtrainNum,
            datevalue: datevalue.format("YYYYMMDD"), // 선택한 날짜
            rounddatevalue : rounddepPlaceTime.format("YYYYMMDD"), // 오는편 선택날짜
            party: party, // 인원수
            roundparty : roundparty,
            name: name, // 예매자 이름
            id : id, //예매자 아이디
            phoneNumber: phoneNumber, // 예매자 번호
            totalPrice: sumPrice, // 총 가격
            ticketPrice : ticketPrice, //기차표 가격
            roundticketPrice : roundticketPrice,
            Mileage: usedMileage, // 사용하고 남은 마일리지
            useMileage : mileageDiscount, //사용한 마일리지 (결제 내역에 뽑아주기 위함)
            trainCarNumber : selectedCar, // 선택한 호차 
            trainSeatNumber : selectedSeat, // 선택한 좌석
            roundtrainCar : roundselectedCar, // 선택한 호차 
            roundtrainSeat : roundselectedSeat, // 선택한 좌석
            tripType : tripType,
          };

          sessionStorage.setItem('saveTicketinfo', JSON.stringify(dataToSave));
        }
          
        // 데이터를 JSON 문자열로 변환하여 `sessionStorage`에 저장
      };

      
      return (
      <div className = "Trainticket-form" style = {{marginTop : 15}}>

      <div className="trainform-button-status-group">
      <ButtonGroup variant="outlined" aria-label = "outlined button group">
      <Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
      <Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
      </ButtonGroup>
      </div>


  {tripType === 'one-way' && (
      
      <form onSubmit = {handleSubmit} className = "form-ticketinfo-form" style = {{marginTop : 15}}>
      <FormControl sx={{ m: 1, minWidth: 120, marginTop : 2 }}>
          <TextField value={depStationName} id="grouped-select" label="출발지" onClick={handleTrainModalOpen} 
          readOnly />
      </FormControl>
  <FormControl sx={{ m: 1, minWidth: 120, marginTop : 2}}>
  <TextField value={arrStationName} id="grouped-select" label="도착지" onClick={handleTrainModalOpen} 
          readOnly />
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="날짜"
            value={datevalue}
            minDate={dayjs()} // 현재 날짜 이전의 날짜를 선택하지 못하게 함
            onChange={(newdatevalue) => setdatevalue(newdatevalue)}
            />
          </DemoContainer>
        </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120, paddingTop:1 }}>
          <InputLabel sx={{paddingTop:1}} id="demo-simple-select-helper-label">인원</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={party}
            label="Age"
            onChange={handleParty}
            >
            {[...Array(10)].map((_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      ))}
          </Select>
          </FormControl>

          <Modal open = {trainModalopen} onClose = {handleTrainModalClose}  aria-labelledby="train-one-way-Modal-title"
              aria-describedby="train-modal-modal-description"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                  <Grid
                container
                
                style={{ width: 900, height: 650, background: 'white' }}
              >
                {/* 왼쪽 영역 - 지역 목록 */}
                <Grid item xs={4} sx = {{height : 600}}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={trainCityCode}
                    onChange={trainTabsSelect}
                    aria-label="Vertical tabs example"
                    style= {{height : 600}}
                  >
                    {selectLocation.map((city) => (
                      <Tab
                        label={city.cityName}
                        key={city.cityCode}
                        value={city.cityCode}
                      />
                    ))}
                  </Tabs>
                </Grid>

                {/* 오른쪽 영역 - 선택한 지역의 지하철역 목록 */}
                <Grid item xs={8} sx = {{height : 600}}>
                  <Grid container spacing = {2} sx = {{height : 600}} >
                  <Grid item xs = {6} alignitem="center" sx={{ height: 600, marginTop : 2}}>
                    <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}} > 출발지 </Typography>
                    <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                    
      {ktxStationsByCity.map((station, index) => (
        <Traintabpanel
        key={station.nodeId}
        value={station.nodeId}
        index={station.nodeId}
        onSelect = {() => handleStationSelect(station.nodeName, station.nodeId)}
        selected = {depStationName === station.nodeName}
        align ="center"
        variant="scrollable"
        >
      {station.nodeName}
      </Traintabpanel>
    ))}
    </Grid>
                  </Grid>
                  <Grid item xs = {6} sx =  {{height : 600, marginTop : 2}} >
                <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}}> 도착지 </Typography>
                <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                    {ktxStationsByCity.map((station, index) => (
                      <Traintabpanel
        key={station.nodeId}
        value={station.nodeId}
        index={station.nodeId}
        onSelect={() => handleStationarrSelect(station.nodeName, station.nodeId)}
        selected = {arrStationName === station.nodeName}
        >
        {station.nodeName}
      </Traintabpanel>
    ))}
              </Grid>
                  </Grid>
                  </Grid>
              </Grid>
              </Grid>
            </Modal>

          <IconButton sx={{marginTop:2}}  type="sumbit" color = "primary" aria-label = "search submit" size = "large" onClick = {handleLoginCheck}>
              <SearchOutlinedIcon   fontSize="inherit"/>
          </IconButton>
            </form>

  )}
{/* 왕복 시작 !!!  */}
  {tripType === "round-trip" && (

<>
<form onSubmit = {handleSubmit} className = "form-ticketinfo-form" style = {{marginTop : 15}} >


  <FormControl sx={{ m: 1, minWidth: 120, marginTop : 2 }}>
        <TextField value={depStationName} id="grouped-select" label="출발지" onClick={handleTrainModalOpen} 
         readOnly />
    </FormControl>

<FormControl sx={{ m: 1, minWidth: 120, marginTop : 2}}>
<TextField value={arrStationName} id="grouped-select" label="도착지" onClick={handleTrainModalOpen} 
         readOnly />
      </FormControl>

    <Modal open = {trainModalopen} onClose = {handleTrainModalClose}  aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
             }}>
                 <Grid
              container
              
              style={{ width: 900, height: 650, background: 'white' }}
            >
              {/* 왼쪽 영역 - 지역 목록 */}
              <Grid item xs={4} sx = {{height : 600}}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={trainCityCode}
                  onChange={trainTabsSelect}
                  aria-label="Vertical tabs example"
                  style= {{height : 600}}
                >
                  {selectLocation.map((city) => (
                    <Tab
                      label={city.cityName}
                      key={city.cityCode}
                      value={city.cityCode}
                    />
                  ))}
                </Tabs>
              </Grid>

              {/* 오른쪽 영역 - 선택한 지역의 지하철역 목록 */}
              <Grid item xs={8} sx = {{height : 600}}>
                <Grid container spacing = {2} sx = {{height : 600}} >
                <Grid item xs = {6} alignitem="center" sx={{ height: 600, marginTop : 2}}>
                  <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}} > 출발지 </Typography>
                  <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                  
    {ktxStationsByCity.map((station, index) => (
      <Traintabpanel
      key={station.nodeId}
      value={station.nodeId}
      index={station.nodeId}
      onSelect = {() => handleStationSelect(station.nodeName, station.nodeId)}
      selected = {depStationName === station.nodeName}
      align ="center"
      variant="scrollable"
      >
     {station.nodeName}
    </Traintabpanel>
  ))}
  </Grid>
                </Grid>
                <Grid item xs = {6} sx =  {{height : 600, marginTop : 2}} >
               <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}}> 도착지 </Typography>
               <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                  {ktxStationsByCity.map((station, index) => (
                    <Traintabpanel
      key={station.nodeId}
      value={station.nodeId}
      index={station.nodeId}
      onSelect={() => handleStationarrSelect(station.nodeName, station.nodeId)}
      selected = {arrStationName === station.nodeName}
      >
      {station.nodeName}
    </Traintabpanel>
  ))}
            </Grid>
                </Grid>
                </Grid>
            </Grid>
            </Grid>
          </Modal>

<FormControl sx={{ m: 1, minWidth: 120 }}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="날짜"
          value={datevalue}
          minDate={dayjs()} // 현재 날짜 이전의 날짜를 선택하지 못하게 함
          onChange={(newdatevalue) => setdatevalue(newdatevalue)}
          />
        </DemoContainer>
       </LocalizationProvider>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120, paddingTop:1, marginRight : 7.5 }}>
        <InputLabel sx={{paddingTop:1}} id="demo-simple-select-helper-label">인원</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={party}
          label="Age"
          onChange={handleParty}
          >
          {[...Array(10)].map((_, index) => (
      <MenuItem key={index + 1} value={index + 1}>
        {index + 1}
      </MenuItem>
    ))}
        </Select>
        </FormControl>
        </form>


       
      {/* 기차 왕복부분 UI */}    


<form onSubmit = {handleSubmit} className = "form-ticketinfo-form">
  <FormControl sx={{ m: 1, minWidth: 120, marginTop : 2 }}>
        <TextField value={rounddepStationName} id="grouped-select" label="출발지" onClick={handleRoundTrainModalOpen} 
         readOnly />
    </FormControl>
<FormControl sx={{ m: 1, minWidth: 120, marginTop : 2}}>
<TextField value={roundarrStationName} id="grouped-select" label="도착지" onClick={handleRoundTrainModalOpen} 
         readOnly />
      </FormControl>
    <Modal open = {trainModalopen2} onClose = {handleRoundTrainModalClose}  aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
              }}>
                 <Grid
              container
              
              style={{ width: 900, height: 650, background: 'white' }}
              >
              {/* 왼쪽 영역 - 지역 목록 */}
              <Grid item xs={4} sx = {{height : 600}}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={trainCityCode}
                  onChange={trainTabsSelect}
                  aria-label="Vertical tabs example"
                  style= {{height : 600}}
                  >
                  {selectLocation.map((city) => (
                    <Tab
                    label={city.cityName}
                    key={city.cityCode}
                    value={city.cityCode}
                    />
                    ))}
                </Tabs>
              </Grid>

              {/* 오른쪽 영역 - 선택한 지역의 지하철역 목록 */}
              <Grid item xs={8} sx = {{height : 600}}>
                <Grid container spacing = {2} sx = {{height : 600}} >
                <Grid item xs = {6} alignitem="center" sx={{ height: 600, marginTop : 2}}>
                  <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}} > 출발지 </Typography>
                  <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                  
    {ktxStationsByCity.map((station, index) => (
      <Traintabpanel
      key={station.nodeId}
      value={station.nodeId}
      index={station.nodeId}
      onSelect = {() => handleroundStationSelect(station.nodeName, station.nodeId)}
      selected = {rounddepStationName === station.nodeName}
      align ="center"
      variant="scrollable"
      >
     {station.nodeName}
    </Traintabpanel>
  ))}
  </Grid>
                </Grid>
                <Grid item xs = {6} sx =  {{height : 600, marginTop : 2}} >
               <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 20, marginBottom : 5, marginRight : 15}}> 도착지 </Typography>
               <Grid item xs = {12} sx={{ height: 550, overflowY: 'auto' }} >

                  {ktxStationsByCity.map((station, index) => (
                    <Traintabpanel
                    key={station.nodeId}
                    value={station.nodeId}
      index={station.nodeId}
      onSelect={() => handleroundStationarrSelect(station.nodeName, station.nodeId)}
      selected = {roundarrStationName === station.nodeName}
      >
      {station.nodeName}
    </Traintabpanel>
  ))}
            </Grid>
                </Grid>
                </Grid>
            </Grid>
            </Grid>
          </Modal>
    


<FormControl sx={{ m: 1, minWidth: 120 }}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="날짜"
          value={rounddepPlaceTime}
          minDate={dayjs()} // 현재 날짜 이전의 날짜를 선택하지 못하게 함
          onChange={(newdatevalue) => setrounddepPlaceTime(newdatevalue)}
          />
        </DemoContainer>
       </LocalizationProvider>
        </FormControl>

      

        <FormControl sx={{ m: 1, minWidth: 120, paddingTop:1 }}>
        <InputLabel sx={{paddingTop:1}} id="demo-simple-select-helper-label">인원</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={roundparty}
          label="Age"
          onChange={handleroundParty}
          >
          {[...Array(10)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
        {index + 1}
      </MenuItem>
    ))}
        </Select>
        </FormControl>
  
        <IconButton sx={{marginTop:2}}  type="sumbit" color = "primary" aria-label = "search submit" size = "large" onClick = {handleLoginCheck}>
        <SearchOutlinedIcon   fontSize="inherit"/>
        </IconButton>
        </form>
      </>
  )}
{/* 왕복 끝 !!! 
  <IconButton sx={{marginTop:2}}  type="sumbit" color = "primary" aria-label = "search submit" size = "large" onClick = {handleLoginCheck}>
              <SearchOutlinedIcon   fontSize="inherit"/>
          </IconButton> */
}

{trainShowtable && trainTicketinfo.length > 0 && ( 

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
          {trainTicketinfo.map((item,index) => (
            <TableRow key={index}>
              <TableCell>{item.depPlaceName}</TableCell>
              <TableCell>{item.arrPlaceName}</TableCell>
              <TableCell>{item.depPlandTime}</TableCell>
              <TableCell>{item.arrPlandTime}</TableCell>
              <TableCell>{item.trainGradeName}-{item.trainNum}</TableCell>
              <TableCell>{item.Fare * party}</TableCell>
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

  {trainroundShowtable && roundtrainInfo.length > 0 && (
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
          {roundtrainInfo.map((item,index) => (
            <TableRow key={index}>
              <TableCell>{item.rounddepPlaceName}</TableCell>
              <TableCell>{item.roundarrPlaceName}</TableCell>
              <TableCell>{item.rounddepPlandTime}</TableCell>
              <TableCell>{item.roundarrPlandTime}</TableCell>
              <TableCell>{item.roundtrainGradeName}-{item.roundtrainNum}</TableCell>
              <TableCell>{item.roundFare * roundparty}</TableCell>
              {/* 추가 열 데이터들 */}
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleroundSelection(item)}
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
{tripType === 'one-way' ? (


  <Modal open={isModalOpen} onClose={handleCloseModal} style = {{display : 'flex', alignItems: 'center', justifyContent: 'center'}} key = "selectTicket-info">
          <div className="train-modal-content">
            {/* 모달 내용 */}
            {selectedItems && (
            
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
                {/* <ChildModal onSelectSeat={handleSeatSelect} selectedItems= {selectedItems} /> */}
                
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
                  <Typography>{selectedItems.depPlaceName} - {selectedItems.arrPlaceName} </Typography>
                  <Typography>{datevalue.format("YYYYMMDD")}</Typography>
                  <Typography>{selectedItems.depPlandTime} ~ {selectedItems.arrPlandTime} </Typography>
                  <Typography>{selectedItems.trainGradeName} - {selectedItems.trainNum}</Typography>
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
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{ticketPrice} 원</Typography>
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
) : tripType === 'round-trip' ? (

        <Modal open={isModalOpen} onClose={handleCloseModal} style = {{display : 'flex', alignItems: 'center', justifyContent: 'center'}} key = "selectTicket-info">
          <div className="train-modal-content">
            {/* 모달 내용 */}
            {selectedItems && selectedroundItems && (
              
            <Grid container spacing={2} sx={{ backgroundColor: 'background.paper', borderRadius: '8px', width: '800px', height: '700px' }}>
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
                {/* <ChildModal onSelectSeat={handleSeatSelect} selectedItems= {selectedItems} /> */}
                
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
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>기차정보(가는편)</Typography>
                  <Typography>{selectedItems.depPlaceName} - {selectedItems.arrPlaceName} </Typography>
                  <Typography>{datevalue.format("YYYYMMDD")}</Typography>
                  <Typography>{selectedItems.depPlandTime} ~ {selectedItems.arrPlandTime} </Typography>
                  <Typography>{selectedItems.trainGradeName} - {selectedItems.trainNum}</Typography>
                {/* <Typography>가격 : {selectedItem.Fare}</Typography> */}
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>기차정보(오는편)</Typography>
                  <Typography>{selectedroundItems.rounddepPlaceName} - {selectedroundItems.roundarrPlaceName}</Typography>
                  <Typography>{rounddepPlaceTime.format("YYYYMMDD")}</Typography>
                  <Typography>{selectedroundItems.rounddepPlandTime} ~ {selectedroundItems.roundarrPlandTime} </Typography>
                  <Typography>{selectedroundItems.roundtrainGradeName} - {selectedroundItems.roundtrainNum}</Typography>
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
                <Typography>기차표 운임(가는편)</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{ticketPrice} 원</Typography>
                <Typography>기차표 운임(오는편)</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{roundticketPrice} 원</Typography>
                <Typography>마일리지 할인</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{mileageDiscount} 원</Typography>
                <Divider/>
                <Typography>총금액</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}> {sumPrice}원</Typography>
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
) : <Typography>선택되지 않았습니다.</Typography>}
      </div>


      );

  }

  

  function ChildModal({ onSelectSeat, selectedItems }) {

    const [open, setopen] = React.useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [seatText, setSeatText] = useState("");
    const [CarText, setCarText] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);
    const [availableSeats, setAvailableSeats] = useState([]);
    const {trainType, startTime,endTime,startStaion,endStation,trainNum,startdate} = selectedItems;

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
      setSelectedCar(CarText); // 선택한 호차 정보 업데이트
      setSeatText(seat);
      setopen(false);
      onSelectSeat(seat, selectedCar); // 좌석과 호차 정보를 콜백 함수로 전달
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
      key = "childModal-seat-select"
      id="standard-basics"
      label="좌석선택"
      variant="standard"
      className="fieldStyles"
      onClick={handleOpen}
      value = {`${CarText}-${seatText}`}
      
    />

  <Modal
    key = "ChildModal-seat"
    open={open}
    onClose={handleClose}
    aria-labelledby="child-modal-titles"
    aria-describedby="child-modal-descriptions"
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
                        key = {seat}
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