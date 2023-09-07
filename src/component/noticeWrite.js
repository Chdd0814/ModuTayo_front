import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6 사용
import axios from 'axios';

const NoticeWrite = () => {
    const navigate = useNavigate(); // useNavigate 훅에서 반환된 함수를 사용하여 내비게이션 처리

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date();

        const data = {
            title : title,
            content : content,
            postdate : currentDate.toISOString().slice(0,10) //YYYY-MM-DD 형식으로 날짜 설정
        };

        try {
            await axios.post('/api/notices', data);
            navigate('/'); // 작성 후에 공지사항 목록 페이지로 이동
        } catch (error) {
            console.error('Error writing notice:', error);
            console.error('Response data:', error.response.data);
        }
        console.log('handleSubmit called')
    };

    return (
        <div className="notice-write">
            <h2>글 작성</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default NoticeWrite;
