import { Button, ButtonGroup, FormControl,  ListSubheader, Select, InputLabel, MenuItem, Menu, Modal, Box,  Tabs, Tab} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import React ,{ useState, useEffect } from "react";
import dayjs from "dayjs";
import TabPanel from "./TabPanel";



function Ticketinfoform() {

  // const API_KEY = process.env.REACT_APP_PUBLICAPI_KEY; // api_key .ENV로 구현되어 있습니다. 
  const [tripType, setTripType] = useState("one-way"); // 마찬가지
  const [transportType, setTransportType] = useState("train"); // 속성값에 따라 폼의 내용이 바뀌는 함수에 들어가는 변수
  const [selectedType, setSelectedType] = useState(''); // 속성값에 따라 폼의 내용이 바뀌는 함수에 들어가는 변수
  const [datevalue, setdatevalue] = useState(dayjs()); // 날짜 
  const [party, setParty] = useState(''); // 인원
  const [anchorEL, setanchorEL] = useState(null); // 폼 상태 변수
  const [Province, setProvince] = useState(null); // 폼에서 지역 선택 했을때 기차 or 버스 예약 페이지로 보내는 변수.
  const [selectLocation, setSelectLocation] = useState([]);
  const [ktxStationsByCity, setKtxStationsByCity] = useState({}); // 도시코드에 따른 지하철역 데이터
  const [terminalData, setterminalData] = useState([]); // 버스데이터
  const [Modalopen, setModalOpen] = React.useState(false); // 모달 온,오프 관련 
  const [selectedTab, setSelectedTab] = useState(0); 
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false); // Modal --- 
//기차관련 함수
  const handleParty = (event) => {
    setParty(event.target.value);
  };

  const handleSubmit = (event) => {
    
    console.log("Selected Departure:", Province);
    // 선택한 출발지, 도착지, 날짜, 인원 등의 상태를 활용하여 필요한 작업을 수행합니다.

    // 예시: 선택된 정보를 콘솔에 출력해보기
    console.log("Selected Departure:", Province[selectLocation]);
    console.log("Selected Destination:", Province[selectLocation]);
    console.log("Selected Date:", datevalue.format("YYYY-MM-DD"));
    console.log("Selected Party Size:", party);

    // TODO: 필요한 작업을 수행하거나 서버로 데이터 전송
  };
 
  // const handleCitySelect = (cityCode) => {
  //   fetchcitytrainSttn(cityCode);
  // };


  const handleTripTypeChange = (type) => {
    setTripType(type);
    setSelectedType(selectedType);
  };

  const handleTransportTypeChange = (type) => {
    setTransportType(type);
    setSelectedType(type === 'train' ? '기차' : '버스');
  
}

const handlebuttonClick = (event) => {
  setanchorEL(event.currentTarget);
};

const handlebuttonClose = () => {
  setanchorEL(null);
};

function Subheader(props) {
  return React.createElement(ListSubheader, props);
}
 Subheader.muiSkipListHighlight = true;
  

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


  useEffect(() => {
   const fetchbusTerminalList = async () => {
    try {
      const response = await axios.get('/publicApi/getBusList')
      const responseData = response.data;
      console.log(responseData);
      setterminalData(responseData);
    } catch (error) {
      console.error("API 호출 실패 (버스터미널리스트)", error);
    }
   };
   fetchbusTerminalList();
  }, []);
     


 const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };



// Modal style





 return(

 <div className="ticket-info-form">
<h2>빠른 검색</h2>

<div className= "form-state-button-groups">
<ButtonGroup variant="outlined" aria-label = "outlined button group">
<Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
<Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
<Button id = "Dropdonw-menu" aria-haspopup = "true" onClick = {handlebuttonClick}  >
  종류
</Button>
<Menu
        id="dropdown-menu"
        anchorEl={anchorEL}
        open={Boolean(anchorEL)}
        onClose={handlebuttonClose}
      >
        <MenuItem onClick={() => { handlebuttonClose(); handleTransportTypeChange('train'); }}>기차</MenuItem>
        <MenuItem onClick={() => { handlebuttonClose(); handleTransportTypeChange('bus'); }}>버스</MenuItem>
      </Menu>
</ButtonGroup>
</div>


{transportType === 'train' && tripType === 'one-way' && ( 

<form onSubmit = {handleSubmit} className = "form-ticketinfo-form">
  <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">출발지</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
        <Button type="sumbit">검색</Button>
          </form>
            )}




{transportType === 'train'&& tripType === 'round-trip' && (


<form onSubmit = {handleSubmit} className = "form-ticketinfo-form">
<div style={{ display: 'flex', gap: '16px' }}>
  <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">출발지</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
            </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">출발지</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
        <Select defaultValue="" id="grouped-select" label="Grouping">
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
        </div>
        <Button type="sumbit">검색</Button>
    {/* </div> */}
          </form>
            )}

{/* 여기 부분 버스인데 수정하면됨. 0907 PM 10 : 05  까지 작업 모달 수정해서 받아올 폼 제작해주면됨. 이거 해결되면 검색버튼하고, 그 위에 select 버튼 두개 제작해야함. 
선택한 값이 그 버튼에 담기게 해야함.*/}
{transportType === 'bus' && tripType === 'one-way' && (
        <>
   <Button onClick={handleModalOpen}>Open modal</Button>
    <Modal
      open={Modalopen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
        >
          {terminalData.map((terminal, index) => (
            <Tab label={terminal.regionKey} key={terminal.regionKey} value={terminal.terminalId} />
          ))}
        </Tabs>
        {terminalData.map((terminal, index) => (
          <TabPanel key={terminal.regionKey} value={selectedTab} index={terminal.terminalId}>
            {/* Display the bus terminal information here */}
            {terminal.terminalName}
            {/* Add more details if needed */}
          </TabPanel>
        ))}
      </Box>
    </Modal>
  </>
)}

</div>     



 );
}





export default Ticketinfoform;