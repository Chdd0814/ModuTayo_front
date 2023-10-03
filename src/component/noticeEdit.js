import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Unstable_Grid2,Button,Table,TableBody,TableCell,TableRow,TextField,TableContainer,Paper,IconButton,ToggleButton } from '@mui/material';
import './noticeEdit.css';
import {InsertPhoto,CancelRounded} from '@mui/icons-material';
const NoticeEdit = (props) => {
  const { num } = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visitcount, setVisitCount] = useState(0);
  const [postdate, setPostDate] = useState('');
  const [loading, setLoading] = useState(true);
 const [selectedFile,setSelectedFile]=useState('');
 const [isImage,setIsImage]= useState(false);
  const getNoticeDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/notices/${num}`);
      const { title, content, visitcount, postdate,file } = response.data;
      setTitle(title);
      setContent(content);
      setVisitCount(visitcount);
      setPostDate(postdate);
      const binaryString = window.atob(file);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'image/jpeg' });
        setImageSrc(URL.createObjectURL(blob));;
      {file===null?setIsImage(false):setIsImage(true);}
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notice detail:', error);
      setLoading(false);
    }
  }, [num]);
  const handleCancleImage = e =>{
    setIsImage(false);
    setImageSrc("");
  }
  useEffect(() => {
    getNoticeDetail();
  }, [getNoticeDetail]);
  const handleFileChange= e=>{
    const File = e.target.files[0];
    
    // 파일이 선택되지 않았다면 함수 종료
    if (!File) return;

    // 선택된 파일이 이미지 파일이 아니라면 함수 종료
    if (!File.type.match('image.*')) {
      alert('Please select a valid image file.');
      return;
  }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(File);
      setSelectedFile(File);
      setIsImage(true);
};
  const handleUpdate = async () => {
    const shouldUpdate = window.confirm('정말로 수정하시겠습니까?');
    if (shouldUpdate) {
      const formData = new FormData();
      formData.append('title', title);
          formData.append('content',content);
          formData.append('postdate', postdate);
          formData.append('visitcount',visitcount);
        if(selectedFile){
           formData.append('myfile', selectedFile);
    }
      try {
        await axios.put(`/notices/${num}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }});
        // 수정 후 상세 페이지로 이동
        navigate(`/notice/${num}`);
      } catch (error) {
        console.error('Error updating notice:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Unstable_Grid2 container   direction="row" justifyContent="center">
      <form>
      <Unstable_Grid2 width={1200}>
        <TableContainer component={Paper} elevation={3}>
        <Table  >
          <TableBody >
            <TableRow  >
              <TableCell className="tableContent">
              <TextField 
              fullWidth
              variant='filled'
              label="제목"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required/>
              </TableCell>
            </TableRow >
            <TableRow>
              <TableCell style={{textAlign:'right'}}>
                <input type="file" name="myfile" className="fileButton" id='fileButton' onChange={handleFileChange}  />
                <IconButton onClick={()=>document.getElementById('fileButton').click()}>
                   <InsertPhoto/>
                </IconButton>
                {isImage&&<IconButton onClick={handleCancleImage}>
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
              fullWidth
              multiline
              rows={16}
              variant='outlined'
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required/>
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
        <Button type="button" onClick={handleUpdate} variant='outlined'>글쓰기</Button>
        </Unstable_Grid2>
      </form>
    </Unstable_Grid2>
  );
};

export default NoticeEdit;

