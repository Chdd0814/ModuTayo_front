import { Button, ButtonGroup, FormControl, ListSubheader, Select, InputLabel, MenuItem, Menu, Modal, Box, Grid, Tabs, Tab, TextField, IconButton, Typography, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import TabPanel from "./TabPanel";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Traintabpanel from "./Traintabpanel";
import './Ticketinfoform.css';


function Ticketinfoform() {

  const [tripType, setTripType] = useState("one-way"); // 마찬가지
  const [oneWayinfo, setoneWayinfo] = useState({});
  const [Roundinfo, setRoundinfo] = useState({});
  const [transportType, setTransportType] = useState("train"); // 속성값에 따라 폼의 내용이 바뀌는 함수에 들어가는 변수
  const [selectedType, setSelectedType] = useState(''); // 속성값에 따라 폼의 내용이 바뀌는 함수에 들어가는 변수
  const [datevalue, setdatevalue] = useState(dayjs()); // 날짜 
  const [rounddatevalue, setrounddatevalue] = useState(dayjs()); // 날짜 
  const [party, setParty] = useState(1); // 인원
  const [anchorEL, setanchorEL] = useState(null); // 폼 상태 변수
  const [Province, setProvince] = useState(null); // 폼에서 지역 선택 했을때 기차 or 버스 예약 페이지로 보내는 변수.
  const [selectLocation, setSelectLocation] = useState([]);
  const [ktxStationsByCity, setKtxStationsByCity] = useState([]);// 도시코드에 따른 지하철역 데이터
  const [depStation, setdepStation] = useState(''); // 기차 출발지
  const [depStationName, setdepStationName] = useState(''); // 기차 출발지 이름
  const [arrStation, setarrStation] = useState(''); // 기차 도착지
  const [arrStationName, setarrStationName] = useState(''); // 기차 도착지 이름
  const [rounddepStation, setrounddepStation] = useState(''); // 기차 출발지 왕복
  const [rounddepStationName, setrounddepStationName] = useState(''); // 기차 출발지 이름
  const [roundarrStation, setroundarrStation] = useState(''); // 기차 도착지 왕복
  const [roundarrStationName, setroundarrStationName] = useState(''); // 기차 도착지 이름 왕복
  const [trainCityCode, settrainCityCode] = useState(11);
  const [trainModalopen, settrainModalOpen] = useState(false);
  const [trainModalopen2, settrainModalOpen2] = useState(false);
  const [terminalData, setTerminalData] = useState([]); // 버스데이터
  const [ArrTerminalData, setArrTerminalData] = useState([]); // 도착버스데이터
  const [Modalopen, setModalOpen] = React.useState(false); // 모달 온,오프 관련 
  const [selectedTab, setSelectedTab] = useState(0);
  const [SecondModalOpen, setSecondModalOpen] = React.useState(false); // 두 번째 모달 온,오프 관련
  const handleSecondModalOpen = () => setSecondModalOpen(true);
  const handleSecondModalClose = () => setSecondModalOpen(false); // 두 번째 Modal ---
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false); // Modal --- 
  const [filteredTerminals, setFilteredTerminals] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState(''); // 선택된 터미널 이름 상태 추가
  const [selectedTerminal2, setSelectedTerminal2] = useState(''); // 선택된 터미널 이름 상태 추가2
  const [selectedroundTerminal, setSelectedroundTerminal] = useState(''); // 선택된 터미널 이름 상태 추가3
  const [selectedroundTerminal2, setSelectedroundTerminal2] = useState(''); // 선택된 터미널 이름 상태 추가4
  const [selectedTerminalId, setSelectedTerminalId] = useState(''); // 선택된 터미널 아이디 상태 추가
  const [selectedTerminalId2, setSelectedTerminalId2] = useState(''); // 선택된 터미널 아이디 상태 추가2
  const [selectedRoundTerminalId, setSelectedRoundTerminalId] = useState(''); // 선택된 터미널 아이디 상태 추가
  const [selectedRoundTerminalId2, setSelectedRoundTerminalId2] = useState(''); // 선택된 터미널 아이디 상태 추가2
  const navigate = useNavigate();
  const [BusInfo, setBusInfo] = useState({});
  //기차관련 함수
  const handleParty = (event) => {
    setParty(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if (transportType === 'bus') {
      // 버스 선택 시 버스 페이지로 리다이렉트
      navigate('/bus');
    } else if (transportType === 'train') {

      const trainParty = party;
      let sessionData = {};

      if (tripType === 'one-way') {
        // 편도 여행
        sessionData = {
          tripType: 'one-way',
          depStationId: depStation,
          depStationName: depStationName,
          arrStationId: arrStation,
          arrStationName: arrStationName,
          depDate: datevalue.format("YYYYMMDD"),
          party: trainParty,
        };
      } else if (tripType === 'round-trip') {
        // 왕복 여행
        sessionData = {
          tripType: 'round-trip',
          depStationId: depStation,
          depStationName: depStationName,
          arrStationId: arrStation,
          arrStationName: arrStationName,
          roundDepStationId: rounddepStation,
          roundDepStationName: rounddepStationName,
          roundArrStationId: roundarrStation,
          roundArrStationName: roundarrStationName,
          depDate: datevalue.format("YYYYMMDD"),
          roundDepDate: rounddatevalue.format("YYYYMMDD"),
          party: trainParty,
        };
      }

      // 세션에 데이터 저장
      sessionStorage.setItem('trainReservation', JSON.stringify(sessionData));

      // 기차 선택 시 기차 페이지로 리다이렉트
      navigate('/train');
    }

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

  const trainTabsSelect = (event, newValue) => {
    settrainCityCode(newValue);
    fetchStationsForCity(newValue);
  };

  // 지하철역을 선택했을 때 호출되는 함수
  const handleStationSelect = (stationName, stationId) => {
    setdepStationName(stationName); // 선택한 지하철역 이름 업데이트
    setdepStation(stationId);

  };

  const handleStationarrSelect = (stationName, stationId) => {
    setarrStationName(stationName);
    setarrStation(stationId)
    handleTrainModalClose(); // 모달 닫기
  }

  // 지하철역을 선택했을 때 호출되는 함수
  const handleroundStationSelect = (stationName, stationId) => {
    setrounddepStationName(stationName); // 선택한 지하철역 이름 업데이트
    setrounddepStation(stationId);

  };

  const handleroundStationarrSelect = (stationName, stationId) => {
    setroundarrStationName(stationName);
    setroundarrStation(stationId)
    handleRoundTrainModalClose(); // 모달 닫기
  }


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





  // 여기서부터 버스관련 함수
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
        setArrTerminalData([]);
        setSelectedTerminalId(null);
        console.error('API 요청 오류:', error);
      });
  };

  const handleRoundTerminalClick = (terminalName, terminalId) => {
    setSelectedroundTerminal(terminalName); // 선택된 터미널 이름을 상태로 설정
    setSelectedRoundTerminalId(terminalId);
    const apiUrl = `/publicApi/getArrBusList?tmnCd=${terminalId}`;

    axios.get(apiUrl)
      .then((response) => {
        console.log('API 호출 성공:', response); // API 응답 확인
        setArrTerminalData(response.data);
      })
      .catch((error) => {
        setArrTerminalData([]);
        setSelectedRoundTerminalId(null);
        console.error('API 요청 오류:', error);
      }
      );
  };
  const handleTerminalClick2 = (terminalName2, terminalId2) => {
    setSelectedTerminal2(terminalName2); // 선택된 터미널 이름을 상태로 설정
    // handleModalClose(); // 모달을 닫음
    setSelectedTerminalId2(terminalId2);
    handleModalClose(); // 모달 닫기
  };

  const handleroundTerminalClick2 = (terminalName2, terminalId2) => {
    setSelectedroundTerminal2(terminalName2); // 선택된 터미널 이름을 상태로 설정
    setSelectedRoundTerminalId2(terminalId2);
    handleSecondModalClose(); // 모달 닫기
  };

  const handleSearch = () => {
    const depTid = "NAEK" + selectedTerminalId;
    const arrTid = "NAEK" + selectedTerminalId2;
    const routeId = "NAEK" + selectedTerminalId + selectedTerminalId2;
    const depDate = datevalue;
    const busInfo = {
      depTerminalId: depTid,
      arrTerminalId: arrTid,
      routeId: routeId,
      depPlandTime: depDate,
      Party: party,
      depName: selectedTerminal,
      arrName: selectedTerminal2,
    };
    setBusInfo(busInfo);
    sessionStorage.setItem('key', JSON.stringify(busInfo));
  }

  return (

    <div className="ticket-info-form">
      <h2>빠른 검색</h2>

      <div className="form-state-button-groups" >
        <ButtonGroup variant="outlined" aria-label="outlined button group" >
          <Button onClick={() => handleTripTypeChange('one-way')}>편도</Button>
          <Button onClick={() => handleTripTypeChange('round-trip')}>왕복</Button>
          <Button id="Dropdonw-menu" aria-haspopup="true" onClick={handlebuttonClick}  >
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

        <form onSubmit={handleSubmit} className="form-ticketinfo-form" style={{ marginTop: 15 }} >
          <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
            <TextField value={depStationName} id="grouped-select" label="출발지" onClick={handleTrainModalOpen}
              readOnly />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
            <TextField value={arrStationName} id="grouped-select" label="도착지" onClick={handleTrainModalOpen}
              readOnly />
          </FormControl>
          <Modal open={trainModalopen} onClose={handleTrainModalClose} aria-labelledby="modal-modal-title"
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
              <Grid item xs={4} sx={{ height: 600 }}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={trainCityCode}
                  onChange={trainTabsSelect}
                  aria-label="Vertical tabs example"
                  style={{ height: 600 }}
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
              <Grid item xs={8} sx={{ height: 600 }}>
                <Grid container spacing={2} sx={{ height: 600 }} >
                  <Grid item xs={6} alignitem="center" sx={{ height: 600, marginTop: 2 }}>
                    <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }} > 출발지 </Typography>
                    <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >


                      {ktxStationsByCity.map((station, index) => (
                        <Traintabpanel
                          key={station.nodeId}
                          value={station.nodeId}
                          index={station.nodeId}
                          onSelect={() => handleStationSelect(station.nodeName, station.nodeId)}
                          selected={depStationName === station.nodeName}
                          align="center"
                          variant="scrollable"
                        >
                          {station.nodeName}
                        </Traintabpanel>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sx={{ height: 600, marginTop: 2 }} >
                    <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                    <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >

                      {ktxStationsByCity.map((station, index) => (
                        <Traintabpanel
                          key={station.nodeId}
                          value={station.nodeId}
                          index={station.nodeId}
                          onSelect={() => handleStationarrSelect(station.nodeName, station.nodeId)}
                          selected={arrStationName === station.nodeName}
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

          <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 1 }}>
            <InputLabel sx={{ paddingTop: 1 }} id="demo-simple-select-helper-label">인원</InputLabel>
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
          <div>
            <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: 3, backgroundColor: '#e6eeff', color: '#3b3b3b' }} onClick={handleSubmit}>검색</Button>
          </div>
        </form>
      )}


      {/*기차 왕복부분 시작 !!!!!!! */}

      {transportType === 'train' && tripType === 'round-trip' && (

        <>
          <form onSubmit={handleSubmit} className="form-ticketinfo-form" style={{ marginTop: 15 }} >


            <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
              <TextField value={depStationName} id="grouped-select" label="출발지" onClick={handleTrainModalOpen}
                readOnly />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
              <TextField value={arrStationName} id="grouped-select" label="도착지" onClick={handleTrainModalOpen}
                readOnly />
            </FormControl>

            <Modal open={trainModalopen} onClose={handleTrainModalClose} aria-labelledby="modal-modal-title"
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
                <Grid item xs={4} sx={{ height: 600 }}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={trainCityCode}
                    onChange={trainTabsSelect}
                    aria-label="Vertical tabs example"
                    style={{ height: 600 }}
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
                <Grid item xs={8} sx={{ height: 600 }}>
                  <Grid container spacing={2} sx={{ height: 600 }} >
                    <Grid item xs={6} alignitem="center" sx={{ height: 600, marginTop: 2 }}>
                      <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }} > 출발지 </Typography>
                      <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >


                        {ktxStationsByCity.map((station, index) => (
                          <Traintabpanel
                            key={station.nodeId}
                            value={station.nodeId}
                            index={station.nodeId}
                            onSelect={() => handleStationSelect(station.nodeName, station.nodeId)}
                            selected={depStationName === station.nodeName}
                            align="center"
                            variant="scrollable"
                          >
                            {station.nodeName}
                          </Traintabpanel>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ height: 600, marginTop: 2 }} >
                      <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                      <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >

                        {ktxStationsByCity.map((station, index) => (
                          <Traintabpanel
                            key={station.nodeId}
                            value={station.nodeId}
                            index={station.nodeId}
                            onSelect={() => handleStationarrSelect(station.nodeName, station.nodeId)}
                            selected={arrStationName === station.nodeName}
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

            <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 1 }}>
              <InputLabel sx={{ paddingTop: 1 }} id="demo-simple-select-helper-label">인원</InputLabel>
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


          <form onSubmit={handleSubmit} className="form-ticketinfo-form">
            <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
              <TextField value={rounddepStationName} id="grouped-select" label="출발지" onClick={handleRoundTrainModalOpen}
                readOnly />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, marginTop: 2 }}>
              <TextField value={roundarrStationName} id="grouped-select" label="도착지" onClick={handleRoundTrainModalOpen}
                readOnly />
            </FormControl>
            <Modal open={trainModalopen2} onClose={handleRoundTrainModalClose} aria-labelledby="modal-modal-title"
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
                <Grid item xs={4} sx={{ height: 600 }}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={trainCityCode}
                    onChange={trainTabsSelect}
                    aria-label="Vertical tabs example"
                    style={{ height: 600 }}
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
                <Grid item xs={8} sx={{ height: 600 }}>
                  <Grid container spacing={2} sx={{ height: 600 }} >
                    <Grid item xs={6} alignitem="center" sx={{ height: 600, marginTop: 2 }}>
                      <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }} > 출발지 </Typography>
                      <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >


                        {ktxStationsByCity.map((station, index) => (
                          <Traintabpanel
                            key={station.nodeId}
                            value={station.nodeId}
                            index={station.nodeId}
                            onSelect={() => handleroundStationSelect(station.nodeName, station.nodeId)}
                            selected={rounddepStationName === station.nodeName}
                            align="center"
                            variant="scrollable"
                          >
                            {station.nodeName}
                          </Traintabpanel>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ height: 600, marginTop: 2 }} >
                      <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 20, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                      <Grid item xs={12} sx={{ height: 550, overflowY: 'auto' }} >

                        {ktxStationsByCity.map((station, index) => (
                          <Traintabpanel
                            key={station.nodeId}
                            value={station.nodeId}
                            index={station.nodeId}
                            onSelect={() => handleroundStationarrSelect(station.nodeName, station.nodeId)}
                            selected={roundarrStationName === station.nodeName}
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
                    onChange={(newdatevalue) => setrounddatevalue(newdatevalue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>



            <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 1 }}>
              <InputLabel sx={{ paddingTop: 1 }} id="demo-simple-select-helper-label">인원</InputLabel>
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

            <div>
            <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: 3, backgroundColor: '#e6eeff', color: '#3b3b3b' }} onClick={handleSubmit}>검색</Button>
            </div>
          </form>
        </>
      )}

      {/*  기차 왕복 부분 끝 !!!!!!!!!!!!!*/}
      {transportType === 'bus' && tripType === 'one-way' && (
        <  >
          <form onSubmit={handleSubmit} className="form-ticketinfo-form">
            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 1 }}>
              {selectedTerminal ? null : <InputLabel sx={{ paddingTop: 1 }} htmlFor="grouped-select">출발지</InputLabel>}
              <TextField value={selectedTerminal} id="grouped-select" label="출발지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 1 }}>
              {selectedTerminal2 ? null : <InputLabel sx={{ paddingTop: 1 }} htmlFor="grouped-select">도착지</InputLabel>}
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

            <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 1 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ paddingTop: 1 }}>인원</InputLabel>
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
            <div>
            <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: 3, backgroundColor: '#e6eeff', color: '#3b3b3b' }} onClick={handleSubmit}>검색</Button>
            </div>
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
            }}>
            <Grid container spacing={2} style={{ width: 900, height: 500, background: 'white' }}>
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
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 출발지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
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
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
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
                  ))) : (
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

      {transportType === 'bus' && tripType === 'round-trip' && (
        <>

          <form onSubmit={handleSubmit} className="form-ticketinfo-form">

            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 1 }}>
              {selectedTerminal ? null : <InputLabel htmlFor="grouped-select" sx={{ paddingTop: 1 }}>출발지</InputLabel>}
              <TextField value={selectedTerminal} id="grouped-select" label="출발지" onClick={handleModalOpen} variant="outlined" />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 1 }}>
              {selectedTerminal2 ? null : <InputLabel htmlFor="grouped-select" sx={{ paddingTop: 1 }}>도착지</InputLabel>}
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

            <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 1 }}>
              <InputLabel sx={{ paddingTop: 1 }} id="demo-simple-select-helper-label">인원</InputLabel>
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
            </FormControl></form>

          {/*왕복 */}<form onSubmit={handleSubmit} className="form-ticketinfo-form">

            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 3 }}>
              {selectedTerminal ? null : <InputLabel htmlFor="grouped-select" sx={{ paddingTop: 3 }}>출발지</InputLabel>}
              <TextField value={selectedroundTerminal} id="grouped-select" label="출발지" onClick={handleSecondModalOpen} variant="outlined" />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, width: 120, paddingTop: 3 }}>
              {selectedTerminal2 ? null : <InputLabel htmlFor="grouped-select" sx={{ paddingTop: 3 }}>도착지</InputLabel>}
              <TextField value={selectedroundTerminal2} id="grouped-select" label="도착지" onClick={handleSecondModalOpen} variant="outlined" />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120, height: '200%', paddingTop: 2 }}>
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

            <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 3 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ paddingTop: 3 }}>인원</InputLabel>
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
            <div>
            <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: 3, backgroundColor: '#e6eeff', color: '#3b3b3b', color: '#3b3b3b' }} onClick={handleSubmit}>검색</Button>
            </div></form>
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

            <Grid container spacing={2} style={{ width: 900, height: 500, background: 'white' }}>
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
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 출발지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
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
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
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
                  ))) : (
                    <TabPanel value={0} index={0}>
                      {ArrTerminalData ? <span>도착지 정보가 없습니다.</span> : null}
                    </TabPanel>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Modal>

          <Modal
            open={SecondModalOpen}
            onClose={handleSecondModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2} style={{ width: 900, height: 500, background: 'white' }}>
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
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 출발지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
                  {filteredTerminals.map((terminal) => (
                    <TabPanel key={terminal.id} value={uniqueRegionKey.indexOf(selectedTab)} index={uniqueRegionKey.indexOf(selectedTab)}
                      sx={{
                        cursor: 'pointer', // 포인터 커서로 나타나게 함
                        padding: '16px', // 내용 주위에 약간의 여백 추가
                      }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleRoundTerminalClick(terminal.name, terminal.id)} >
                        {terminal.name}
                      </span>
                    </TabPanel>
                  ))}
                </Box>
              </Grid>
              {/* 오른쪽 영역 */}
              <Grid item xs={4} style={{ height: '80%' }}>
                <Typography align="center" style={{ fontWeight: 'bold', fontsize: 15, marginTop: 10, marginBottom: 5, marginRight: 15 }}> 도착지 </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: "100%", background: 'white', marginTop: '10px' }}>
                  {ArrBusTerminals.length > 0 ? (ArrBusTerminals.map((terminal) => (
                    <TabPanel key={terminal.arrid} value={terminal.arrid} index={terminal.arrid}
                      sx={{
                        cursor: 'pointer', // 포인터 커서로 나타나게 함
                        padding: '16px', // 내용 주위에 약간의 여백 추가
                      }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleroundTerminalClick2(terminal.arrname, terminal.arrid)} >
                        {terminal.arrname}
                      </span>
                    </TabPanel>
                  ))) : (
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


    </div>


  );
}

export default Ticketinfoform;