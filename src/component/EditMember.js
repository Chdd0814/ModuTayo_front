import React, {useState,useCallback,useEffect} from 'react';
import Mypage from './Mypage';
import {Unstable_Grid2,Table,TableCell,TableRow,TableBody,TextField,TableContainer,Paper,Button,Typography,Alert,AlertTitle,Snackbar } from '@mui/material';
import axios from 'axios';
import './FontCss.css';

const AlertSnackBar=(props)=>{
    return(
    <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={props.openState} autoHideDuration={6000} onClose={props.close}>
        <Alert onClose={props.close} severity={props.severityState} sx={{ width: '100%' }}>
        <Typography fontFamily='GmarketSansMedium'>{props.str}</Typography>
        </Alert>
      </Snackbar>
    );
}
const EditMember=({id})=>{
    const [password,setPassword]=useState('')
    const [state,setState]=useState({
        successOpen:false,
        errorOpen:false
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleTellChange=(e)=>{
        const{name,value}=e.target;
        let formattedValue=value;

        formattedValue=formattedValue.replace(/\D+/g,'');
        if(formattedValue.length>3){
            formattedValue=`${formattedValue.slice(0,3)}-${formattedValue.slice(3)}`;
        }
        if(formattedValue.length>8){
            formattedValue=`${formattedValue.slice(0,8)}-${formattedValue.slice(8,12)}`;
        }
        setMember(prevData=>({
            ...prevData,
            [name]: formattedValue
        }));
    }
    const handleFocus=(e)=>{
        const name=`${e.target.name}Focus`
        setTextFocus(prevData=>({
            ...prevData,
            [name]: true

        }));
    };
    const handleBlur=(e)=>{
        const name=`${e.target.name}Focus`
        setTextFocus(PrevData=>({
            ...PrevData,
            [name]:false
        }));
    };
    const insertTable=(index,content)=>{
        return(
        <TableRow>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
                <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
                <TextField   type="text"  name={membertitle[index]} variant="outlined" size="small" value={content} onBlur={handleBlur} onFocus={handleFocus} onChange=
                {index===3?handleTellChange:handleChange}  />
            </TableCell>
        </TableRow>
        );
    };
    const notinsertTable=(index,content)=>{
        return(
        <TableRow>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
            <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
                <TextField color='error' type="text" name={membertitle[index]} onBlur={handleBlur} onFocus={handleFocus} variant="outlined" size="small" value={content}   />
            </TableCell>
        </TableRow>
        );
    };
    const passwordTable=(index,content)=>{
        return(
        <TableRow>
            <TableCell  sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
            <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc'}}>
                <TextField type="password" name={membertitle[index]} onBlur={handleBlur} onFocus={handleFocus} variant="outlined" size="small" onChange={handleChange}   />
            </TableCell>
        </TableRow>
        );
    };
    const NotUpdatatext=(content,margin)=>{
        return(
        <Unstable_Grid2  marginTop={margin} fontFamily='GmarketSansMedium' color='#dcdcdc'>{content}</Unstable_Grid2>
        );
    };
    const Updatatext=(content,margin)=>{
        return(
        <Unstable_Grid2  marginTop={margin} fontFamily='GmarketSansMedium' color='#FFA500	'>{content}</Unstable_Grid2>
        );
    };
    const passwordText=(content,margin)=>{
        return(
        <Unstable_Grid2  marginTop={margin} fontFamily='GmarketSansMedium' color='#0000FF'>{content}</Unstable_Grid2>
        );
    };
    const isValidEmail = (email) =>{
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
      }
    const isValidTel = (tel) => {
        const hasNumber = /[0-9]/.test(tel);
        const isAtLeast13Chars = tel.length >= 13;
        return hasNumber && isAtLeast13Chars;
       };
    const isNull = (value) => {
        return value === '';
        };
    const [member,setMember]=useState({
        name: "",
        id: "",
        pass: "",
        phoneNumber: "",
        address: "",
        mileage: "",
        email: ""
    });
    const [textFocus,setTextFocus]=useState({
        nameFocus: false,
        idFocus: false,
        passFocus: false,
        phoneNumberFocus: false,
        addressFocus: false,
        mileageFocus:false,
        emailFocus:false
    });
    
    
    const membertitle=['name','id','pass','phoneNumber','address','mileage','email'];
    const title=['이름','아이디','패스워드','전화번호','주소','마일리지','이메일'];

    const SearchMember=useCallback(async()=>{
        try{
                const response= await axios.get(`/EditMember/${id}`);
                const { pass, ...rest } = response.data;
                setMember({ ...rest, pass: null });
                 setPassword(pass);
        }catch(error){
            console.error(error);
        }
    },[id]);
    useEffect(()=>{
        SearchMember();
    },[SearchMember]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(member.pass===password&&isValidEmail(member.email)&&isValidTel(member.phoneNumber)&&!isNull(member.address)){
        setState({
            successOpen:true
        });
        await axios.put(`/EditMember/${member.id}`,member)
       } else{
            setState({
                errorOpen:true
            })
        }
    
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setState({
            successOpen:false,
            errorOpen:false
        })
    }


    return(
        <Unstable_Grid2 container direction='row' alignItems="center" >
            <Mypage/>
            <form onSubmit={handleSubmit}>
            <Unstable_Grid2 container direction='column'>
            <Unstable_Grid2 container direction='row' alignItems="flex-start">
            <Unstable_Grid2 marginLeft={50} marginBottom={10}>  
             <TableContainer component={Paper} elevation={3}>
                <Table aria-label='simple table'> 
                    <TableBody>
                        {membertitle.map((item,index) => 
                        index===3||index===4||index===6?
                        insertTable(index,member[item]):
                        index===2?
                        passwordTable(index,member[item]):
                        notinsertTable(index,member[item]))
                        .map((component, idx) => <React.Fragment key={idx}>{component}</React.Fragment>)}
                    </TableBody>
                </Table> 
             </TableContainer>    
            </Unstable_Grid2>
            <Unstable_Grid2 container direction='column' marginLeft={3}>
            <React.Fragment>
                {textFocus.nameFocus&&NotUpdatatext('이름은 수정할 수 없습니다.',3)}
                {textFocus.idFocus&&NotUpdatatext('아이디는 수정할 수 없습니다.',12)}
                {textFocus.passFocus&&passwordText('기존의 비밀번호를 입력해 주세요.',21)}
                {textFocus.phoneNumberFocus&&Updatatext('전화번호 형식에 맞게 수정해 주세요.',30)}
                {textFocus.addressFocus&&Updatatext('주소 형식에 맞게 수정해 주세요.',39)}
                {textFocus.mileageFocus&&NotUpdatatext('마일리지는 수정할 수 없습니다.',48)}
                {textFocus.emailFocus&&Updatatext('이메일 형식에 맞게 수정해 주세요.',57)}
            </React.Fragment>
            </Unstable_Grid2>
            </Unstable_Grid2>
            <Unstable_Grid2 marginLeft={35} marginTop={5} sx={{positionh:'relative'}}>
                    <Button type="submit" variant="contained" sx={{position:'absolute',left:790,bottom:50}}>수정</Button>
            </Unstable_Grid2>
            </Unstable_Grid2>
            </form>
            
      <AlertSnackBar openState={state.successOpen} close={handleClose} severityState="success" str="회원수정에 완료했습니다." />
      <AlertSnackBar openState={state.errorOpen} close={handleClose} severityState="error" str="회원수정에 실패했습니다." />
       
        </Unstable_Grid2>
        
    );
}

export default EditMember;
export {AlertSnackBar};