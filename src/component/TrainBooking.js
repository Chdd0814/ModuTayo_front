import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import TableSearch from './TableBookingSearch';
import axios from 'axios';
const TrainBooking=(props)=>{
    const {open,handleOpen,id}=props
    const [formData,setFormData]=useState([]);
    const TableColor=['#0078FF','#F4FFFF','#F9FFFF'];
    const [TrainTitle,setBusTitle]= useState(['역번호','기차종류','출발역','도착역','출발시간','도착시간','자리번호']);
    const [TrainContent,setTrainContent]=useState([
        {key:'trainNumber',width:80},
        {key:'vehicleTypeName',width:100},
        {key:'departureStation',width:90},
        {key:'arrivalStation',width:90},
        {key:'departureTime',width:200},
        {key:'arrivalTime',width:200},
        {key:'seatNumber',width:80}
    ])
    const handlebusbooking=useCallback(async(e)=>{
        try{
            const response=await axios.get(`/TrainBooking/${id}`);
            setFormData(response.data);
            console.log(response.data);
        }catch(e){
            console.error(e);
        }
    },[])
    useEffect(()=>{
        handlebusbooking();
    },[handlebusbooking]);
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
        </Grid2>);
}
export default TrainBooking;