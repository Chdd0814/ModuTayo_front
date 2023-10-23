import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import TableSearch from './TableBookingSearch';
import axios from 'axios';
import dayjs from "dayjs";
import Dialog_Booking from './Dialog_Booking';
import calluserInfo from './calluserInfo';
import vaildAdmin from './vaildAdmin';
/*moment */
const BusBooking=(props)=>{
    const {open,handleOpen}=props
    const [dialog_open,setDialog_open]=useState(false);
    const [alert_open,setAlert_open]=useState(false);
    const [booking,setBooking]=useState({});
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
        id:sessionStorage.getItem('userId'),
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
    const handleDialogOpen=(item)=>(e)=>{
        e.preventDefault();
        setBooking(item);
        console.log(dayjs(`${item.reservationDate} ${item.departureTime}`,'YYYY-MM-DD HH:mm').add(30,'minute').isAfter(dayjs()));
        setDialog_open(true);
    }
    const handlebusbooking=useCallback(async(id)=>{
        let response=null;
        try{
            if(vaildAdmin()){
                response=await axios.get(`/busTicket/BusBooking_admin`);
        }else{
            response=await axios.get(`/busTicket/BusBooking/${id}`);
        }
        
        if (response&&Array.isArray(response.data)) {
                response.data = response.data.map(item => {
                    return {
                        ...item,
                        reservationDate: formatDate(item.reservationDate)
                    }
                });
            }
        if(response){
            setFormData(response.data);
        } 
        }catch(error){
            console.error(error);
        }        
    },[])

    useEffect(()=>{
        const userInfo = calluserInfo();
        if(!userInfo.sns){
        handlebusbooking(sessionStorage.getItem('userId'));  
    }
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
    const handleClose=()=>{
        setDialog_open(false);
    }

    const getusedMileage = async (ticketNumber) => {
        try {
          const response = await axios.get(`/busTicket/getusedMileage/${ticketNumber}`);  
          const mileage = response.data;
          return mileage; // 사용된 마일리지를 반환
        } catch (error) {
          console.error(error);
          return null;
        }
      };
    const handleDelete=useCallback(async()=>{
        try{
            const usedMileage = await getusedMileage(booking.ticketNumber); // 사용된 마일리지를 받아옴
            if (usedMileage !== null) {
              await axios.delete(`/busTicket/delete/${booking.ticketNumber}`);
              const response = await axios.put("/Mileage/rollbackMileage", null, {
                params: {
                  id: sessionStorage.getItem('userId'),
                  usedMileage: usedMileage,
                },
              });
        
              if (response.status === 200) {
                console.log('마일리지 환불 성공');
              } else {
                console.error('마일리지 환불 실패');
              }
            }
        setAlert_open(true);
        handlebusbooking(sessionStorage.getItem('userId'));
        setDialog_open(false);
        }catch(error){
            console.error(error);
        }
   })
    return(
        <Grid2 container direction='row'>
        <Mypage open={open} handleOpen={handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center"  rowSpacing={5} >
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableSearch handleChangeSearch={handleChangeSearch} SearchFilter={SearchFilter} searchBooking={searchBooking} />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    {vaildAdmin()?<DataTable handleOpen={handleDialogOpen} searchitem={busContent[0].key} title={busTitle} TableColor={TableColor} membercontent={busContent} member={formData}/>:
                    <DataTable title={busTitle} TableColor={TableColor} membercontent={busContent} member={formData}/>}
                </Grid2>
            </Grid2>
            <Dialog_Booking handleDelete={handleDelete} openprops={alert_open} setOpenprops={setAlert_open}   item={booking} open={dialog_open} handleClose={handleClose}  />
        </Grid2>);
}

export default BusBooking;