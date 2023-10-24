import React, { useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Addressapi from 'react-daum-postcode';
import {TextField,Button,Container} from '@mui/material';
import PassWordField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import './Register.css';
const Register = () => {
    const navigate = useNavigate();
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);

        const [formData, setFormData] = useState({
            id: '',
            pass: '',
            name: '',
            phonenumber: '',
            mileage: 0,
            email: '',
            address: '',
            role: 'user' // Default role
          });
        const [errorData, setErrorData] = useState({
            idError: '',
            passError: '',
            nameError: '',
            tellError: '',
            emailError: '',
            addressError: ''
        });
        const [valid,setValid]=useState({
            isId: false,
            isPass: false,
            isName: false,
            isTell: false,
            isEmail: false,
            isAddress: false
        })  ;
        
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('/Register', formData);
          console.log('Register success');
          navigate("/login");
        } catch (error) {
          console.error('Register error:', error);
        }
      };
    
      const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prevData => ({
                             ...prevData,
                             [name]:value
                            }));
        };
      const isValidId = (id) => {
        const hasAlpha = /[a-zA-Z]/.test(id);
        const hasNumber = /[0-9]/.test(id);
        const isAtLeast6Chars = id.length >= 6;
        return hasAlpha && hasNumber && isAtLeast6Chars;
    };
      const isValidPass = (pass) => {
     const hasAlpha = /[a-zA-Z]/.test(pass);
     const hasNumber = /[0-9]/.test(pass);
     const isAtLeast8Chars = pass.length >= 8;
     return hasAlpha && hasNumber && isAtLeast8Chars;
    };
    const isValidTel = (tel) => {
      const hasNumber = /[0-9]/.test(tel);
      const isAtLeast13Chars = tel.length >= 13;
      return hasNumber && isAtLeast13Chars;
     };
    const isValidName = (name) => {
        const regex = /^[\uAC00-\uD7A3]{1,6}$/;
        const isAtLeast2Chars = name.length>=2;
        return regex.test(name) && isAtLeast2Chars;
      };
    const isValidEmail = (email) =>{
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    }
    const isNull = (value) => {
      return value === '';
      };

useEffect(() => {
  if(isValidId(formData.id))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     idError: '올바른 아이디 형식입니다.' 
    }));
    setValid(prevValid =>({
      ...prevValid,
      isId: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      idError: '아이디는 6자 영어와 숫자가 포함되어야 합니다.' 
     }));
     setValid(prevValid =>({
      ...prevValid,
      isId: false
    }));
  }
}, [formData.id]);
useEffect(() => {
  if(isValidPass(formData.pass))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     passError: '올바른 비밀번호 형식입니다.' 
    }));
    setValid(prevValid =>({
      ...prevValid,
      isPass: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      passError: '비밀번호는 8자 영어와 숫자가 포함되어야 합니다.'
     }));
     setValid(prevValid =>({
      ...prevValid,
      isPass: false
    }));
  }
}, [formData.pass]);
useEffect(() => {
  if(isValidName(formData.name))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     nameError: '올바른 이름 형식입니다.'
    }));
    setValid(prevValid =>({
      ...prevValid,
      isName: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      nameError: '올바르지 않은 이름 형식입니다.'
     }));
     setValid(prevValid =>({
      ...prevValid,
      isName: false
    }));
  }
}, [formData.name]);
useEffect(() => {
  if(isValidTel(formData.phonenumber))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     tellError: '올바른 전화번호 형식입니다.'
    }));
    setValid(prevValid =>({
      ...prevValid,
      isTell: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      tellError: '올바르지 않은 전화번호 형식입니다.'
     }));
     setValid(prevValid =>({
      ...prevValid,
      isTell: false
    }));
  }
}, [formData.phonenumber]);
useEffect(() => {
  if(isValidEmail(formData.email))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     emailError: '올바른 이메일 형식입니다.'
    }));
    setValid(prevValid =>({
      ...prevValid,
      isEmail: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      emailError: '올바르지 않은 이메일 형식입니다.'
     }));
     setValid(prevValid =>({
      ...prevValid,
      isEmail: false
    }));
  }
}, [formData.email]);
useEffect(() => {
  if(!isNull(formData.address))
  {
    setErrorData(prevErrorData => ({
     ...prevErrorData,
     addressError: '올바른 주소 형식입니다.'
    }));
    setValid(prevValid =>({
      ...prevValid,
      isAddress: true
    }));
  }
  else{
    setErrorData(prevErrorData => ({
      ...prevErrorData,
      addressError: '올바르지 않은 주소 형식입니다.'
     }));
     setValid(prevValid =>({
      ...prevValid,
      isAddress: false
    }));
  }
}, [formData.address]);

      const handleAddressSearch = () => {
        setAddressModalOpen(true);
      };
    
      const handleAddressSelect = (data) => {
        const fullAddress = data.roadAddress || data.jibunAddress;
        const extraAddress = data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : '';
        const buildingName = data.buildingName && data.apartment === 'Y' ? data.buildingName : '';
        const finalExtraAddress = extraAddress || buildingName ? `(${extraAddress} ${buildingName})` : '';
    
        setFormData((prevData) => ({
          ...prevData,
          address: fullAddress + ' ' + finalExtraAddress,
        }));
    
        setAddressModalOpen(false);
      };
      
      const handleTellChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // 숫자만 남기고 모든 문자를 제거
        formattedValue = formattedValue.replace(/\D+/g, '');
        // 첫 번째 `-` 추가
        if (formattedValue.length > 3) {
            formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
        }
        // 두 번째 `-` 추가
        if (formattedValue.length > 8) {
            formattedValue = `${formattedValue.slice(0, 8)}-${formattedValue.slice(8, 12)}`;
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue
        }));
    };
    
return (
  <Container className='main' maxWidth="sm" >
    <Grid className='maingrid' container alignItems="flex-start" justifyContent="center">
      <Grid>
    <Grid fontSize={30} marginTop={5}>회원가입</Grid>
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <Grid>
      <TextField  color={valid.isId?'primary':'error'} value={formData.id} type="text" name="id" label="ID" onChange={handleChange} variant="standard"/>
      </Grid>
      {formData.id.length>0&&<Grid margin={1} className={`error${valid.isId?'true':'false'}`}>       
        {errorData.idError}
      </Grid>}
      </Grid >
      <Grid container direction="column" alignItems="center">
        <Grid>
      <PassWordField color={valid.isPass?'primary':'error'} value={formData.pass} type="password" name="pass"  label="Password" onChange={handleChange} variant="standard" />
      </Grid>
      {formData.pass.length>0&&<Grid margin={1} className={`error${valid.isPass?'true':'false'}`}>      
        {errorData.passError}
      </Grid>}
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid>
      <TextField color={valid.isName?'primary':'error'} value={formData.name} type="text" name="name" label="Name" onChange={handleChange} variant="standard" />
      </Grid>
      {formData.name.length>0&&<Grid margin={1} className={`error${valid.isName?'true':'false'}`}>    
        {errorData.nameError}
      </Grid>}
      </Grid>
      <Grid container direction="column" alignItems="center" >
      <Grid>
      <TextField  inputProps={{ maxLength: 13}} color={valid.isTell?'primary':'error'} value={formData.phonenumber} type="text" name="phonenumber" label="tel" onChange={handleTellChange} variant="standard" />
      </Grid>
      {formData.phonenumber.length>0&&<Grid margin={1} className={`error${valid.isTell?'true':'false'}`}>   
        {errorData.tellError}
      </Grid>}
      </Grid>
      <Grid container direction="column" alignItems="center">
      <Grid> 
      <TextField color={valid.isEmail?'primary':'error'} value={formData.email} type="text" name="email" onChange={handleChange} variant="standard" label="email" />
      </Grid>
      {formData.email.length>0&&<Grid margin={1} className={`error${valid.isEmail?'true':'false'}`}>     
        {errorData.emailError}
      </Grid>}
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid> 
      <TextField color={valid.isAddress?'primary':'error'} type="text" name="address" label="Address" value = {formData.address} onChange={handleChange} onClick = {handleAddressSearch} variant="standard"/>
      </Grid>
      {formData.address.length>0&&<Grid margin={1} className={`error${valid.isAddress?'true':'false'}`}>      
        {errorData.addressError}
      </Grid>}
      </Grid>
      <Grid margin={5} container direction="column" alignItems="center">
      <Button  variant="text" type="submit" disabled={!valid.isId || !valid.isPass || !valid.isName || !valid.isTell || !valid.isEmail || !valid.
      isAddress}>Register</Button>
      </Grid>
      </form>
      </Grid>
      <Addressapi
        onComplete={handleAddressSelect}
        style={{ display: isAddressModalOpen ? 'block' : 'none' }}
      />
      </Grid>
  </Container>
);
};

export default Register