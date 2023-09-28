import React, { useEffect,useState} from 'react';
import {List, ListSubheader, ListItemButton, ListItemText, ListItem, ListItemIcon, Typography, Divider } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './Mypage.css';
import {Person,Payment,PersonOff,PersonSearch,ContentPaste,DirectionsBus,DirectionsTransit,ManageAccounts,ManageSearch} from '@mui/icons-material';
import vaildAdmin from './vaildAdmin';


const Mypage = () =>{
    const navigate=useNavigate();
    const [isAdmin, setisAdmin] = useState(false); // isAdmin 상태 추가
    const handleNavigation = (path) => {
        navigate(path); // 내비게이션 함수 호출
      };

      useEffect(() => {
        if (vaildAdmin()) {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
      }, []);
    return (
            <List
                sx={{width:'100%',maxWidth:220,borderRight:'1px solid #dcdcdc'}}
                component="nav"
                aria-labelledby="profile"
                subheader={
                    <ListSubheader component="div" id="profile">
                       <Typography fontFamily="GmarketSansMedium"> Profile</Typography>
                    </ListSubheader>}>
                <ListItem sx={{borderTop:'1px solid #dcdcdc'}}>
                <ListItemIcon><ContentPaste fontSize='large' color="primary" /></ListItemIcon>
                    <ListItemText>
                    <Typography variant="h6" fontFamily="GmarketSansMedium">예매내역</Typography>
                        </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={()=> handleNavigation('/EditMember')}>
                    <ListItemIcon><DirectionsBus /></ListItemIcon>
                      <ListItemText>
                      <Typography fontFamily="GmarketSansMedium"> 버스</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon><DirectionsTransit /></ListItemIcon>
                    <ListItemText>
                      <Typography fontFamily="GmarketSansMedium"> 기차</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                    <ListItem sx={{borderTop:'1px solid #dcdcdc'}}>
                        <ListItemIcon><Payment fontSize='large' color="primary" /></ListItemIcon> 
                        <ListItemText>
                      <Typography variant="h6" fontFamily="GmarketSansMedium">결제내역</Typography>
                        </ListItemText>
                    </ListItem>
                <ListItem>
                    <ListItemButton>
                         <ListItemIcon><DirectionsBus /></ListItemIcon>
                         <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">버스</Typography>
                        </ListItemText>
                     </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon><DirectionsTransit /></ListItemIcon>
                        <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">기차</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{borderTop:'1px solid #dcdcdc'}}>
                    <ListItemIcon><Person fontSize='large' color="primary" /></ListItemIcon>
                    <Typography variant="h6" fontFamily="GmarketSansMedium">회원정보</Typography>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={()=> handleNavigation('/EditMember')}>
                    <ListItemIcon><PersonSearch /></ListItemIcon>
                    <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">회원수정</Typography>
                        </ListItemText>
                     </ListItemButton>
                </ListItem>
                <ListItem>
                     <ListItemButton onClick={()=> handleNavigation('/DeleteMember')}>
                     <ListItemIcon><PersonOff /></ListItemIcon>
                     <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">회원탈퇴</Typography>
                        </ListItemText>
                     </ListItemButton>
                </ListItem>
                {isAdmin && (
                    <>
                  <ListItem sx={{borderTop:'1px solid #dcdcdc'}}>
                    <ListItemIcon><ManageAccounts fontSize='large' color="primary" /></ListItemIcon>
                    <Typography variant="h6" fontFamily="GmarketSansMedium">관리자</Typography>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={()=> handleNavigation('/EditMember')}>
                    <ListItemIcon><ManageSearch /></ListItemIcon>
                    <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">관리자 페이지</Typography>
                        </ListItemText>
                     </ListItemButton>
                </ListItem>
                    </> 
            )}
            </List>
    );
};

export default Mypage;