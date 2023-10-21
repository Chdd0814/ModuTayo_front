import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';
import mainLogo from '../ModuTayo.png';
import kakaoLoginImg from '../images/kakao_login.png';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Login = ({ onLogin, setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 상태
  const [loginError, setLoginError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 저장된 아이디를 검색하여 필드에 입력
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    // 아이디 저장 체크박스의 상태를 복원
    const rememberMeStatus = Cookies.get('rememberMe');
    if (rememberMeStatus === 'true') {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };

    axios.post('/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const token = response.data.accessToken;

      if (token) {
        // 로그인 성공 시 사용자 정보 및 아이디 저장 상태를 저장
        if (rememberMe) {
          Cookies.set('username', data.username);
          Cookies.set('rememberMe', 'true');
        } else {
          // 아이디 저장 체크박스가 해제된 경우 저장된 아이디 및 상태 제거
          Cookies.remove('username');
          Cookies.remove('rememberMe');
        }
        Cookies.set('userToken', token);
        onLogin(true);
        history('/');
      } else {
        setLoginError('로그인에 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error(error);
      setLoginError('로그인 중 오류가 발생했습니다.');
    });
  };

  const goToSignUp = (event) => {
    event.preventDefault();
    history('/register');
  };

  const goToIdSearch = (event) => {
    event.preventDefault();
    history('/idSearch');
  };

  const goToPasswordSearch = (event) => {
    event.preventDefault();
    history('/passwordSearch');
  };

  return (
    <div className="login-container">
      <h2>
        <img src={mainLogo} alt="로고" />
      </h2>
      <form className="form-container">
        <label className="label">
          <TextField
            type="text"
            value={username}
            onChange={handleUsernameChange}
            label="아이디"
            style={{ width: "22em" }}
          />
        </label>
        <label className="label">
          <TextField
            type="password"
            label="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "22em" }}
          />
        </label>
        <label className="label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          아이디 저장
        </label>
        <ButtonGroup className="Button">
          <Button variant="contained" type="button" onClick={handleLogin} style={{ width: "22em" }}>
            로그인
          </Button>
          {loginError && <Grid color='red' className="error" fontFamily="GmarketSansMedium">{loginError}</Grid>}
          <ButtonGroup aria-label="Second group" className="Id_pass">
            <Button aria-label="Third group" className="SignUp" variant="primary" onClick={goToSignUp}>
              회원가입
            </Button>
            <Button variant="primary" onClick={goToIdSearch}>
              아이디 찾기
            </Button>
            <Button className="Pass" variant="primary" onClick={goToPasswordSearch}>
              비밀번호 찾기
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Login;
