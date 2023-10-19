import React, {useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Mypage from './Mypage';
import TableMemberSearch from './TableMemberSearch';
import DataTable from './DataTable';
import axios from 'axios';
import AdminMember_dialog from './AdminMember_dialog';

const AdminMember=(props)=>{
    const [open,setOpen]=useState(false);
    const [id,setId]=useState('');
    const [isadmin,setIsadmin]=useState();


    const handleOpen=(item)=>(e)=>{
        e.preventDefault();
        setOpen(true);
        console.log(item.role);
        setId(item.id);
        handlegetIsAdmin(item.id);
    }
    const handlegetIsAdmin=useCallback(async(memberID)=>{
        try{
                const response=await axios.get(`/AdminMember_dialog/${memberID}`);
                setIsadmin(response.data);
                console.log(response.data);
        }catch(error){
            console.error(error);
        }
},[]);
    const handleClose=()=>{
        setOpen(false);
    }
    const [formData,setFormData]=useState([]);
    const [SearchFilter,setSearchFilter]=useState({
        search:'',
        classification:'id'
    });
    const allMember=useCallback(async()=>{
        try{
            const response=await axios.get('/AdminMember');
            setFormData(response.data);

        }catch(error){
            console.error(error);
        }
    },[]);
    const searchMember=useCallback(async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get('/AdminMember/SearchFilter',{ params: SearchFilter })
            setFormData(response.data);
        }catch(error){
            console.error(error);
        }
    })
    useEffect(()=>{
        allMember();
    },[allMember]);    
    const TableColor=['#AE905E','#FAEBD7','#FDF5E6']
    const memberTitle=['아이디','비밀번호','이름','폰번호','마일리지','이메일','주소']
    const memberContent=[
        {key:'id',width:120},
        {key:'pass',width:120},
        {key:'name',width:90},
        {key:'phonenumber',width:200},
        {key:'mileage',width:100},
        {key:'email',width:200},
        {key:'address',width:200}]
    const handleChange=e=>{
        const {name,value}=e.target;
        setSearchFilter(prevData=>({
                ...prevData,
                [name]:value
        }));
    }
    const [classification_content,setClassification_content]=useState([
        {type:'id',display:'ID'},
        {type:'name',display:'이름'},
    ])
    return(
        <Grid2 container direction='row'>
         <Mypage open={props.open} handleOpen={props.handleOpen}/>
            <Grid2 container direction='column' xs={9} alignContent="center" rowSpacing={5}>
                <Grid2 item marginTop={5} marginLeft={15}>
                    <TableMemberSearch classification_content={classification_content} SearchFilter={SearchFilter} searchMember={searchMember}  handleChange={handleChange} />
                </Grid2>
                <Grid2 item xs={12} marginLeft={15}>
                   <DataTable handleOpen={handleOpen} searchitem={memberContent[0].key} TableColor={TableColor}  title={memberTitle} member={formData} membercontent={memberContent} /> 
                </Grid2>
            </Grid2>
            <AdminMember_dialog  setOpen={setOpen} open={open} id={id} isadmin={isadmin}  handleClose={handleClose} allMember={allMember} />
        </Grid2>
        
    );
}

export default AdminMember;

