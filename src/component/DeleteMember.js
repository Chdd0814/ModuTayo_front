import React,{useState} from 'react';
import Mypage from './Mypage';
import axios from 'axios';
import './FontCss.css';
import {Unstable_Grid2,Button,TableContainer,Table,TableBody,TableRow,TableCell,Paper,TextField,Typography} from '@mui/material';
import {AlertSnackBar} from './EditMember';
import { useNavigate } from 'react-router-dom';
const DeleteMember=(props)=>{
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(props.login.password===checkPass){
            
            await axios.delete(`/DeleteMember/${props.login.username}`);
            props.onLogout();
            alert('회원탈퇴가 완료되었습니다.')
            navigate('/');
            
            
        }else{
            setAlertOpen({
                errorOpen:true
            })
        }

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
            <Unstable_Grid2>
            <Mypage/>
            </Unstable_Grid2>
            <Unstable_Grid2 container direction='column' alignItems="center"  xs={10} rowSpacing={20}>
            
                <Unstable_Grid2 xs={5}>
                    
                <TableContainer component={Paper} elevation={3}>
                <Table aria-label='simple table'> 
                    <TableBody>
                        <TableRow>
                            <TableCell>
                            <Typography fontSize={20} fontFamily="GmarketSansMedium"> 비밀번호 확인</Typography>
                            </TableCell>    
                            <TableCell>
                                <TextField   type="password"  name='password' variant="outlined" onChange={(e)=>{setCheckPass(e.target.value)}} size="large" /> 
                            </TableCell>
                        </TableRow>    
                    
                    </TableBody>
                </Table> 
             </TableContainer> 
                </Unstable_Grid2 >
                <Unstable_Grid2>
                <Button type="submit" variant="contained" size='large'> 탈퇴</Button>
                
                </Unstable_Grid2>
            
            </Unstable_Grid2>
            
        </Unstable_Grid2>
        <AlertSnackBar openState={alertOpen.errorOpen} close={handleClose} severityState="error" str="회원탈퇴에 실패했습니다." />
        </form>
        );
}

export default DeleteMember;