import React, {useState,useEffect} from "react";
import { Button, FormControl, Select, InputLabel, MenuItem,  Grid, Typography, Divider, Paper, Box, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material";





function Payment() {
    const [pg,setpg] = useState("kcp.T0000");
    const [payMethod, setpayMethod] = useState("card");
    const [depPlace, setdepPlace] = useState(""); // 출발지
    const [arrPlace, setarrPlace] = useState(""); // 도착지
    const [depTime, setdepTime] = useState(""); // 출발시간 
    const [arrTime, setarrTime] = useState(""); // 도착시간
    const [trainGrade, settrainGrade] = useState(""); // 기차 종류
    const [trainNum, settrainNum] = useState(''); // 기차번호
    const [dateValue, setdateValue] = useState(""); // 
    const [Party, setParty] = useState('');
    const [buyerName, setbuyerName] = useState(''); // 이름 상태
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [mileage, setMileage] = useState(''); // 마일리지 상태
    const [id, setid] = useState('');
    const [ticketPrice, setTicketPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [usedMileage, setusedMileage] = useState(0);
    const [trainSeatnumber, settrainSeatnumber] = useState('');
    const [trainCarnumber, settrainCarnumber] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('saveTicketinfo');

        if (token) {
          const dataToken = JSON.parse(token);

          setdepPlace(dataToken.depPlace);
          setarrPlace(dataToken.arrPlace);
          setarrTime(dataToken.arrPlandTime);
          setdepTime(dataToken.depPlandTime);
          settrainGrade(dataToken.trainGradeName);
          settrainNum(dataToken.trainNum);
          setdateValue(dataToken.datevalue);
          setParty(dataToken.party);
          setbuyerName(dataToken.name);
          setPhoneNumber(dataToken.phoneNumber);
          setid(dataToken.id);
          setTicketPrice(dataToken.ticketPrice);
          setTotalPrice(dataToken.totalPrice);
          setMileage(dataToken.Mileage);
          setusedMileage(dataToken.useMileage);
          settrainSeatnumber(dataToken.trainSeatNumber);
          settrainCarnumber(dataToken.trainCarNumber);


        }
      }, []);

    const requestpay = () => {

        if (!window.IMP) return;
        const userCode = process.env.REACT_APP_USERCODE;
        const { IMP } = window;
        IMP.init(userCode);

        const merchantUid = `ticket_${new Date().getTime()}`;
        const nameConcatenated = `모두타요_${depPlace}_${arrPlace}`;

        const data = {
            pg: pg, // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
            pay_method: payMethod, // 결제수단
            merchant_uid: merchantUid, // 주문번호
            amount: totalPrice, // 결제금액
            name: nameConcatenated, // 주문명
            buyer_name: buyerName, // 구매자 이름
            buyer_tel: phoneNumber, // 구매자 전화번호
    }
    IMP.request_pay(data, callback);
    }

    function callback(response) {
        const { success, error_msg } = response;
    
        if (success) {
          alert("결제 성공");
        } else {
          alert(`결제 실패: ${error_msg}`);
        }
      }

  return (
<Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h5" gutterBottom>
            결제
          </Typography>
          <Divider style={{ marginBottom: "16px" }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  height: '100%',
                  padding: '16px 16px 0px',
                }}
              >
                <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>이름: {buyerName}</Typography>

                
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>연락처: {phoneNumber}</Typography>
              </Grid>
            </Grid>
             <Grid container>
              <Grid item xs = {12}>
              <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{dateValue}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{trainGrade}-{trainNum} | {trainCarnumber}호차-{trainSeatnumber}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{depPlace} - {arrPlace}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{depTime} - {arrTime}</Typography>
              </Grid>
              
             
              </Grid>   
              </Box>
            </Grid>
          </Grid>
    
          <Divider style={{ marginBottom: "16px" }} />

          {/* Paper 추가 */}
          <Paper elevation={3} style={{ padding: "16px", margin : "16px"}}>
            {/* 여기에 결제 상세 정보 컴포넌트를 추가합니다. */}
            <Typography variant="subtitle1" sx = {{ textAlign : 'center', fontWeight : 'bold', fontSize : 20}} gutterBottom>
              결제 상세 정보
            </Typography>
            <Typography>기차표 운임</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{ticketPrice} 원</Typography>
                <Typography>마일리지 할인</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}>{usedMileage} 원</Typography>
                <Typography>총금액</Typography>
                <Typography sx = {{ textAlign: 'center', fontWeight : 'light', fontSize : 12}}> {totalPrice}원</Typography>
            {/* ... 결제 상세 정보 컴포넌트 내용 ... */}
          </Paper>
    
          <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
  {/* 결제 방식 및 버튼 */}
  <FormControl component="fieldset" fullWidth style={{ marginBottom: "16px" }}>
    <FormLabel component="legend" style={{ textAlign: "center" }}>
      결제수단
    </FormLabel>
    <Box display="flex" justifyContent="center">
      <RadioGroup defaultValue="kakaopay.TC0ONETIME" name="payment-method">
        <FormControlLabel
          value="kakaopay.TC0ONETIME"
          control={<Radio />}
          label="카카오페이"
          style={{ marginRight: "16px" }}
        />
        <FormControlLabel
          value="kcp.T0000"
          control={<Radio />}
          label="신용카드"
        />
      </RadioGroup>
    </Box>
  </FormControl>
</Paper>
    
          {/* 다른 결제 정보 입력 필드 및 UI 컴포넌트 추가 */}
          {/* ...
  
          나머지 코드
  
          ... */}
    
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={requestpay}
            style={{ marginTop: "16px" }}
          >
            {totalPrice}원 결제
          </Button>
        </Paper>
      </Grid>
    </Grid>

  );
    }
    

  

export default Payment;