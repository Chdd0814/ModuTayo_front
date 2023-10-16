import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Login from './component/Login';
import Notice from './component/notice'; 
import NoticeDetail from './component/noticeDetail';
import NotcieWrite from './component/noticeWrite';
import NoticeEdit from './component/noticeEdit';
import Register from './component/Register';
import LineInfo from './component/LineInfo';
import Trainticket  from './component/Trainticket';
import MyPage from './component/Mypage';
import EditMember from './component/EditMember';
import DeleteMember from './component/DeleteMember';
import Payment from './component/Payment';
import BusPayment from './component/BusPayment'
import clearLocalStorage from './component/clearLocalStorage';
import BusBooking from './component/BusBooking';
import TrainBooking from './component/TrainBooking';
import AdminMember from './component/AdminMember';
import PaymentHistoryBus from './component/PaymentHistoryBus';
import PaymentHistoryTrain from './component/PaymentHistoryTrain';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Busticket from './component/Busticket';
import Idsearch from './component/IdSearch';
import PasswordSearch from './component/PasswordSearch';
import BannerEdit from './component/Admin_BannerEdit';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const [open,setOpen] =useState({
    ticketingOpen: false,
    paymentOpen: false,
    memberOpen: false,
    adminOpen: false
  });
  const handleOpen=(idenTifier)=>{
    setOpen((prevData)=>({
        ...prevData,
        [idenTifier]:!prevData[idenTifier]
    }));
}
  const handleLogin = () => {
    // 로그인 처리 로직
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
    clearLocalStorage()();
  };
  return (
    <Router>
    <div className="App">
      <div className="App-Header">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>
      <div className="App-main">
        <Routes>
          <Route exact path="/" element ={<Home/>} />
          <Route exact path="/login" element={<Login onLogin={handleLogin}  />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:num" element={<NoticeDetail />} />
          <Route path="/notice/write" element={<NotcieWrite />} />
          <Route path="/notice/:num/edit" element={<NoticeEdit />} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/train" element = {<Trainticket isLoggedIn={isLoggedIn}/>} />
          <Route path="/bus" element = {<Busticket isLoggedIn={isLoggedIn}/>} /> 
          <Route path = "/lineinfo" element= {<LineInfo/> } />
          <Route path="/mypage" element={<MyPage open={open} handleOpen={handleOpen}/>} />
          <Route path="/EditMember" element={<EditMember  open={open} handleOpen={handleOpen}/>} />
          <Route path="/DeleteMember" element={<DeleteMember onLogout={handleLogout} open={open} handleOpen={handleOpen}/>} />
          <Route path="/BusBooking" element={<BusBooking open={open} handleOpen={handleOpen} />} />
          <Route path="/TrainBooking" element={<TrainBooking open={open} handleOpen={handleOpen} />}/>
          <Route path="/AdminMember" element={<AdminMember open={open} handleOpen={handleOpen}/>}/>
          <Route path="/PaymentHistoryBus" element={<PaymentHistoryBus open={open} handleOpen={handleOpen}/>}/>
          <Route path="/PaymentHistoryTrain" element={<PaymentHistoryTrain open={open} handleOpen={handleOpen} />}/>
          <Route path = "/payment" element = {<Payment />} />
          <Route path = "/Buspayment" element = {<BusPayment />} />
          <Route path = "/idSearch" element = {<Idsearch />} />
          <Route path = "/passwordSearch" element = {<PasswordSearch />} />
          <Route path = "/BannerEdit" element = {<BannerEdit open={open} handleOpen={handleOpen} />} />
          {/* 여기서 Route 관련 코드들을 복사해서 App-main 영역에 출력될 부분만 추가.*/}
        </Routes>
      </div>
      <div className="App-footer">
        <Footer />
      </div>
    </div>
  </Router>
  );
}

export default App;
