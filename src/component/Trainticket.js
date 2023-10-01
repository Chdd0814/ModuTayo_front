import React, {useState,useEffect} from "react";
import Ticketinfoform from "./Ticketinfoform";
import { Typography } from "@mui/material";
import TrainTicketForm from "./TrainticketForm";
// 0910 pm 10 : 11 

function Trainticket({ isLoggedIn }) {

    
    useEffect(() => { 


    })

    // const fetchBusTicketList = () => {

    //     const apiUrl = "/publicApi/getTrainInfoList";

    //     axios.get

    // }
    
    return (

        <div className = "TrainTicketForm">
            <Typography variant="h5">기차표</Typography>
            <TrainTicketForm isLoggedIn = {isLoggedIn}/>
        </div>

        
    );

}




export default Trainticket;
