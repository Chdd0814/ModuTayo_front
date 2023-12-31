import React,{useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import {Button,Dialog,DialogActions,DialogContent,Box,DialogTitle} from '@mui/material';
import SnackbarCompnents from './SnackbarComponent';

const AdminMember_dialog=(props)=>{
    const {id,open,handleClose,isadmin,allMember,setOpen}=props;    
    const [openprops,setOpenprops]=useState(false);
    const [adminopen,setAdminopen]=useState(false);
    const handleDelete=useCallback(async()=>{
        try{
        await axios.delete(`/AdminMember/delete/${id}`)
        setOpenprops(true);
        allMember();
        setOpen(false);
        }catch(error){
            console.error(error);
        }
    })
    const handleUpdate=useCallback(async()=>{
        try{
        await axios.put(`/AdminMember/update/${id}`)
        setAdminopen(true);
        setOpen(false);
        }catch(error){
            console.error(error);
        }
    })
    const handleclose_alert=(event, reason)=>{
        if(reason==='clickway'){
            return;
        }
        setOpenprops(false);
        setAdminopen(false);
    }
    
    return(
        <Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {id}    
            </DialogTitle>
            <DialogContent>
                <Box component="span" padding={1}>
                <Button variant='contained' onClick={handleDelete}>회원 탈퇴</Button>
                </Box>
                <Box padding={1} component="span">
                <Button variant='contained' onClick={handleUpdate}>{isadmin==='admin'?'어드민 권한해제':'어드민 권한부여'}</Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>cancle</Button>
            </DialogActions>
        </Dialog>
            <SnackbarCompnents handleclose={handleclose_alert} openProps={openprops} alert_state='success' alert_content="유저의 회원탈퇴를 성공했습니다." alert_title="회원 탈퇴 완료"/>
            <SnackbarCompnents handleclose={handleclose_alert} openProps={adminopen} alert_state='success' alert_content={isadmin==='admin'?'어드민 권한이 해제되었습니다.':'어드민 권한이 부여되었습니다.'} alert_title={isadmin==='admin'?'어드민 권한해제':'어드민 권한부여'}/>
            
           
        </Box>
        
    );
}
export default AdminMember_dialog;

