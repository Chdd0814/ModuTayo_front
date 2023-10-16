import React ,{ useState} from "react";
import {TextField,Button,Box,ButtonGroup } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import dayjs from "dayjs";
import { DemoContainer,DemoItem  } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
const TableSearch=(props)=>{
    const {handleChangeSearch,searchBooking,SearchFilter}=props
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
          
          console.log(dayjs().format('YYYY-MM-DD HH:mm'))
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
        <Grid2 container direction='row'  justifyContent='center' columnSpacing={3} marginBottom={2} marginLeft={25}>
                <Grid2>
                    <ButtonGroup variant="contained">
                    <Button onClick={handleOneDay}>1일</Button>
                    <Button onClick={handleOneWeek}>1주일</Button>
                    <Button onClick={handleOneMonth}>1달</Button>
                    <Button onClick={handleOneYear}>1년</Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <form onSubmit={searchBooking}>
        <Grid2 container direction='row' justifyContent='center'  columnSpacing={3} marginLeft={5}>
            <Grid2 item paddingTop={1}>
                <TextField value={SearchFilter.start} onChange={handleChangeSearch} name='start' sx={{maxWidth:100}} size='small'   variant="outlined" label="출발" />
            </Grid2>
            <Grid2 item paddingTop={1}>
                <TextField value={SearchFilter.end} onChange={handleChangeSearch} name='end' sx={{maxWidth:100}}  size='small'  variant="outlined" label="도착" />
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