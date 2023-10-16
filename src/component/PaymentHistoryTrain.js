import React,{useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import DataTable from './DataTable';
import axios from 'axios';
import TableSearch from './TablePaymentSearch';
import dayjs from "dayjs";

const PaymentHistoryTrain=(props)=>{
    const {open,handleOpen}=props
    const [formData,setFormData]=useState([]);
    const TableColor=['#EBD4FF','#F0FFF0','#AFFFEE'];
    const [TrainTitle,setBusTitle]= useState(['결재번호','결재날짜','결재수단','이름','ID','Tel','비용']);
    const [TrainContent,setBusContent]=useState([
        {key:'number',width:60},
        {key:'paymentDate',width:80},
        {key:'payMethod',width:80},
        {key:'buyerName',width:80},
        {key:'buyerid',width:80},
        {key:'buyerTel',width:100},
        {key:'paidAmount',width:80}
        
    ])
    const formatDate=(input)=> {
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);
        return `${year}-${month}-${day}`;
    }
    const [SearchFilter,setSearchFilter]=useState({
        id:localStorage.getItem('userId'),
        paymentType: '',
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
    const searchPayment=useCallback(async(e)=>{
        e.preventDefault();
        try{
            console.log(SearchFilter)
            const response=await axios.get('/payment/Train_searchFilter',{ params: SearchFilter })
            console.log(response.data)
            if (Array.isArray(response.data)) {
                var i=1;
                response.data = response.data.map((item) => {
                    return {
                        ...item,
                        number: i++,
                        paymentDate: formatDate(item.paymentDate)
                    }
                });
            } 
            setFormData(response.data); 
        }catch(error){
            console.error(error);
        }
    })
    const handlePaymentHistoryTrain=useCallback(async(id)=>{
        try{
            console.log({id})
            const response=await axios.get(`/payment/PaymentTrain/${id}`);
            if (Array.isArray(response.data)) {
                var i=1;
                response.data = response.data.map((item) => {
                    return {
                        ...item,
                        number: i++,
                        paymentDate: formatDate(item.paymentDate)
                    }
                });
            } 
            setFormData(response.data);     
        }catch(e){
            console.error(e);
        }
    },[])
    useEffect(()=>{
        handlePaymentHistoryTrain(localStorage.getItem('userId'));
    },[handlePaymentHistoryTrain]);
    return(
        <Grid2 container direction='row'>
        <Mypage open={open} handleOpen={handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center"  rowSpacing={5} >
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableSearch searchPayment={searchPayment} SearchFilter={SearchFilter} handleChangeSearch={handleChangeSearch}  />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                    <DataTable title={TrainTitle} TableColor={TableColor} membercontent={TrainContent} member={formData}/>
                </Grid2>
            </Grid2>
        </Grid2>
    );

}
export default PaymentHistoryTrain;