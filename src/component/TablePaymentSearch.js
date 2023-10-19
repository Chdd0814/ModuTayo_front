import React ,{ useState} from "react";
import {Select,Button,Box,ButtonGroup,MenuItem,FormControl,InputLabel } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import dayjs from "dayjs";
import { DemoContainer,DemoItem  } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import './TablePaymentSearch.css';

const TableSearch=(props)=>{
    const {handleChangeSearch,searchPayment,SearchFilter}=props
    const [payType]=useState([
        {payType:'point',payName:'포인트'},
        {payType:'kakaopay',payName:'카카오페이'},
        {payType:'card',payName:'카드'},
        {payType:'naverpay',payName:'네이버페이'},
        {payType:'samsung',payName:'삼성페이'},
        {payType:'payco',payName:'페이코페이'},
        {payType:'lpay',payName:'L페이'},
        {payType:'ssgpay',payName:'신세계페이'},
        {payType:'tosspay',payName:'토스'},
        {payType:'applepay',payName:'애플페이'},
        {payType:'pinpay',payName:'PIN페이'},
        {payType:'skpay',payName:'SK페이'},
        {payType:'wechat',payName:'위챗'},
        {payType:'alipay',payName:'ALI페이'},
        {payType:'unionpay',payName:'유니온페이'},
        {payType:'tenpay',payName:'TEN페이'},
        {payType:'molpay',payName:'MOL페이'},
        {payType:'naverpay_card',payName:'네이버페이(카드)'},
        {payType:'naverpay_point',payName:'네이버페이(포인트)'}
    ])
    const [datevalue, setdatevalue] = useState([
        dayjs(),
        dayjs(),
      ]);
      const handleDateChange = (newValue) => {
          setdatevalue(newValue);
          const startDateStr = newValue[0].format('YYYY-MM-DD');
          if(newValue[1]!==null){
          const endDateStr = newValue[1].format('YYYY-MM-DD');
          handleChangeSearch({ target: { name: 'endDay', value: endDateStr } });
        }
          handleChangeSearch({ target: { name: 'startDay', value: startDateStr } });
          
          console.log(SearchFilter)
        };
          const disableFutureDates = (date) => {
            const tomorrow = dayjs();
            return date.isAfter(tomorrow);
        };
     const handleOneDay=()=>{
        setdatevalue([dayjs().add(-1,'day'),dayjs()])
        handleChangeSearch({ target: { name: 'startDay', value: dayjs().add(-1,'day').format('YYYY-MM-DD') } });
          handleChangeSearch({ target: { name: 'endDay', value:dayjs().format('YYYY-MM-DD') } });
          console.log(SearchFilter)
     }
     
     const handleOneWeek=()=>{
        setdatevalue([dayjs().add(-1,'week'),dayjs()])
        handleChangeSearch({ target: { name: 'startDay', value: dayjs().add(-1,'week').format('YYYY-MM-DD') } });
        handleChangeSearch({ target: { name: 'endDay', value:dayjs().format('YYYY-MM-DD') } });
     }
     
     const handleOneMonth=()=>{
        setdatevalue([dayjs().add(-1,'month'),dayjs()])
        handleChangeSearch({ target: { name: 'startDay', value: dayjs().add(-1,'month').format('YYYY-MM-DD') } });
        handleChangeSearch({ target: { name: 'endDay', value:dayjs().format('YYYY-MM-DD') } });
     }
     
     const handleOneYear=()=>{
        setdatevalue([dayjs().add(-1,'year'),dayjs()])
        handleChangeSearch({ target: { name: 'startDay', value: dayjs().add(-1,'year').format('YYYY-MM-DD') } });
        handleChangeSearch({ target: { name: 'endDay', value:dayjs().format('YYYY-MM-DD') } });
     }
    return(
        
        <Grid2 container direction='column'> 
        <Grid2 container direction='row'  justifyContent='center' columnSpacing={3} marginBottom={2}>
                <Grid2>
                    <ButtonGroup variant="contained" className="btnGroup2">
                    <Button onClick={handleOneDay}>1일</Button>
                    <Button onClick={handleOneWeek}>1주일</Button>
                    <Button onClick={handleOneMonth}>1달</Button>
                    <Button onClick={handleOneYear}>1년</Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <form onSubmit={searchPayment}>
        <Grid2 container direction='row' justifyContent='center'  columnSpacing={3} marginLeft={5}>
            <Grid2 item sx={{paddingTop:1}} >
              <Box sx={{minWidth:120}}>
                <FormControl size="small" fullWidth>
                <InputLabel size="small">결제유형</InputLabel>
                  <Select  name="paymentType" size="small" label="결제유형" value={SearchFilter.paymentType}  onChange={handleChangeSearch}>
                  {
                  payType.sort((a, b) => a.payName.localeCompare(b.payName)).map((item) => <MenuItem value={item.payType}>{item.payName}</MenuItem>)}

                  </Select>
                </FormControl>
             </Box>  
            </Grid2>
                  <Grid2 item >   
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DemoContainer   components={['DateRangePicker']} > 
                        <DateRangePicker  shouldDisableDate={disableFutureDates}  calendars={1} sx={{maxWidth:300}}  slotProps={{textField:{size:'small'}}}  value={datevalue}  onChange={handleDateChange}/>
                    </DemoContainer>
                </LocalizationProvider>
            </Grid2>
            <Grid2 item paddingTop={1}>
                <Button type='submit' size="large" variant="outlined" sx={{maxHeight:50}} >검색</Button>
            </Grid2>
        </Grid2>
        </form>
        
        </Grid2>
    );

}

export default TableSearch;