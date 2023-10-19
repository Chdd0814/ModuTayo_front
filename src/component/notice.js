    import React, { useState, useEffect ,useCallback} from 'react';
    import { Link } from 'react-router-dom'; // React Router v6 사용
    import './notice.css';
    import axios from 'axios';
    import vaildAdmin from './vaildAdmin';
    import DataTable from './DataTable';
    import {useNavigate} from 'react-router-dom';
    import MemberSearch from './TableMemberSearch';
    import './FontCss.css';
    const Notice = () => {
        const [notices, setNotices] = useState([]);
        const [isAdmin, setisAdmin] = useState(false);
        const navigate=useNavigate()
        const handleNavigation = (path) => {
        navigate(path); // 내비게이션 함수 호출
      };
        useEffect(() => {
            axios.get('/notices/view')
                .then((response) => {
                    if(Array.isArray(response.data)){
                        var i=1
                        response.data=response.data.map((item)=>{
                            return{
                                ...item,
                                number:i++
                        };
                        })
                    }
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
        const TableColor=['#e9e9e9','#EBFBFF','#FAFAFA']
        const noticeTitle=['번호','제목','조회수','작성일']
        const noticeContent=[
            {key:'number',width:60},
            {key:'title',width:120},
            {key:'visitcount',width:60},
            {key:'postdate',width:100}]
        const [SearchFilter,setSearchFilter]=useState({
                search:'',
                classification:'title'
            });
            const handleChange=e=>{
                const {name,value}=e.target;
                setSearchFilter(prevData=>({
                        ...prevData,
                        [name]:value
                }));
            }
        const searchNotice=useCallback(async(e)=>{
                e.preventDefault();
                try{
                    const response=await axios.get('/notices/SearchFilter',{ params: SearchFilter })
                    if(Array.isArray(response.data)){
                        var i=1
                        response.data=response.data.map((item)=>{
                            return{
                            ...item,
                            number:i++
                        };
                        })
                    }
                    setNotices(response.data);
                }catch(error){
                    console.error(error);
                }
            })
            const [classification_content,setClassification_content]=useState([
                {type:'title',display:'제목'},
                {type:'content',display:'내용'},
            ])
        return (
            <div className = "noticeTbl">
                <h1>공지사항</h1>
                <MemberSearch classification_content={classification_content} SearchFilter={SearchFilter} searchMember={searchNotice}  handleChange={handleChange} />
                <div className = "noticeTbl-main">
                <DataTable  searchitem={noticeContent[1].key}  TableColor={TableColor}  title={noticeTitle} member={notices} membercontent={noticeContent} /> 
                </div >
                <div className = "writeBtn">
                {isAdmin && (
                    <Link  to="/notice/write" className="write-button">글작성</Link>
                )}
                </div>
            </div>
        );
    };

    export default Notice;
