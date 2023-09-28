    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom'; // React Router v6 사용
    import './notice.css';
    import axios from 'axios';
import vaildAdmin from './vaildAdmin';

    const Notice = () => {
        const [notices, setNotices] = useState([]);
        const [isAdmin, setisAdmin] = useState(false);

        useEffect(() => {
            axios.get('/notices')
                .then((response) => {
                    setNotices(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching notices:', error);
                });

             if (vaildAdmin()) {

                setisAdmin(true);

             } else {
                setisAdmin(false);
             }
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
                {isAdmin && (
                    <Link to="/notice/write" className="write-button">글작성</Link>
                )}
            </div>
        );
    };

    export default Notice;
