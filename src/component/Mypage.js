import React, { useEffect,useState} from 'react';
import {List, ListSubheader, ListItemButton, ListItemText, ListItem, ListItemIcon, Typography, Divider,Collapse } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './Mypage.css';
import {Person,Payment,PersonOff,PersonSearch,ContentPaste,DirectionsBus,DirectionsTransit,ManageAccounts,ManageSearch,ExpandLess ,ExpandMore,ManageAccountsTwoTone } from '@mui/icons-material';
import vaildAdmin from './vaildAdmin';
const Subcontent=(props)=>{
  return(
    <ListItem>
                    <ListItemButton onClick={()=> props.movelink(props.link)}>
                    <ListItemIcon>{props.icon}</ListItemIcon>
                      <ListItemText>
                      <Typography fontFamily="GmarketSansMedium">{props.content}</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
  );
}
const Subcontentbar=(props)=>{
  return(
    <Collapse in={props.open} timeout="auto" unmountOnExit>
                       <List component="div" disablePadding sx={{ pl: 4 }}>
                  {props.firstcontent} 
                  {props.secondcontent}
                        </List>
                      </Collapse>
  );
}
const SubTitlebar=(props)=>{
  return(
  <ListItem sx={{borderTop:'1px solid #dcdcdc'}}>
            <ListItemButton onClick={()=>props.setOpen(props.open)}>
            <ListItemIcon><props.icon fontSize='large' color="primary" /></ListItemIcon>
                <ListItemText>
                <Typography  fontFamily="GmarketSansMedium" fontSize={19}>{props.content}</Typography>
                    </ListItemText>
                    {props.isOpen ? <ExpandLess  /> : <ExpandMore />}                       
            </ListItemButton>
            </ListItem>);}
const Mypage = (props) =>{
    const navigate=useNavigate()
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
                sx={{width:'100%',maxWidth:250,borderRight:'1px solid #dcdcdc'}}
                component="nav"
                aria-labelledby="profile"
                subheader={
                    <ListSubheader component="div" id="profile">
                       <Typography fontFamily="GmarketSansMedium"> Profile</Typography>
                    </ListSubheader>}>
                    <SubTitlebar icon={ContentPaste} content="예매내역" isOpen={props.open.ticketingOpen} open="ticketingOpen" setOpen={props.handleOpen} />
                      <Subcontentbar open={props.open.ticketingOpen} 
                      firstcontent={<Subcontent movelink={handleNavigation} link="/BusBooking" icon={<DirectionsBus />} content="버스"/>}
                      secondcontent={<Subcontent movelink={handleNavigation} link="/TrainBooking" icon={<DirectionsTransit />} content="기차"/>} />
                <SubTitlebar icon={Payment} content="결제내역" isOpen={props.open.paymentOpen} open="paymentOpen" setOpen={props.handleOpen} />
                <Subcontentbar open={props.open.paymentOpen} 
                      firstcontent={<Subcontent movelink={handleNavigation} link="/PaymentHistoryBus" icon={<DirectionsBus />} content="버스"/>}
                      secondcontent={<Subcontent movelink={handleNavigation} link="/PaymentHistoryTrain" icon={<DirectionsTransit />} content="기차"/>} />
                <SubTitlebar icon={Person} content="회원정보" isOpen={props.open.memberOpen} open="memberOpen" setOpen={props.handleOpen} />
                <Subcontentbar open={props.open.memberOpen} 
                      firstcontent={<Subcontent movelink={handleNavigation} link="/EditMember" icon={<PersonSearch />} content="회원수정"/>}
                      secondcontent={<Subcontent movelink={handleNavigation} link="/DeleteMember" icon={<PersonOff />} content="회원탈퇴"/>} />

                {isAdmin && (<><SubTitlebar icon={ManageAccounts} content="관리자" isOpen={props.open.adminOpen} open="adminOpen"  setOpen={props.handleOpen}/>
                <Subcontentbar open={props.open.adminOpen} 
                      firstcontent={<Subcontent movelink={handleNavigation} link="/AdminMember" icon={<ManageAccountsTwoTone />} content="회원관리"/>}/>
                      </> )}
            </List>
    );
}
export default Mypage;