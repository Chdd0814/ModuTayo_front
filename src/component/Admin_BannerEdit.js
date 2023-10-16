import React,{useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Mypage from './Mypage';
import axios from 'axios';
import './noticeEdit.css';
import {Button,MenuItem,TextField,IconButton,Box,Paper,Select,InputLabel,FormControl,Skeleton} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import {InsertPhoto,CancelRounded} from '@mui/icons-material';
const BannerEdit=(props)=>{
    const{open,handleOpen}=props
    const navigate = useNavigate();
    const [isImage,setIsImage]= useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [successOpen,setSuccessOpen]=useState(false);
    const [formdata,setFormdata]=useState({
        banner_number:'',
        file:null,
        title:'',
        content:''
        })
    const handleChange=(e)=>{
       const{value,name}= e.target;
       setFormdata(prevData=>({
        ...prevData,
        [name]:value
       }));}
       const handleFileChange= e=>{
        const selectedFile = e.target.files[0];
  
        // 파일이 선택되지 않았다면 함수 종료
        if (!selectedFile) return;
  
        // 선택된 파일이 이미지 파일이 아니라면 함수 종료
        if (!selectedFile.type.match('image.*')) {
          alert('Please select a valid image file.');
          return;
      }
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageSrc(e.target.result);
          };
          reader.readAsDataURL(selectedFile);
          setFormdata(prevData=>({
            ...prevData,
            file:selectedFile 
          }));
          setIsImage(true);
     
    };
        const handleCancleImage = e =>{
        setIsImage(false);
        setImageSrc("");
        }
        const handleSubmit = async (event) => {
            console.log(formdata);
            event.preventDefault();
            const formData = new FormData();
              formData.append('number', formdata.banner_number);  
              formData.append('title', formdata.title);
              formData.append('content', formdata.content);
              
            if(formdata.file){
               formData.append('myfile', formdata.file);
        }
               
       
            try {
                await axios.put('/banner/edit', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }});
                  navigate('/');
            } catch (error) {
                console.error('Error writing notice:', error);
                console.error('Response data:', error.response.data);
            }
            console.log('handleSubmit called')
        };
       
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setSuccessOpen(false)
        }
    return(
        <Grid2 container direction='row'>
            <Mypage open={open} handleOpen={handleOpen}/> 
            <form onSubmit={handleSubmit}>
            <Grid2 marginLeft={40} xs={9} alignContent="center" marginTop={10} >
            <Box component={Paper} elevation={3} sx={{backgroundColor:'#DCDCDC'}} >
            <Grid2 container direction='column' rowSpacing={5}>
                <Grid2 item sx={{maxWidth:200,marginLeft:16,marginTop:5}}  >
                    <FormControl fullWidth>
                        <InputLabel>배너지정</InputLabel>
                            <Select color='secondary' size='large' name='banner_number' label='배너지정' value={formdata.banner_number} onChange={handleChange}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 item>
                    <input type="file" name="myfile" className="fileButton" id='fileButton' onChange={handleFileChange} />
                    <IconButton onClick={()=>document.getElementById('fileButton').click()}>
                        <InsertPhoto/>
                    </IconButton>
                    {imageSrc&&<IconButton onClick={handleCancleImage}>
                   <CancelRounded/>
                </IconButton>}
                </Grid2>
                <Grid2 paddingLeft={3} paddingRight={3} item>
                    <TextField name="title" color='secondary' fullWidth label="제목"  onChange={handleChange}/>
                </Grid2>
                <Grid2 paddingLeft={3} paddingRight={3}>
                    <TextField name="content"  color='secondary' multiline fullWidth rows={4} label="내용" onChange={handleChange}/>
                </Grid2>
                <Grid2>
                        {imageSrc ? (
                         <img
                        style={{ width: 210, height: 118 }}
                        src={imageSrc}
                         />
                        ) : (
                        <Skeleton variant="rectangular" width={210} height={118} sx={{display: 'block', margin: 'auto'}}  />
                        )}
                </Grid2>
                <Grid2 paddingLeft={3} paddingRight={3}>
                    <Button type='submit'>전송</Button>
                </Grid2>            
            </Grid2>
            </Box>  
            </Grid2>
            </form> 
        </Grid2>
        );
    }
    


export default BannerEdit;