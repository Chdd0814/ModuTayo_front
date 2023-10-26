import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6 사용
import axios from 'axios';
import {Unstable_Grid2,Button,Table,TableBody,TableCell,TableRow,TextField,TableContainer,Paper,IconButton } from '@mui/material';
import './noticeEdit.css';
import {InsertPhoto,CancelRounded} from '@mui/icons-material';
const NoticeWrite = (props) => {
    const navigate = useNavigate(); // useNavigate 훅에서 반환된 함수를 사용하여 내비게이션 처리
    const [isImage,setIsImage]= useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const currentDate = new Date();
    const [formdata,setFormData]= useState({
      title:'',
      content:'',
      postdate:currentDate.toISOString().slice(0,10),
      file:null
  });
    const handleChange = e =>{
      const{name,value}=e.target;
      setFormData(prevData=>({
        ...prevData,
        [name]:value
      }));
    }
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
        setFormData(prevData=>({
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
        event.preventDefault();
        const formData = new FormData();
        console.log("뭐함?")
          formData.append('title', formdata.title);
          formData.append('content', formdata.content);
          formData.append('postdate', formdata.postdate);
        if(formdata.file){
           formData.append('myfile', formdata.file);
    }
           
   
        try {
            await axios.post('/notices', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }});
            navigate('/'); // 작성 후에 공지사항 목록 페이지로 이동
        } catch (error) {
            console.error('Error writing notice:', error);
            console.error('Response data:', error.response.data);
        }
        console.log('handleSubmit called')
    };

    return (
        <Unstable_Grid2 container   direction="row" justifyContent="center" marginTop={5}>
      <form onSubmit={handleSubmit} >
      <Unstable_Grid2 width={1200}>
        <TableContainer component={Paper} elevation={3}>
        <Table >
          <TableBody >
            <TableRow >
              <TableCell className="tableContent">
              <TextField
              fullWidth
              variant='filled'
              label="제목"
              type="text"
              id="title"
             name='title'
              value={formdata.title}
              onChange={handleChange}
              required/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{textAlign:'right'}}>
                <input type="file" name="myfile" className="fileButton" id='fileButton' onChange={handleFileChange}  />
                <IconButton onClick={()=>document.getElementById('fileButton').click()}>
                   <InsertPhoto/>
                </IconButton>
                {imageSrc&&<IconButton onClick={handleCancleImage}>
                   <CancelRounded/>
                </IconButton>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="tableContent">
              <Unstable_Grid2 container direction='column' spacing={3}>
                <Unstable_Grid2>
              <TextField className='content'
              label="내용"
              name='content'
              fullWidth
              multiline
              rows={16}
              variant='outlined'
            id="content"
            value={formdata.content}
            onChange={handleChange}
            required
          />
           </Unstable_Grid2>
            <Unstable_Grid2>
            {isImage&&<img src={imageSrc} className='image' />}
            </Unstable_Grid2>
            </Unstable_Grid2>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
      </Unstable_Grid2>
        <Unstable_Grid2 marginTop={5}>
        <Button type="submit" variant='outlined'>글쓰기</Button>
        </Unstable_Grid2>
      </form>
    </Unstable_Grid2>
        
    );
};

export default NoticeWrite;
