import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import TableSearch from './TableBookingSearch';
import axios from 'axios';
import dayjs from "dayjs";
/*moment */
const BusBooking=(props)=>{
    const {open,handleOpen}=props
    const [formData,setFormData]=useState([]);
    const TableColor=['aliceblue','#F4FFFF','#F9FFFF'];
    const [busTitle,setBusTitle]= useState(['출발날짜','버스클래스','출발터미널','도착터미널','출발시간','도착시간','자리번호']);
    const [busContent,setBusContent]=useState([
        {key:'reservationDate',width:80},
        {key:'busClass',width:80},
        {key:'departureStation',width:100},
        {key:'arrivalStation',width:100},
        {key:'departureTime',width:80},
        {key:'arrivalTime',width:80},
        {key:'seatNumber',width:80}
    ])
    const [SearchFilter,setSearchFilter]=useState({
        id:localStorage.getItem('userId'),
        start:'',
        end:'',
        startDay: dayjs().format('YYYY-MM-DD'),
        endDay:dayjs().format('YYYY-MM-DD')
    });
    const handleChangeSearch= (e)=>{
        const {name,value}=e.target
        setSearchFilter(prevdata=>({
            ...prevdata,
            [name]:value
        }));
    }
    const handlebusbooking=useCallback(async(id)=>{
        try{
            const response=await axios.get(`/busTicket/BusBooking/${id}`);
            if (Array.isArray(response.data)) {
                response.data = response.data.map(item => {
                    return {
                        ...item,
                        reservationDate: formatDate(item.reservationDate)
                    }
                });
            }
            setFormData(response.data); 
        }catch(error){
            console.error(error);
        }
    },[])
    useEffect(()=>{
        handlebusbooking(localStorage.getItem('userId'));
    },[handlebusbooking]);
    const formatDate=(input)=> {
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);
        return `${year}-${month}-${day}`;
    }
    const searchBooking=useCallback(async(e)=>{
        e.preventDefault();
        if(SearchFilter.start!==''&&SearchFilter.end==='')
        {alert("도착역을 기입해 주세요")}
        else if(SearchFilter.start===''&&SearchFilter.end!==''){
            alert("출발역을 기입해 주세요")
        }
         else{
        try{
            const response=await axios.get('/busTicket/SearchFilter',{ params: SearchFilter })
            console.log(response.data)
            console.log(SearchFilter)
            if (Array.isArray(response.data)) {
                response.data = response.data.map(item => {
                    return {
                        ...item,
                        reservationDate: formatDate(item.reservationDate)
                    }
                });
            }
            setFormData(response.data); 
        }catch(error){
            console.error(error);
        }
    }})
    return(
        <Grid2 container direction='row'>
        <Mypage open={open} handleOpen={handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center"  rowSpacing={5} >
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableSearch handleChangeSearch={handleChangeSearch} SearchFilter={SearchFilter} searchBooking={searchBooking} />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    <DataTable title={busTitle} TableColor={TableColor} membercontent={busContent} member={formData}/>
                </Grid2>
            </Grid2>
        </Grid2>);
}

export default BusBooking;