import React,{useState,useEffect} from 'react';
import {Snackbar,Alert,AlertTitle} from '@mui/material';

const SnackbarCompnents=(props)=>{
    const{openProps,alert_state,alert_content,alert_title,handleclose}=props  
    return(
        <Snackbar open={openProps} autoHideDuration={6000} onClose={handleclose}>
            <Alert onClose={handleclose} severity={alert_state} >
                <AlertTitle>{alert_title}</AlertTitle>
                {alert_content}
            </Alert>
        </Snackbar>
    );
}
export default SnackbarCompnents;