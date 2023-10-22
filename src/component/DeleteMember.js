import React,{useEffect, useState} from 'react';
import Mypage from './Mypage';
import axios from 'axios';
import './FontCss.css';
import {Unstable_Grid2,Button,TableContainer,Table,TableBody,TableRow,TableCell,Paper,TextField,Typography} from '@mui/material';
import SnackbarCompnents from './SnackbarComponent';
import { useNavigate } from 'react-router-dom';
import calluserInfo from './calluserInfo';
import Login from './Login';

const DeleteMember=(props)=>{
    const navigate = useNavigate();
    const [id,setId]=useState('');
    const [LoginType, setLoginType] = useState('Normal');
    useEffect(() => {
        
        const userInfo = calluserInfo();
        console.log(userInfo);
        if(userInfo.sns) {
            setLoginType(userInfo.sns);
            console.log(LoginType);
        }

        if(LoginType === 'Normal') {
            setId(sessionStorage.getItem('userId'));

        } else {
            setId(userInfo.sub);
        }
        
    },[]);
        
    const handleSubmit=async(e)=>{
        e.preventDefault();   
            await axios.delete(`/DeleteMember/${id}?password=${checkPass}`)
            .then(response=>{
                if(LoginType === 'Normal') {
                    props.onLogout();
                    alert('회원탈퇴가 완료되었습니다.')
                    navigate('/');

                } else {
                    window.Kakao.API.request({
                        url: '/v1/user/unlink',
                      })
                        .then(function(response) {
                          console.log(response);
                        })
                        .catch(function(error) {
                          console.log(error);
                        });

                        props.onLogout();
                        alert('회원탈퇴가 완료되었습니다.')
                        navigate('/');
                }
            })
            .catch(error=>{
                setAlertOpen({
                    errorOpen:true
                })
            })
    };
    const [checkPass,setCheckPass]=useState('');
    const [alertOpen,setAlertOpen]=useState({
        successOpen: false,
        errorOpen: false
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen({
            successOpen:false,
            errorOpen:false
        })
    }
    return(
        <form onSubmit={handleSubmit}>
        <Unstable_Grid2 container direction='row' alignItems="center">
        <Unstable_Grid2 width={250}>
            <Mypage open={props.open} handleOpen={props.handleOpen}/>
            </Unstable_Grid2>
            <Unstable_Grid2 container direction='column' alignItems="center"  xs={9} rowSpacing={20}>
                <Unstable_Grid2 xs={5}>       
                <TableContainer component={Paper} elevation={3}>
                <Table aria-label='simple table'> 
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{backgroundColor:'#5ACCFF'}}>
                            <Typography fontSize={20} fontFamily="GmarketSansMedium"> 비밀번호 확인</Typography>
                            </TableCell>    
                            <TableCell sx={{backgroundColor:'#E8F5FF'}}>
                                <TextField   type="password"  name='password' variant="outlined" onChange={(e)=>{setCheckPass(e.target.value)}} size="large" /> 
                            </TableCell>
                        </TableRow>     
                    </TableBody>
                </Table> 
             </TableContainer>
             {LoginType === 'Kakao' && ( 
                 <Typography sx = {{fontWeight : 'bold', fontSize : 18, color : 'red', margin : 1  }}>비밀번호 대신, 소셜 로그인으로 가입한 계정의 이메일 주소를 입력하시면 탈퇴가 가능합니다.</Typography> 
             )}
                </Unstable_Grid2 >
                <Unstable_Grid2>
                <Button type="submit" variant="contained" size='large'> 탈퇴</Button>
                </Unstable_Grid2>  
            </Unstable_Grid2>     
        </Unstable_Grid2>
        <SnackbarCompnents handleclose={handleClose} openProps={alertOpen.errorOpen} alert_state='error' alert_content="회원 탈퇴에 실패했습니다." alert_title="회원탈퇴 실패"/>
        </form>
        );
}

export default DeleteMember;