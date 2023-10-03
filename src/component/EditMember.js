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
const EditMember=({id,open,handleOpen})=>{
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
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#5ACCFF'}}>
                <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#EBF5FF'}}>
                <TextField   type="text"  name={membertitle[index]} variant="outlined" size="small" value={content} onBlur={handleBlur} onFocus={handleFocus} onChange=
                {index===3?handleTellChange:handleChange}  />
            </TableCell>
        </TableRow>
        );
    };
    const notinsertTable=(index,content)=>{
        return(
        <TableRow>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#5ACCFF'}}>
            <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#EBF5FF'}}>
                <TextField color='error' type="text" name={membertitle[index]} onBlur={handleBlur} onFocus={handleFocus} variant="outlined" size="small" value={content}   />
            </TableCell>
        </TableRow>
        );
    };
    const passwordTable=(index,content)=>{
        return(
        <TableRow>
            <TableCell  sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#5ACCFF'}}>
            <Typography fontFamily='GmarketSansMedium'>{title[index]}</Typography>
            </TableCell>
            <TableCell sx={{border:0,borderTop:'1px solid #dcdcdc',backgroundColor:'#EBF5FF'}}>
                <TextField type="password" name={membertitle[index]} onBlur={handleBlur} onFocus={handleFocus} variant="outlined" size="small" onChange={handleChange}   />
            </TableCell>
        </TableRow>
        );
    };
    const NotUpdatatext=(props)=>{
        return(
        <Unstable_Grid2 marginTop={props.marginTop} visibility={props.visibility} item  fontFamily='GmarketSansMedium' color='#dcdcdc'>{props.content}</Unstable_Grid2>
        );
    };
    const Updatatext=(props)=>{
        return(
        <Unstable_Grid2 marginTop={props.marginTop}  visibility={props.visibility} item fontFamily='GmarketSansMedium' color='#FFA500	'>{props.content}</Unstable_Grid2>
        );
    };
    const PasswordText=(props)=>{
        return(
        <Unstable_Grid2 marginTop={props.marginTop}  visibility={props.visibility} item fontFamily='GmarketSansMedium' color='#0000FF'>{props.content}</Unstable_Grid2>
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
    
    
    const membertitle=['name','id','pass','phonenumber','address','mileage','email'];
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
        if(isValidEmail(member.email)&&isValidTel(member.phonenumber)&&!isNull(member.address)){ 
        await axios.put(`/EditMember/${member.id}`,member)
        .then(response=>{
            setState({
                successOpen:true
            });
        })
        .catch(error=>{
            setState({
                errorOpen:true
            })
        })
        .then
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
        <Unstable_Grid2 container direction='row'  alignItems="center"  justifyContent="flex-start">
            <Unstable_Grid2 width={250} item style={{ alignSelf: 'flex-start'}}>
            <Mypage open={open} handleOpen={handleOpen}/>
            </Unstable_Grid2>
            <form onSubmit={handleSubmit}>
            <Unstable_Grid2 container direction='column' marginLeft={45} justifyContent="flex-start">
            <Unstable_Grid2 container direction='row' alignItems="flex-start">
            <Unstable_Grid2 item>  
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
            {textFocus.nameFocus?<NotUpdatatext content='이름은 수정할 수 없습니다.' visibility="visibility" marginTop={3} />:<NotUpdatatext content='이름은 수정할 수 없습니다.' visibility="hidden" />}
                {textFocus.idFocus?<NotUpdatatext content='아이디는 수정할 수 없습니다.' visibility="visibility" marginTop={9} />:<NotUpdatatext content='아이디는 수정할 수 없습니다.' visibility="hidden" />}
                {textFocus.passFocus?<PasswordText content='기존의 비밀번호를 입력해 주세요.' visibility="visibility" marginTop={15} />:<PasswordText content='기존의 비밀번호를 입력해 주세요.' visibility="hidden" />}
                {textFocus.phoneNumberFocus?<Updatatext content='전화번호 형식에 맞게 수정해 주세요.' visibility="visibility" marginTop={21} />:<Updatatext content='전화번호 형식에 맞게 수정해 주세요.' visibility="hidden" />}
                {textFocus.addressFocus?<Updatatext content='주소 형식에 맞게 수정해 주세요.' visibility="visibility" marginTop={27} />:<Updatatext content='주소 형식에 맞게 수정해 주세요.' visibility="hidden" />}
                {textFocus.mileageFocus?<NotUpdatatext content='마일리지는 수정할 수 없습니다.' visibility="visibility" marginTop={33} />:<NotUpdatatext content='마일리지는 수정할 수 없습니다.' visibility="hidden" />}
                {textFocus.emailFocus?<Updatatext content='이메일 형식에 맞게 수정해 주세요.' visibility="visibility" marginTop={40} />:<Updatatext content='이메일 형식에 맞게 수정해 주세요.' visibility="hidden" />}
            </React.Fragment>
            </Unstable_Grid2>
            </Unstable_Grid2>
            <Unstable_Grid2 item marginTop={5} marginRight={35}>
                    <Button type="submit" variant="contained">수정</Button>
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