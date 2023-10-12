import {Unstable_Grid2, Typography, Table,TableBody,TableRow,TableCell,TableContainer,Paper,Button,TableHead } from '@mui/material';
 import React, { useState, useEffect, useCallback } from 'react';
 import { useNavigate, useParams } from 'react-router-dom';
 import axios from 'axios';
 import {Delete,ModeEdit} from '@mui/icons-material';
 import './noticeDetail.css';
import vaildAdmin from './vaildAdmin';
 const NoticeDetail = () => {
    const { num } = useParams();
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageData,setImageData]=useState('');
    const [isImage,setIsImage]=useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const navigate = useNavigate(); 
    const getNoticeDetail = useCallback(async () => {
        try {
            console.log("조회수 증가");
            const response = await axios.get(`/notices/${num}`);
            const { file, ...restOfData } = response.data;
            setNotice(restOfData);
            if(file!=null){
            const binaryString = window.atob(file);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        setImageData(URL.createObjectURL(blob));
        setIsImage(true);
      }else{
          setIsImage(false);
      }
        } catch (error) {
            console.error('Error fetching notice detail:', error);
            setLoading(true);
        }
    }, [num]);
    
    useEffect(() => {
        getNoticeDetail();
        if(vaildAdmin()) {
          setisAdmin(true)
        } else {
          setisAdmin(false)
        }
    }, []);

    const handleEdit = () => {
        navigate(`/notice/${num}/edit`);
      };

      const handleDelete = async () => {
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (shouldDelete) {
          try {
            await axios.delete(`/notices/${num}`);
            navigate('/notice');
            // 삭제 후 목록 페이지로 이동하는 로직 추가
            // 예를 들어, history.push('/notices');
          } catch (error) {
            console.error('Error deleting notice:', error);
          }
        }
      };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!notice) {
        return <div>Notice not found</div>;
    }

    return (
        <Unstable_Grid2 container direction="column" alignItems="center" spacing={5} >
        <Unstable_Grid2 xs={8}>
         <TableContainer component={Paper} elevation={3} > 
          <Table>
            
             <TableHead > 
              <TableRow >
                <TableCell align='left' sx={{border:'3px solid #0078FF',backgroundColor:'#0064FF',color:'#dcdcdc'}}>
                  <Typography fontFamily='GmarketSansMedium' >{notice.title}</Typography>
                </TableCell>
              </TableRow>
              </TableHead> 
              <TableBody>
              <TableRow> 
                <TableCell align='right' sx={{border:0}}>
                  <Typography fontFamily='GmarketSansMedium' fontSize={1}>조회수: {notice.visitcount} 등록날짜: {notice.postdate}</Typography>
                </TableCell>
              </TableRow>
              <TableRow className='content'>
                <TableCell align='left' sx={{border:0}}>
                {isImage&& <img src={imageData} className='imgview'/>}
                  <Typography fontFamily='GmarketSansMedium'>{notice.content}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </TableContainer> 
          </Unstable_Grid2>
          {isAdmin && (
            <Unstable_Grid2 container direction="row">
          <Unstable_Grid2>
            <Button variant="contained" startIcon={<ModeEdit />}  onClick={handleEdit}>수정</Button>
          </Unstable_Grid2>
          <Unstable_Grid2>
            <Button variant="contained" startIcon={<Delete />}  onClick={handleDelete}>삭제</Button>
            </Unstable_Grid2>
            </Unstable_Grid2>
            )}</Unstable_Grid2>
    );
};

export default NoticeDetail;
 