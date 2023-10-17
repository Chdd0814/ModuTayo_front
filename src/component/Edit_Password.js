import React,{useEffect, useState} from 'react';
import Mypage from './Mypage';
import axios from 'axios';
import './FontCss.css';
import {Unstable_Grid2,Button,TableContainer,Table,TableBody,TableRow,TableCell,Paper,TextField,Typography} from '@mui/material';
import SnackbarCompnents from './SnackbarComponent';
import { useNavigate } from 'react-router-dom';
const Edit_Password=(props)=>{
    const navigate = useNavigate();
    const [id,setId]=useState('');
    useEffect(() => {
        setId(localStorage.getItem('userId'));},[]);
    const handleSubmit=async(e)=>{
        e.preventDefault();   
            
            await axios.put(`/updateMember/${id}`,checkPass)
            .then(response=>{
                setAlertOpen({
                    successOpen:true
                })
            })
            .catch(error=>{
                setAlertOpen({
                    errorOpen:true
                })
            })
    };
    const [checkPass,setCheckPass]=useState({
        oldPass:'',
        newPass:'',
        newPass_confirm:''
    });
    const [alertOpen,setAlertOpen]=useState({
        successOpen: false,
        errorOpen: false
    });
    const handlePass = (e)=>{
        console.log(checkPass)
       const {name,value}=e.target;

       setCheckPass((prevData)=>({
        ...prevData
        ,[name]:value
       }))
    }
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
                <TableContainer component={Paper} elevation={3} >
                <Table aria-label='simple table' > 
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{backgroundColor:'#5ACCFF'}}>
                            <Typography fontSize={20} fontFamily="GmarketSansMedium"> 비밀번호 확인</Typography>
                            </TableCell>    
                            <TableCell sx={{backgroundColor:'#E8F5FF'}}>
                                <TextField   type="password"  name='oldPass' variant="outlined" onChange={handlePass} size="large" /> 
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{backgroundColor:'#5ACCFF'}}>
                            <Typography fontSize={20} fontFamily="GmarketSansMedium"> 비밀번호 설정</Typography>
                            </TableCell>    
                            <TableCell sx={{backgroundColor:'#E8F5FF'}}>
                                <TextField   type="password"  name='newPass' variant="outlined" onChange={handlePass} size="large" /> 
                            </TableCell>
                        </TableRow>   
                        <TableRow>
                            <TableCell sx={{backgroundColor:'#5ACCFF'}}>
                            <Typography fontSize={20} fontFamily="GmarketSansMedium"> 비밀번호 재설정</Typography>
                            </TableCell>    
                            <TableCell sx={{backgroundColor:'#E8F5FF'}}>
                                <TextField   type="password"  name='newPass_confirm' variant="outlined" onChange={handlePass} size="large" /> 
                            </TableCell>
                        </TableRow>        
                    </TableBody>
                </Table> 
             </TableContainer> 
                </Unstable_Grid2 >
                <Unstable_Grid2>
                <Button type="submit" variant="contained" size='large'>수정</Button>
                </Unstable_Grid2>     
            </Unstable_Grid2>     
        </Unstable_Grid2>
        <SnackbarCompnents handleclose={handleClose} openProps={alertOpen.errorOpen} alert_state='error' alert_content="비밀번호 재설정에 실패했습니다." alert_title="비밀번호 재설정 실패"/>
        <SnackbarCompnents handleclose={handleClose} openProps={alertOpen.successOpen} alert_state='success' alert_content="비밀번호 재설정에 성공했습니다." alert_title="비밀번호 재설정 성공"/>
         </form>
        );
}

export default Edit_Password;