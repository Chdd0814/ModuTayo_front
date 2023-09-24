import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Unstable_Grid2,Button,Table,TableBody,TableCell,TableRow,TextField,TableContainer,Paper,IconButton,ToggleButton } from '@mui/material';
import './noticeEdit.css';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const NoticeEdit = () => {
  const { num } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visitcount, setVisitCount] = useState(0);
  const [postdate, setPostDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
 const [selectedFile,setSelectedFile]=useState('');

  const getNoticeDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/notices/${num}`);
      const { title, content, visitcount, postdate } = response.data;
      setTitle(title);
      setContent(content);
      setVisitCount(visitcount);
      setPostDate(postdate);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notice detail:', error);
      setLoading(false);
    }
  }, [num]);

  useEffect(() => {
    getNoticeDetail();
  }, [getNoticeDetail]);

  const handleFileChange= e=>{
    setSelectedFile(e.target.files[0]);

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
};

  const handleUpdate = async () => {
    const shouldUpdate = window.confirm('정말로 수정하시겠습니까?');
    if (shouldUpdate) {
      try {
        const dataToUpdate = {
          title,
          content,
          visitcount, // Include visitcount in the data
          postdate, // Include postdate in the data
        };

        await axios.put(`/notices/${num}`, dataToUpdate);
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
    <div>
      <h2>공지사항 수정</h2>
      <form>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleUpdate}>수정 완료</button>
      </form>
    </div>
  );
};

export default NoticeEdit;

