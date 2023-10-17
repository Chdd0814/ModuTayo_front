import React,{useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import {Button,Dialog,DialogActions,DialogContent,Box,DialogTitle,Typography} from '@mui/material';
import SnackbarCompnents from './SnackbarComponent';
import dayjs from "dayjs";
import './FontCss.css';
const Dialog_Booking=(props)=>{
    const {item,open,handleClose,allBooking}=props;    
    const [openprops,setOpenprops]=useState(false);
    const handleDelete=useCallback(async()=>{
         try{
         await Promise.all([
            axios.delete(`/busTicket/delete/${item.ticketNumber}`),
            axios.delete(`/payment/delete/${item.ticketNumber}`)
          ]);
         setOpenprops(true);
         allBooking();
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
    
    const isAfter=dayjs(`${item.reservationDate} ${item.departureTime}`,'YYYY-MM-DD HH:mm').add(30,'minute').isAfter(dayjs())
    return(
        <Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
            <Typography fontFamily='GmarketSansMedium'>{item.ticketNumber}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" fontFamily='GmarketSansMedium' gutterBottom>
                환불은 출발 후 30분까지 하실 수 있으며 남은 시간에 따라 환불 금액이 상이합니다.
                </Typography>
                <Typography fontFamily='GmarketSansMedium'>
                    출발전 24~12시간 : 80%
                    </Typography> <Typography fontFamily='GmarketSansMedium'>
                    출발전 12시~ 출발후 30분 : 50% </Typography>
                    
            </DialogContent>
            <DialogActions>
                <Button  disabled={!isAfter}  variant='contained' onClick={handleDelete}>환불</Button>
                <Button variant='outlined' onClick={handleClose}>cancle</Button>
            </DialogActions>
        </Dialog>
            <SnackbarCompnents handleclose={handleclose_alert} openProps={openprops} alert_state='success' alert_content="유저의 환불을 성공했습니다." alert_title="환불 완료"/>
           
        </Box>
        
    );
}
export default Dialog_Booking;

