  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import './Login.css';

  import mainLogo from '../ModuTayo.png'; // 로고 이미지의 경로 설정
  import kakaoLoginImg from '../images/kakao_login.png';
  import { useNavigate } from 'react-router-dom';
  import TextField from '@mui/material/TextField';
  import PassWordField from '@mui/material/TextField';
  import Grid from '@mui/material/Unstable_Grid2';
  import Button from '@mui/material/Button';
  import ButtonGroup from "react-bootstrap/ButtonGroup";
import calluserInfo from './calluserInfo';

  const Login = ({ onLogin,setLogin }) => {
    const [idError, setidError] = useState('');
    const [passError, setpassError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 상태
    const [loginError, setLoginError] = useState(null); // 에러 메시지 상태
    const [idpwError, setIdpwError] = useState('');
    const history = useNavigate();

    // useEffect(() => {
    //   // 페이지가 로드될 때 저장된 아이디를 검색하여 필드에 입력
    //   const savedUsername = Cookies.get('username');
    //   if (savedUsername) {
    //     setUsername(savedUsername);
    //   }
    //   // 아이디 저장 체크박스의 상태를 복원
    //   const rememberMeStatus = Cookies.get('rememberMe');
    //   if (rememberMeStatus === 'true') {
    //     setRememberMe(true);
    //   } else {
    //     setRememberMe(false);
    //   }
    // }, []);

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
      axios.post('/login', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          // 서버에서 반환한 토큰을 사용
          const token = response.data.accessToken;
          console.log(token)
      
          if (token) {
            // 토큰이 존재하는 경우 로그인 성공 처리
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', data.username);
            // 로그인 상태를 설정하거나 필요한 작업을 수행하세요.
            // setLogin(true); // 예시: 로그인 상태를 true로 설정
            onLogin(true);
            history("/");
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

    const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
    };

    const kakaoLoginAPIKey = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;



    /**
   * 카카오 로그인
   * 카카오에 로그인 후 토큰을 받아, 그 토큰을 서버로 보내 accessToken을 발행
   * @param {*} event
   */
  const kakaoLogin = (event) => {
    event.preventDefault();

    // console.log(kakaoLoginAPIKey);

    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoLoginAPIKey);
    }

    // 카카오 로그인 요청
    window.Kakao.Auth.login({
      scope: "profile_nickname,account_email",
      success: async (response) => {
        try {
          const kakaoLoginRes = await axios.post(
            "/kakaoLogin",
            {
              accessToken: response.access_token

            }
          );
          if (kakaoLoginRes.status === 200) {
            // accessToken을 쿠키에 저장
          //  console.log(kakaoLoginRes.accessToken);
            const saveData = (
              kakaoLoginRes.data.accessToken,
              kakaoLoginRes.data.tokenExpiresIn

            );
            const token = kakaoLoginRes.data.accessToken;



            if(token) {

              sessionStorage.setItem("token", token);
               onLogin(true);
                history("/");

              const userInfo = calluserInfo();

              if (userInfo) {
                const userid = userInfo.sub;
                sessionStorage.setItem('userId', userid);
                if (userid) {
                 onLogin(true);
                 history("/");
                }
              }
             
            }
          } else {
            alert("로그인 실패. 다시 로그인 해주세요.");
            history("/login");
          }
        } catch (error) {
          console.error("로그인 오류:", error);
          alert("아이디와 비밀번호를 확인해주세요");
        }
      },
      fail: (error) => {
        console.log("카카오 로그인 실패", error);
      },
    });
  };


    const goToSignUp = (event) => {
      event.preventDefault();
      history("/register");
    };
  
    const goToIdSearch = (event) => {
      event.preventDefault();
      history("/idSearch");
    };
  
    const goToPasswordSearch = (event) => {
      event.preventDefault();
      history("/passwordSearch");
    };
    

    return (
      <div className="login-container">

      <h2>
        <img src={mainLogo} alt="로고" /> {/* 이미지 태그로 로고 이미지 삽입 */}
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
          <Button
            aria-label="Third group"
            className="SignUp"
            variant="primary"
            onClick={goToSignUp}
          >
            회원가입
          </Button>
            <Button variant="primary" onClick={goToIdSearch}>
              아이디 찾기
            </Button>
            <Button
              className="Pass"
              variant="primary"
              onClick={goToPasswordSearch}
            >
              비밀번호 찾기
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      <Button>
      <img
          onClick={kakaoLogin}
          src={kakaoLoginImg}
          alt="Kakao Login"
          width={250}
          height={50}
        />
      </Button>
    </form>
  </div>
    );
  };


  export default Login;
