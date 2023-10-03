import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import axios from 'axios';
import TableSearch from './TableBookingSearch';


const PaymentHistoryTrain=(props)=>{
    const {open,handleOpen,id}=props
    const [formData,setFormData]=useState([]);
    const TableColor=['#3DFF92','#F0FFF0','#AFFFEE'];
    const [TrainTitle,setBusTitle]= useState(['1','2','3','4','5','6','7']);
    const [TrainContent,setBusContent]=useState([
        {key:'trainticketNumber ',width:80},
        {key:'impUid ',width:100},
        {key:'merchantUid ',width:90},
        {key:'paidAmount ',width:90},
        {key:'payMethod ',width:200},
        {key:'arrivalTime',width:200},
        {key:'seatNumber',width:80}
    ])
    const handlePaymentHistoryTrain=useCallback(async(e)=>{
        try{
            const response=await axios.get(`/Payment/${id}`);
            setFormData(response.data);
        }catch(e){
            console.error(e);
        }
    },[])
    useEffect(()=>{
        handlePaymentHistoryTrain();
    },[handlePaymentHistoryTrain]);
    return(
        <Grid2 container direction='row'>
        <Mypage open={open} handleOpen={handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center"  rowSpacing={5} >
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableSearch />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    <DataTable title={TrainTitle} TableColor={TableColor} membercontent={TrainContent} member={formData}/>
                </Grid2>
            </Grid2>
        </Grid2>
    );

}
export default PaymentHistoryTrain;