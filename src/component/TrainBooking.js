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
const TrainBooking=(props)=>{
    const {open,handleOpen}=props
    const [dialog_open,setDialog_open]=useState(false);
    const [alert_open,setAlert_open]=useState(false);
    const [booking,setBooking]=useState({});
    const [formData,setFormData]=useState([]);
    const TableColor=['aliceblue','#F4FFFF','#F9FFFF'];
    const [TrainTitle,setBusTitle]= useState(['출발날짜','기차종류','출발역','도착역','출발시간','도착시간','자리번호']);
    const [TrainContent,setTrainContent]=useState([
        {key:'reservationDate',width:80},
        {key:'vehicleTypeName',width:80},
        {key:'departureStation',width:80},
        {key:'arrivalStation',width:80},
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
    const handleClose=()=>{
        setDialog_open(false);
    }
    const handleDialogOpen=(item)=>(e)=>{
        e.preventDefault();
        setBooking(item);
        console.log(dayjs(`${item.reservationDate} ${item.departureTime}`,'YYYY-MM-DD HH:mm').add(30,'minute').isAfter(dayjs()));
        setDialog_open(true);
    }
    const formatDate=(input)=> {
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);
        
        return `${year}-${month}-${day}`;
    }
    const handlebusbooking = useCallback(async(id) => {
        try {
            let response=null;
            if(vaildAdmin()){
                response = await axios.get(`/trainTicket/TrainBooking_admin`);
            }else{
                response = await axios.get(`/trainTicket/TrainBooking/${id}`);
            }
            if (response&&Array.isArray(response.data)) {
                response.data = response.data.map(item => {
                    return {
                        ...item,
                        reservationDate: formatDate(item.reservationDate),
                        seatNumber: `${item.seatNumber}-${item.trainCarNumber}`
                    }
                });
            } 
            // response.data가 객체인 경우 직접 수정
            else if(response) {
                response.data.seatNumber = `${response.data.seatNumber}${response.data.trainCarNumber}`;
            }
            if(response){
            setFormData(response.data);
            console.log(response.data);
            }
        } catch(e) {
            console.error(e);
        }
    }, []);
    useEffect(()=>{
        const userInfo = calluserInfo();
        if(!userInfo.sns){
        handlebusbooking(sessionStorage.getItem('userId'));
        }
    },[handlebusbooking]);
    const searchBooking=useCallback(async(e)=>{
        e.preventDefault();
        if(SearchFilter.start!==''&&SearchFilter.end==='')
        {alert("도착역을 기입해 주세요")}
        else if(SearchFilter.start===''&&SearchFilter.end!==''){
            alert("출발역을 기입해 주세요")
        }
        else{
        try{
            const response=await axios.get('/trainTicket/SearchFilter',{ params: SearchFilter })
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
    const handleDelete=useCallback(async()=>{
        try{
        await axios.delete(`/trainTicket/delete/${booking.ticketNumber}`)
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
                    <TableSearch   handleChangeSearch={handleChangeSearch} SearchFilter={SearchFilter} searchBooking={searchBooking}/>
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    {!vaildAdmin()?<DataTable handleOpen={handleDialogOpen} searchitem={TrainContent[0].key} title={TrainTitle} TableColor={TableColor} membercontent={TrainContent} member={formData}/>
                    :<DataTable title={TrainTitle} TableColor={TableColor} membercontent={TrainContent} member={formData}/>}
                </Grid2>
            </Grid2>
            <Dialog_Booking handleDelete={handleDelete} openprops={alert_open} setOpenprops={setAlert_open}  item={booking} open={dialog_open} handleClose={handleClose}/>
        </Grid2>);
}
export default TrainBooking;