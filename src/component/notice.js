    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom'; // React Router v6 사용
    import './notice.css';
    import axios from 'axios';

    const Notice = () => {
        const [notices, setNotices] = useState([]);

        useEffect(() => {
            axios.get('/notices')
                .then((response) => {
                    setNotices(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching notices:', error);
                });
        }, []);

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>조회수</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.num}>
                                <td>{notice.num}</td>
                                <td>
                                    <Link to={`/notice/${notice.num}`}>{notice.title}</Link>
                                </td>
                                <td>{notice.visitcount}</td>
                                <td>{notice.postdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/notice/write" className="write-button">글작성</Link>
            </div>
        );
    };

    export default Notice;
