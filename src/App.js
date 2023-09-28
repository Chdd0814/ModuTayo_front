import React, { useState } from 'react';
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
import Trainticket  from './component/Trainticket';
import MyPage from './component/Mypage';
import EditMember from './component/EditMember';
import DeleteMember from './component/DeleteMember';
import LineInfo from './component/LineInfo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    // 로그인 처리 로직
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
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
          <Route exact path="/login" element ={<Login onLogin={handleLogin} />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:num" element={<NoticeDetail />} />
          <Route path="/notice/write" element={<NotcieWrite />} />
          <Route path="/notice/:num/edit" element={<NoticeEdit />} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/train" element = {<Trainticket/>} />
          <Route path="/bus"  /> 
          <Route path = "/lineinfo" element= {<LineInfo/> } />
          <Route path = "/mypage" element = {<MyPage/>} />
          <Route path = "/EditMember" element = {<EditMember/>} />
          <Route path = "/DeleteMember" element = {<DeleteMember />} />
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
