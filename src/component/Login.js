  import React, { useState } from 'react';
  import axios from 'axios';
  import './Login.css';

  import logoExpress from '../logoExpress.png'; // 로고 이미지의 경로 설정
  import { useNavigate } from 'react-router-dom';
  import TextField from '@mui/material/TextField';
  import PassWordField from '@mui/material/TextField';
  import Grid from '@mui/material/Unstable_Grid2';
  import Button from '@mui/material/Button';

  const Login = ({ onLogin,setLogin }) => {
    const [idError, setidError] = useState('');
    const [passError, setpassError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null); // 에러 메시지 상태
    const [idpwError, setIdpwError] = useState('');
    const history = useNavigate();

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };


    const handleLogin = () => {

      const data = {
        username: username,
        password: password,
      };
      
      axios.post('/login', data)
        .then((response) => {
          console.log(response.data);
          // 서버에서 반환한 토큰을 사용
          const token = response.data.token;
      
          if (token) {
            // 토큰이 존재하는 경우 로그인 성공 처리
            localStorage.setItem('token', token); 
            setLogin(data);
            onLogin();
            history('/');
          } else {
            // 토큰이 존재하지 않는 경우 로그인 실패 처리
            setLoginError('로그인에 실패했습니다.');
            setIdpwError('아이디 혹은 비밀번호가 틀렸습니다!');
          }
        })
        .catch((error) => {
          console.error(error);
          setLoginError('로그인 중 오류가 발생했습니다.');
        });


    };

    return (
      <div className="login-container">

      <h2>
        <img src={logoExpress} alt="로고" /> {/* 이미지 태그로 로고 이미지 삽입 */}
      </h2>
    <form className="form-container">
      <label className="label">
          <TextField type="text" value={username} onChange={handleUsernameChange} label="아이디" />
      </label>
      <label className="label">
          <TextField type="password" label="비밀번호" value={password} onChange={handlePasswordChange} />
      </label>
      <Button variant="contained" type="button" onClick={handleLogin}>
        로그인
      </Button>
      {loginError && <Grid color='red' className="error" fontFamily="GmarketSansMedium">{loginError}</Grid>}
    </form>
  </div>
    );
  };


  export default Login;
