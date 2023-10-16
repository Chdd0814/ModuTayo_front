import React,{useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import {Button,Dialog,DialogActions,DialogContent,Box,DialogTitle} from '@mui/material';
import SnackbarCompnents from './SnackbarComponent';
const AdminMember_dialog=(props)=>{
    const {item,open,handleClose,isadmin,allBooking}=props;    
    const [openprops,setOpenprops]=useState(false);
    const handleDelete=useCallback(async()=>{
        try{
        await axios.delete(`/AdminMember/delete/${id}`)
        setOpenprops(true);
        allMember();
        }catch(error){
            console.error(error);
        }
    })
    const handleclose_alert=(event, reason)=>{
        if(reason==='clickway'){
            return;
        }
        setOpenprops(false);
    }
    
    return(
        <Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {item.ticketNumber}    
            </DialogTitle>
            <DialogContent>
                    환불은 출발 후 30분까지 하실 수 있으며 남은 시간에 따라 환불 금액이 상이합니다.
                    출발전 24~12시간 : 80%환불
                    출발전 12시~ 출발후 30분 : 50%환불 
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleUpdate}>환불</Button>
                <Button variant='outlined' onClick={handleClose}>cancle</Button>
            </DialogActions>
        </Dialog>
            <SnackbarCompnents handleclose={handleclose_alert} openProps={openprops} alert_state='success' alert_content="유저의 환불을 성공했습니다." alert_title="환불 완료"/>
           
        </Box>
        
    );
}
export default AdminMember_dialog;

