import React,{useState,useEffect} from 'react';
import {Snackbar,Alert,AlertTitle} from '@mui/material';
import {Typography} from '@mui/material';
import './FontCss.css';
const SnackbarCompnents=(props)=>{
    const{openProps,alert_state,alert_content,alert_title,handleclose}=props  
    return(
        <Snackbar open={openProps} autoHideDuration={6000} onClose={handleclose}>
            <Alert onClose={handleclose} severity={alert_state} >    
                <AlertTitle><Typography variant='h6'  fontFamily='GmarketSansMedium' gutterBottom>{alert_title}</Typography></AlertTitle>
            <Typography fontFamily='GmarketSansMedium'>
                {alert_content}
            </Typography>
            </Alert>
        </Snackbar>
    );
}
export default SnackbarCompnents;