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
import LineInfo from './component/LineInfo';
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
          <Route exact path="/" Component={<Home/>} />
          <Route exact path="/login" Component={<Login onLogin={handleLogin} />} />
          <Route path="/notice" Component={<Notice />} />
          <Route path="/notice/:num" Component={<NoticeDetail />} />
          <Route path="/notice/write" Component={<NotcieWrite />} />
          <Route path="/notice/:num/edit" Component={<NoticeEdit />} />
          <Route path="/register" Component = {<Register/>} />
          <Route path="/train" Component = {<Trainticket/>} />
          <Route path="/bus"  /> 
          <Route path = "/lineinfo" Component= {<LineInfo/> } />
          <Route path = "/mypage" Component = {<MyPage/>} />
          <Route path = "/EditMember" Component= {<EditMember/>} />
          <Route path = "/DeleteMember" Component= {<DeleteMember />} />
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
