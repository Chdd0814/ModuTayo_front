import React, {useState,useEffect} from "react";
import Ticketinfoform from "./Ticketinfoform";
import { Typography } from "@mui/material";
import BusticketForm from "./BusticketForm";
import './FontCss.css';
// 0910 pm 10 : 11 

function Busticket({ isLoggedIn }) {

    
    useEffect(() => { 


    })

    // const fetchBusTicketList = () => {

    //     const apiUrl = "/publicApi/getTrainInfoList";

    //     axios.get

    // }
    
    return (

        <div className = "BusticketForm">
            <Typography fontFamily='GmarketSansMedium' variant="h5" marginTop={5}>버스표</Typography>
            <BusticketForm isLoggedIn = {isLoggedIn}/>
        </div>

        
    );

}




export default Busticket;
