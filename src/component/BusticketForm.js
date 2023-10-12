<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import { Button, ButtonGroup, FormControl,  ListSubheader, Select, InputLabel, MenuItem, 
  Menu, Modal, Box, Grid, Tabs, Tab, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Divider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import calluserInfo from "./calluserInfo";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import TabPanel from "./TabPanel";
import axios from "axios";

function BusTicketForm({ isLoggedIn }) {
    const [tripType, setTripType] = useState("one-way"); 
    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState(''); // 이름 상태
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [mileage, setMileage] = useState(''); // 마일리지 상태
    const [id, setid] = useState('');
    const [mileageDiscount, setMileageDiscount] = useState(0);
    const [isUsingMileage, setIsUsingMileage] = useState(false);
    const [usedMileage, setusedMileage] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const [Modalopen, setModalOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [ArrTerminalData, setArrTerminalData] = useState([]); // 도착버스데이터
    const [selectedTerminal, setSelectedTerminal] = useState(''); // 선택된 터미널 이름 상태 추가
    const [selectedTerminal2, setSelectedTerminal2] = useState(''); // 선택된 터미널 이름 상태 추가2
    const [selectedTerminalId, setSelectedTerminalId] = useState(''); // 선택된 터미널 아이디 상태 추가
    const [selectedTerminalId2, setSelectedTerminalId2] = useState(''); // 선택된 터미널 아이디 상태 추가2
    const [party, setParty] = useState('');
    const [routeId, setrouteId] = useState('');
    const [busTicketinfo, setbusTicketinfo] = useState([]);
    const [terminalData, setTerminalData] = useState([]); // 버스데이터
    const [ticketPrice, setTicketPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredTerminals, setFilteredTerminals] = useState([]);
    const navigate = useNavigate();
    const [datevalue, setdatevalue] = useState(dayjs());

    const handleTripTypeChange = (type) => {
        setTripType(type);
        setSelectedType(selectedType);
      };
    
    const handleLoginCheck = async () => {
        if (!isLoggedIn) {
          // 비로그인 사용자인 경우 /login 페이지로 이동
          alert('로그인이 필요합니다.'); // 또는 원하는 메시지를 표시할 수 있습니다.
          navigate('/login');
        } else {

        }
      };

    const handleBusInfo = () => {
      setrouteId("NAEK" + selectedTerminalId+selectedTerminalId2)
      const depTid = "NAEK" + selectedTerminalId;
      const arrTid = "NAEK" + selectedTerminalId2;
      const depTime = datevalue;
      const dateObj = new Date(depTime);
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리 숫자로 변환
      const day = dateObj.getDate().toString().padStart(2, '0'); // 일을 두 자리 숫자로 변환
      const deptime = year + month + day;
      const apiUrl = `/publicApi/BusInfo?depId=${depTid}&arrId=${arrTid}&depTime=${deptime}`;
      // 버스 정보 API 호출
      axios.get(apiUrl)
      .then(response => {
        console.log('API 호출 성공:', response);
        setbusTicketinfo(response.data);
      })
      .catch(error => {
        console.error('API 요청 오류:', error);
      });
    }

  const BusInfo = JSON.parse(sessionStorage.getItem('key'));

  useEffect(() => {
    if(BusInfo!==null){
    const depTid = BusInfo.depTerminalId;
    const arrTid = BusInfo.arrTerminalId;
    const depTime = BusInfo.depPlandTime;
    setrouteId(BusInfo.routeId);
    setParty(BusInfo.Party);
    setSelectedTerminal(BusInfo.depName);
    setSelectedTerminal2(BusInfo.arrName);
    const dateObj = new Date(depTime);
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리 숫자로 변환
    const day = dateObj.getDate().toString().padStart(2, '0'); // 일을 두 자리 숫자로 변환
    const deptime = year + month + day;
    const apiUrl = `/publicApi/BusInfo?depId=${depTid}&arrId=${arrTid}&depTime=${deptime}`;
          
          // 버스 정보 API 호출
          axios.get(apiUrl)
          .then(response => {
            console.log('API 호출 성공:', response);
            setbusTicketinfo(response.data);
            sessionStorage.removeItem('key');
          })
          .catch(error => {
            console.error('API 요청 오류:', error);
          });
    }}, [])

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      handleBusInfo();
    }

    const handleMileageUsage = () => {
      // 사용자의 마일리지
      const userMileage = mileage;
  
      // 20% 할인율
      const mileagePercentageDiscount = 0.20;

      if (!isUsingMileage) {
        // 마일리지를 사용하는 경우
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
        // 마일리지를 사용하지 않는 경우
        // 할인된 가격을 초기화
        setMileageDiscount(0);
        // 원래 가격으로 복원
        setTotalPrice(ticketPrice);
      }
    
      // 마일리지 사용 여부를 토글
      setIsUsingMileage(!isUsingMileage);
    };

    const handleParty = (event) => {
      setParty(event.target.value);
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
      // 컴포넌트가 마운트될 때 API 데이터를 가져오는 함수 호출
      fetchBusTerminalData();
    }, []);
    
    // API 데이터를 가져오는 함수
    const fetchBusTerminalData = () => {
      // API 엔드포인트 URL
      const apiUrl = '/publicApi/getBusList'; // API의 URL을 적절하게 수정해야 합니다.
    
      // Axios를 사용하여 API 요청
      axios.get(apiUrl)
        .then((response) => {
          // API 응답 데이터를 받아서 상태에 저장
          setTerminalData(response.data);
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
        });
    };

    const busTerminals = terminalData.map((terminal) => ({
      id: terminal.terminalId,
      regionKey: terminal.regionKey,
      name: terminal.terminalName,
    }));

    const ArrBusTerminals = ArrTerminalData.map((terminal) => ({
      arrid: terminal.terminalId,
      arrregionKey: terminal.regionKey,
      arrname: terminal.terminalName,
    }));

    const uniqueRegionKey = [...new Set(busTerminals.map(terminal => terminal.regionKey))];

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
      busTerminals.forEach(terminal => {
        console.log(terminal.regionKey);
      });
      const filteredTerminals = busTerminals.filter(terminal => terminal.regionKey === uniqueRegionKey[uniqueRegionKey.indexOf(newValue)]);
        setFilteredTerminals(filteredTerminals);
    };

    const handleTerminalClick = (terminalName, terminalId) => {
      setSelectedTerminal(terminalName); // 선택된 터미널 이름을 상태로 설정
      setSelectedTerminalId(terminalId);
      const apiUrl = `/publicApi/getArrBusList?tmnCd=${terminalId}`;
    
      axios.get(apiUrl)
        .then((response) => {
          console.log('API 호출 성공:', response); // API 응답 확인
          setArrTerminalData(response.data);
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
        });
    };

    const handleTerminalClick2 = (terminalName2, terminalId2) => {
      setSelectedTerminal2(terminalName2); // 선택된 터미널 이름을 상태로 설정
     // handleModalClose(); // 모달을 닫음
      setSelectedTerminalId2(terminalId2);
      handleModalClose(); // 모달 닫기
    };

    const handleSelection = (item) => {
      // 선택된 데이터(selectedItem)를 예매 페이지로 전달하는 로직을 구현
      // 예: 예매 페이지로 이동하면서 선택된 데이터를 URL 매개변수로 전달
      setTicketPrice(item.Fare * party);
      setTotalPrice(item.Fare * party);
      setSelectedItem(item);
      setIsModalOpen(true);
      handleLoginCheck();
    };
    
    const handleSuccessCloseModal = () => {
      // 모달 닫기
      setIsModalOpen(false);
      
      saveDataTobeforePay();
      navigate("/BusPayment");
    };

    const saveDataTobeforePay = () => {
      const BusdataToSave = {
        routeId : routeId,
        depPlace: selectedItem.depPlaceName, // 출발지
        arrPlace: selectedItem.arrPlaceName, // 도착지
        depPlandTime: selectedItem.depPlandTime, // 출발시간
        arrPlandTime: selectedItem.arrPlandTime, // 도착시간
        BusGradeName: selectedItem.BusGradeName, // 버스등급
        datevalue: datevalue.format("YYYYMMDD"), // 선택한 날짜
        selectedItem: selectedItem, //버스정보 전부 다
        party: party, // 인원수
        name: name, // 예매자 이름
        id : id, //예매자 아이디
        phoneNumber: phoneNumber, // 예매자 번호
        totalPrice: totalPrice, // 총 가격
        ticketPrice : ticketPrice, //기차표 가격
        Mileage: usedMileage, // 사용하고 남은 마일리지
        useMileage : mileageDiscount, //사용한 마일리지 (결제 내역에 뽑아주기 위함)
        //trainSeatNumber : selectedSeat, // 선택한 좌석
      };
    
      // 데이터를 JSON 문자열로 변환하여 `sessionStorage`에 저장
      sessionStorage.setItem('saveBusTicketinfo', JSON.stringify(BusdataToSave));
    };

  return (
      <div className="Busticket-form">
        <div className="busform-button-status-group">
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
            <Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
          </ButtonGroup>
        </div>
        {tripType === 'one-way' && (
          <>
          <form onSubmit={handleSubmit} className="form-ticketinfo-form">
            <FormControl sx={{ m: 1, minWidth: 120,marginTop:2 ,width:120}}>
              {selectedTerminal ? null : <InputLabel htmlFor="grouped-select" >출발지</InputLabel>}
              <TextField value={selectedTerminal} id="grouped-select" label="출발지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>
    
            <FormControl sx={{ m: 1, minWidth: 120 ,marginTop:2 ,width:120}}>
              {selectedTerminal2 ? null : <InputLabel htmlFor="grouped-select">도착지</InputLabel>}
              <TextField value={selectedTerminal2} id="grouped-select" label="도착지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>
    
            <FormControl sx={{ m: 1, minWidth: 120, height: '200%' }}>
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
    
            <FormControl sx={{ m: 1, minWidth: 120,marginTop:2 ,width:120 }}>
              <InputLabel id="demo-simple-select-helper-label">인원</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={party}
                label="Age"
                onChange={handleParty}
              >
                <MenuItem  value="">
                  <em>None</em>
                </MenuItem>
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton sx={{marginTop:2}} type="sumbit" color = "primary" aria-label = "search submit" size = "large" onClick = {handleLoginCheck}>
            <SearchOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </form>
                   <Modal
                   open={Modalopen}
                   onClose={handleModalClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                   }}
               >
                 <Grid container spacing={2} style={{ width: 900, height: 500, background : 'white' }}>
                   {/* 왼쪽 영역 */}
                   <Grid item xs={4}>
                     <Tabs
                         orientation="vertical"
                         variant="scrollable"
                         value={selectedTab}
                         onChange={handleTabChange}
                         aria-label="Vertical tabs example"
                     >
                       {uniqueRegionKey.map((regionKey) => (
                           <Tab label={regionKey} key={regionKey} value={regionKey} />
                       ))}
                     </Tabs>
                   </Grid>
                   {/* 가운데 영역 */}
                   <Grid item xs={4} style={{ overflowY: 'auto', height: '100%' }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height : "100%", background : 'white' }}>
                       {filteredTerminals.map((terminal) => (
                           <TabPanel key={terminal.id} value={uniqueRegionKey.indexOf(selectedTab)} index={uniqueRegionKey.indexOf(selectedTab)}
                                     sx={{
                                       cursor: 'pointer', // 포인터 커서로 나타나게 함
                                       padding: '16px', // 내용 주위에 약간의 여백 추가
                                       backgroundColor: selectedTab === terminal.id ? 'primary.main' : 'white', // 선택된 패널 스타일 변경
                                       color: selectedTab === terminal.id ? 'white' : 'black', // 텍스트 색상 변경
                                     }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => handleTerminalClick(terminal.name, terminal.id)} >
                  {terminal.name}
                  </span>
                           </TabPanel>
                       ))}
                     </Box>
                   </Grid>
                   {/* 오른쪽 영역 */}
                   <Grid item xs={4} style={{ overflowY: 'auto', height: '100%' }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height : "100%", background : 'white' }}>
                       {ArrBusTerminals.length > 0 ? (ArrBusTerminals.map((terminal) => (
                           <TabPanel key={terminal.arrid} value={terminal.arrid} index={terminal.arrid}
                                     sx={{
                                       cursor: 'pointer', // 포인터 커서로 나타나게 함
                                       padding: '16px', // 내용 주위에 약간의 여백 추가
                                       backgroundColor: selectedTab === terminal.arrid ? 'primary.main' : 'white', // 선택된 패널 스타일 변경
                                       color: selectedTab === terminal.arrid ? 'white' : 'black', // 텍스트 색상 변경
                                     }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => handleTerminalClick2(terminal.arrname, terminal.arrid)} >
                    {terminal.arrname}
                  </span>
                           </TabPanel>
                       )) ) : (
                           <TabPanel value={0} index={0}>
                             {selectedTerminalId ? <span>도착지 정보가 없습니다.</span> : null}
                           </TabPanel>
                       )}
                     </Box>
                   </Grid>
                 </Grid>
               </Modal>
               </>
        )}

{busTicketinfo.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>출발지</TableCell>
                <TableCell>도착지</TableCell>
                <TableCell>출발시간</TableCell>
                <TableCell>도착시간</TableCell>
                <TableCell>버스등급</TableCell>
                <TableCell>가격</TableCell>
                {/* 추가 열 제목들 */}
                <TableCell>선택</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {busTicketinfo.map((item) => (
                <TableRow key={item.routeId}>
                  <TableCell>{item.depPlaceName}</TableCell>
                  <TableCell>{item.arrPlaceName}</TableCell>
                  <TableCell>{item.depPlandTime}</TableCell>
                  <TableCell>{item.arrPlandTime}</TableCell>
                  <TableCell>{item.BusGradeName}</TableCell>
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
                {/*<ChildModal onSelectSeat={handleSeatSelect} />*/}
                
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
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>버스정보</Typography>
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
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>버스표 수령방법</Typography>
                <Typography sx = {{ textAlign: 'left', fontWeight : 'light',fontSize : 12}}>전자탑승권</Typography>
                <Typography sx = {{fontSize : 10, fontWeight : 'bold'}}>버스표 인쇄가 필요하지 않습니다. 즉시 발권 및 사용 가능합니다.</Typography>
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
                <Typography>버스표 운임</Typography>
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
      </div>
    );
    
}

  


=======
import React, {useState, useEffect} from "react";
import { Button, ButtonGroup, FormControl,  ListSubheader, Select, InputLabel, MenuItem, 
  Menu, Modal, Box, Grid, Tabs, Tab, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Divider } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import calluserInfo from "./calluserInfo";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';
import TabPanel from "./TabPanel";
import axios from "axios";

function BusTicketForm({ isLoggedIn }) {
    const [tripType, setTripType] = useState("one-way"); 
    const [selectedType, setSelectedType] = useState('');
    const [name, setName] = useState(''); // 이름 상태
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [mileage, setMileage] = useState(''); // 마일리지 상태
    const [id, setid] = useState('');
    const [mileageDiscount, setMileageDiscount] = useState(0);
    const [isUsingMileage, setIsUsingMileage] = useState(false);
    const [usedMileage, setusedMileage] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const [Modalopen, setModalOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [ArrTerminalData, setArrTerminalData] = useState([]); // 도착버스데이터
    const [selectedTerminal, setSelectedTerminal] = useState(''); // 선택된 터미널 이름 상태 추가
    const [selectedTerminal2, setSelectedTerminal2] = useState(''); // 선택된 터미널 이름 상태 추가2
    const [selectedTerminalId, setSelectedTerminalId] = useState(''); // 선택된 터미널 아이디 상태 추가
    const [selectedTerminalId2, setSelectedTerminalId2] = useState(''); // 선택된 터미널 아이디 상태 추가2
    const [party, setParty] = useState('');
    const [routeId, setrouteId] = useState('');
    const [busTicketinfo, setbusTicketinfo] = useState([]);
    const [terminalData, setTerminalData] = useState([]); // 버스데이터
    const [ticketPrice, setTicketPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredTerminals, setFilteredTerminals] = useState([]);
    const navigate = useNavigate();
    const [datevalue, setdatevalue] = useState(dayjs());

    const handleTripTypeChange = (type) => {
        setTripType(type);
        setSelectedType(selectedType);
      };
    
    const handleLoginCheck = async () => {
        if (!isLoggedIn) {
          // 비로그인 사용자인 경우 /login 페이지로 이동
          alert('로그인이 필요합니다.'); // 또는 원하는 메시지를 표시할 수 있습니다.
          navigate('/login');
        } else {

        }
      };

    const handleBusInfo = () => {
      setrouteId("NAEK" + selectedTerminalId+selectedTerminalId2)
      const depTid = "NAEK" + selectedTerminalId;
      const arrTid = "NAEK" + selectedTerminalId2;
      const depTime = datevalue;
      const dateObj = new Date(depTime);
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리 숫자로 변환
      const day = dateObj.getDate().toString().padStart(2, '0'); // 일을 두 자리 숫자로 변환
      const deptime = year + month + day;
      const apiUrl = `/publicApi/BusInfo?depId=${depTid}&arrId=${arrTid}&depTime=${deptime}`;
      // 버스 정보 API 호출
      axios.get(apiUrl)
      .then(response => {
        console.log('API 호출 성공:', response);
        setbusTicketinfo(response.data);
      })
      .catch(error => {
        console.error('API 요청 오류:', error);
      });
    }

  const BusInfo = JSON.parse(sessionStorage.getItem('key'));

  useEffect(() => {
    if(BusInfo!==null){
    const depTid = BusInfo.depTerminalId;
    const arrTid = BusInfo.arrTerminalId;
    const depTime = BusInfo.depPlandTime;
    setrouteId(BusInfo.routeId);
    setParty(BusInfo.Party);
    setSelectedTerminal(BusInfo.depName);
    setSelectedTerminal2(BusInfo.arrName);
    const dateObj = new Date(depTime);
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리 숫자로 변환
    const day = dateObj.getDate().toString().padStart(2, '0'); // 일을 두 자리 숫자로 변환
    const deptime = year + month + day;
    const apiUrl = `/publicApi/BusInfo?depId=${depTid}&arrId=${arrTid}&depTime=${deptime}`;
          
          // 버스 정보 API 호출
          axios.get(apiUrl)
          .then(response => {
            console.log('API 호출 성공:', response);
            setbusTicketinfo(response.data);
            sessionStorage.removeItem('key');
          })
          .catch(error => {
            console.error('API 요청 오류:', error);
          });
    }}, [])

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      handleBusInfo();
    }

    const handleMileageUsage = () => {
      // 사용자의 마일리지
      const userMileage = mileage;
  
      // 20% 할인율
      const mileagePercentageDiscount = 0.20;

      if (!isUsingMileage) {
        // 마일리지를 사용하는 경우
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
        // 마일리지를 사용하지 않는 경우
        // 할인된 가격을 초기화
        setMileageDiscount(0);
        // 원래 가격으로 복원
        setTotalPrice(ticketPrice);
      }
    
      // 마일리지 사용 여부를 토글
      setIsUsingMileage(!isUsingMileage);
    };

    const handleParty = (event) => {
      setParty(event.target.value);
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
      // 컴포넌트가 마운트될 때 API 데이터를 가져오는 함수 호출
      fetchBusTerminalData();
    }, []);
    
    // API 데이터를 가져오는 함수
    const fetchBusTerminalData = () => {
      // API 엔드포인트 URL
      const apiUrl = '/publicApi/getBusList'; // API의 URL을 적절하게 수정해야 합니다.
    
      // Axios를 사용하여 API 요청
      axios.get(apiUrl)
        .then((response) => {
          // API 응답 데이터를 받아서 상태에 저장
          setTerminalData(response.data);
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
        });
    };

    const busTerminals = terminalData.map((terminal) => ({
      id: terminal.terminalId,
      regionKey: terminal.regionKey,
      name: terminal.terminalName,
    }));

    const ArrBusTerminals = ArrTerminalData.map((terminal) => ({
      arrid: terminal.terminalId,
      arrregionKey: terminal.regionKey,
      arrname: terminal.terminalName,
    }));

    const uniqueRegionKey = [...new Set(busTerminals.map(terminal => terminal.regionKey))];

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
      busTerminals.forEach(terminal => {
        console.log(terminal.regionKey);
      });
      const filteredTerminals = busTerminals.filter(terminal => terminal.regionKey === uniqueRegionKey[uniqueRegionKey.indexOf(newValue)]);
        setFilteredTerminals(filteredTerminals);
    };

    const handleTerminalClick = (terminalName, terminalId) => {
      setSelectedTerminal(terminalName); // 선택된 터미널 이름을 상태로 설정
      setSelectedTerminalId(terminalId);
      const apiUrl = `/publicApi/getArrBusList?tmnCd=${terminalId}`;
    
      axios.get(apiUrl)
        .then((response) => {
          console.log('API 호출 성공:', response); // API 응답 확인
          setArrTerminalData(response.data);
        })
        .catch((error) => {
          console.error('API 요청 오류:', error);
        });
    };

    const handleTerminalClick2 = (terminalName2, terminalId2) => {
      setSelectedTerminal2(terminalName2); // 선택된 터미널 이름을 상태로 설정
     // handleModalClose(); // 모달을 닫음
      setSelectedTerminalId2(terminalId2);
      handleModalClose(); // 모달 닫기
    };

    const handleSelection = (item) => {
      // 선택된 데이터(selectedItem)를 예매 페이지로 전달하는 로직을 구현
      // 예: 예매 페이지로 이동하면서 선택된 데이터를 URL 매개변수로 전달
      setTicketPrice(item.Fare * party);
      setTotalPrice(item.Fare * party);
      setSelectedItem(item);
      setIsModalOpen(true);
      handleLoginCheck();
    };
    
    const handleSuccessCloseModal = () => {
      // 모달 닫기
      setIsModalOpen(false);
      
      saveDataTobeforePay();
      navigate("/BusPayment");
    };

    const saveDataTobeforePay = () => {
      const BusdataToSave = {
        routeId : routeId,
        depPlace: selectedItem.depPlaceName, // 출발지
        arrPlace: selectedItem.arrPlaceName, // 도착지
        depPlandTime: selectedItem.depPlandTime, // 출발시간
        arrPlandTime: selectedItem.arrPlandTime, // 도착시간
        BusGradeName: selectedItem.BusGradeName, // 버스등급
        datevalue: datevalue.format("YYYYMMDD"), // 선택한 날짜
        selectedItem: selectedItem, //버스정보 전부 다
        party: party, // 인원수
        name: name, // 예매자 이름
        id : id, //예매자 아이디
        phoneNumber: phoneNumber, // 예매자 번호
        totalPrice: totalPrice, // 총 가격
        ticketPrice : ticketPrice, //기차표 가격
        Mileage: usedMileage, // 사용하고 남은 마일리지
        useMileage : mileageDiscount, //사용한 마일리지 (결제 내역에 뽑아주기 위함)
        //trainSeatNumber : selectedSeat, // 선택한 좌석
      };
    
      // 데이터를 JSON 문자열로 변환하여 `sessionStorage`에 저장
      sessionStorage.setItem('saveBusTicketinfo', JSON.stringify(BusdataToSave));
    };

  return (
      <div className="Busticket-form">
        <div className="busform-button-status-group">
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
            <Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
          </ButtonGroup>
        </div>
        {tripType === 'one-way' && (
          <>
          <form onSubmit={handleSubmit} className="form-ticketinfo-form">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {selectedTerminal ? null : <InputLabel htmlFor="grouped-select">출발지</InputLabel>}
              <TextField value={selectedTerminal} id="grouped-select" label="출발지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>
    
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {selectedTerminal2 ? null : <InputLabel htmlFor="grouped-select">도착지</InputLabel>}
              <TextField value={selectedTerminal2} id="grouped-select" label="도착지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>
    
            <FormControl sx={{ m: 1, minWidth: 120, height: '200%' }}>
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
            <IconButton type="sumbit" color = "primary" aria-label = "search submit" size = "large" onClick = {handleLoginCheck}>
            <SearchOutlinedIcon fontSize="inherit"/>
            </IconButton>
          </form>
                   <Modal
                   open={Modalopen}
                   onClose={handleModalClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                   }}
               >
                 <Grid container spacing={2} style={{ width: 900, height: 500, background : 'white' }}>
                   {/* 왼쪽 영역 */}
                   <Grid item xs={4}>
                     <Tabs
                         orientation="vertical"
                         variant="scrollable"
                         value={selectedTab}
                         onChange={handleTabChange}
                         aria-label="Vertical tabs example"
                     >
                       {uniqueRegionKey.map((regionKey) => (
                           <Tab label={regionKey} key={regionKey} value={regionKey} />
                       ))}
                     </Tabs>
                   </Grid>
                   {/* 가운데 영역 */}
                   <Grid item xs={4} style={{ height: '80%' }}>
                    <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 10, marginBottom : 5, marginRight : 15}}> 출발지 </Typography>
                     <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height : "100%", background : 'white', marginTop: '10px' }}>
                       {filteredTerminals.map((terminal) => (
                           <TabPanel key={terminal.id} value={uniqueRegionKey.indexOf(selectedTab)} index={uniqueRegionKey.indexOf(selectedTab)}
                                     sx={{
                                       cursor: 'pointer', // 포인터 커서로 나타나게 함
                                       padding: '16px', // 내용 주위에 약간의 여백 추가
                                     }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => handleTerminalClick(terminal.name, terminal.id)} >
                  {terminal.name}
                  </span>
                           </TabPanel>
                       ))}
                     </Box>
                   </Grid>
                   {/* 오른쪽 영역 */}
                   <Grid item xs={4} style={{ height: '80%' }}>
                    <Typography align ="center" style = {{fontWeight : 'bold', fontsize : 15, marginTop : 10, marginBottom : 5, marginRight : 15}}> 도착지 </Typography>
                     <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height : "100%", background : 'white', marginTop: '10px' }}>
                       {ArrBusTerminals.length > 0 ? (ArrBusTerminals.map((terminal) => (
                           <TabPanel key={terminal.arrid} value={terminal.arrid} index={terminal.arrid}
                                     sx={{
                                       cursor: 'pointer', // 포인터 커서로 나타나게 함
                                       padding: '16px', // 내용 주위에 약간의 여백 추가
                                     }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => handleTerminalClick2(terminal.arrname, terminal.arrid)} >
                    {terminal.arrname}
                  </span>
                           </TabPanel>
                       )) ) : (
                           <TabPanel value={0} index={0}>
                             {ArrTerminalData ? <span>도착지 정보가 없습니다.</span> : null}
                           </TabPanel>
                       )}
                     </Box>
                   </Grid>
                 </Grid>
               </Modal>
               </>
        )}

{busTicketinfo.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>출발지</TableCell>
                <TableCell>도착지</TableCell>
                <TableCell>출발시간</TableCell>
                <TableCell>도착시간</TableCell>
                <TableCell>버스등급</TableCell>
                <TableCell>가격</TableCell>
                {/* 추가 열 제목들 */}
                <TableCell>선택</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {busTicketinfo.map((item) => (
                <TableRow key={item.routeId}>
                  <TableCell>{item.depPlaceName}</TableCell>
                  <TableCell>{item.arrPlaceName}</TableCell>
                  <TableCell>{item.depPlandTime}</TableCell>
                  <TableCell>{item.arrPlandTime}</TableCell>
                  <TableCell>{item.BusGradeName}</TableCell>
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
                {/*<ChildModal onSelectSeat={handleSeatSelect} />*/}
                
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
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>버스정보</Typography>
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
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: 14 }}>버스표 수령방법</Typography>
                <Typography sx = {{ textAlign: 'left', fontWeight : 'light',fontSize : 12}}>전자탑승권</Typography>
                <Typography sx = {{fontSize : 10, fontWeight : 'bold'}}>버스표 인쇄가 필요하지 않습니다. 즉시 발권 및 사용 가능합니다.</Typography>
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
                <Typography>버스표 운임</Typography>
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
      </div>
    );
    
}

  


>>>>>>> ed79ec830325c4348c572b9a2761b0006e90713e
export default BusTicketForm;