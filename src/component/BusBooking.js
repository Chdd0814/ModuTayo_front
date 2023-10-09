import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import TableSearch from './TableBookingSearch';
import axios from 'axios';
/*moment */
const BusBooking=(props)=>{
    const {open,handleOpen}=props
    const [formData,setFormData]=useState([]);
    const TableColor=['#0078FF','#F4FFFF','#F9FFFF'];
    const [busTitle,setBusTitle]= useState(['탑승번호','버스클래스','출발터미널','도착터미널','출발시간','도착시간','자리번호']);
    const [busContent,setBusContent]=useState([
        {key:'routeId',width:80},
        {key:'busClass',width:100},
        {key:'departureStation',width:90},
        {key:'arrivalStation',width:90},
        {key:'departureTime',width:200},
        {key:'arrivalTime',width:200},
        {key:'seatNumber',width:80}
    ])

    const handlebusbooking=useCallback(async(id)=>{
        try{
            const response=await axios.get(`/BusBooking/${id}`);
            setFormData(response.data);
        }catch(error){
            console.error(error);
        }
    },[])
    useEffect(()=>{
        handlebusbooking(localStorage.getItem('userId'));
    },[handlebusbooking]);
    return(
        <Grid2 container direction='row'>
        <Mypage open={open} handleOpen={handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center"  rowSpacing={5} >
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableSearch />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    <DataTable title={busTitle} TableColor={TableColor} membercontent={busContent} member={formData}/>
                </Grid2>
            </Grid2>
        </Grid2>);
}

export default BusBooking;