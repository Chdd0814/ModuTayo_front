  import React, { useState } from 'react';
  import axios from 'axios';
  import './Login.css';

  import logoExpress from '../logoExpress.png'; // 로고 이미지의 경로 설정
  import { useNavigate } from 'react-router-dom';

  const Login = ({ onLogin }) => {
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

      // 백엔드로 로그인 요청을 보내기
      axios.post('/login', data)
      .then((response) => {
        console.log(response.data);
    
        if (response.data === "success") {
          // 로그인 성공 시 메인 페이지로 이동
          onLogin();
          history('/');
        } else {
          // 로그인 실패 시 에러 메시지 표시
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
            {username ? (
              <input type="text" className="input" value={username} onChange={handleUsernameChange} />
            ) : (
              <input type="text" className="input" placeholder="아이디" value={username} onChange={handleUsernameChange} />
            )}
          </label>
          <label className="label">
            {password ? (
              <input type="password" className="input" value={password} onChange={handlePasswordChange} />
            ) : (
              <input type="password" className="input" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            )}
          </label>
          <button type="button" className="button" onClick={handleLogin}>
            로그인
          </button>
          {loginError && <p className="error">{loginError}</p>}
          {idpwError && <p Color='red'>{idpwError}</p>}
        </form>
      </div>
    );
  };


  export default Login;
