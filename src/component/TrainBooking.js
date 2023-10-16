import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import TableSearch from './TableBookingSearch';
import axios from 'axios';
import dayjs from "dayjs";
const TrainBooking=(props)=>{
    const {open,handleOpen}=props
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
    const formatDate=(input)=> {
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);
        
        return `${year}-${month}-${day}`;
    }
    const handlebusbooking = useCallback(async(id) => {
        try {
            const response = await axios.get(`/trainTicket/TrainBooking/${id}`);
            if (Array.isArray(response.data)) {
                response.data = response.data.map(item => {
                    return {
                        ...item,
                        reservationDate: formatDate(item.reservationDate),
                        seatNumber: `${item.seatNumber}-${item.trainCarNumber}`
                    }
                });
            } 
            // response.data가 객체인 경우 직접 수정
            else {
                response.data.seatNumber = `${response.data.seatNumber}${response.data.trainCarNumber}`;
            }
            setFormData(response.data);
            console.log(response.data);
        } catch(e) {
            console.error(e);
        }
    }, []);
    useEffect(()=>{
        handlebusbooking(localStorage.getItem('userId'));
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
                    <TableSearch  handleChangeSearch={handleChangeSearch} SearchFilter={SearchFilter} searchBooking={searchBooking}/>
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    <DataTable title={TrainTitle} TableColor={TableColor} membercontent={TrainContent} member={formData}/>
                </Grid2>
            </Grid2>
        </Grid2>);
}
export default TrainBooking;