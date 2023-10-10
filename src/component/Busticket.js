import React, {useState,useEffect} from "react";
import Ticketinfoform from "./Ticketinfoform";
import { Typography } from "@mui/material";
import BusticketForm from "./BusticketForm";
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
            <Typography variant="h5">버스표</Typography>
            <BusticketForm isLoggedIn = {isLoggedIn}/>
        </div>

        
    );

}




export default Busticket;
