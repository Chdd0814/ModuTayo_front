 
 import React, { useState, useEffect, useCallback } from 'react';
 import { useNavigate, useParams } from 'react-router-dom';
 import axios from 'axios';
 
 const NoticeDetail = () => {
    const { num } = useParams();
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    const getNoticeDetail = useCallback(async () => {
        try {
            const response = await axios.get(`/api/notices/${num}`);
            setNotice(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notice detail:', error);
            setLoading(false);
        }
    }, [num]);
    
    useEffect(() => {
        getNoticeDetail();
    }, [getNoticeDetail]);

    const handleEdit = () => {
        navigate(`/notice/${num}/edit`);
      };

      const handleDelete = async () => {
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (shouldDelete) {
          try {
            await axios.delete(`/api/notices/${num}`);
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
        <div>
            <h2>제목: {notice.title}</h2>
            <p>내용 : {notice.content}</p>
            <p>조회수: {notice.visitcount}</p>
            <p>작성일: {notice.postdate}</p>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default NoticeDetail;
 