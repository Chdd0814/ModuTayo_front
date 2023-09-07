import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NoticeEdit = () => {
  const { num } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visitcount, setVisitCount] = useState(0);
  const [postdate, setPostDate] = useState('');
  const [loading, setLoading] = useState(true);

  const getNoticeDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/api/notices/${num}`);
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

        await axios.put(`/api/notices/${num}`, dataToUpdate);
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

