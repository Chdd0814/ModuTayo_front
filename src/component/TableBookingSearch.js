import React ,{ useState} from "react";
import {TextField,Button} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import dayjs from "dayjs";
import { DemoContainer,DemoItem  } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
const TableSearch=(props)=>{
    const [datevalue, setdatevalue] = useState([
        dayjs(),
        dayjs(),
      ]);
      const handleDateChange = (newValue) => {
        // 내일의 날짜 구하기
        const tomorrow = dayjs().add(1,'day');
      
        // newValue의 시작 및 종료 날짜가 내일 이후인지 확인
        if (newValue[0].isBefore(tomorrow) && newValue[1].isBefore(tomorrow)) {
          setdatevalue(newValue);
        }else{
            setdatevalue(dayjs());
        }
      };
    return(
        <Grid2 container direction='row' justifyContent='center'  columnSpacing={3} marginLeft={5}>
            <Grid2 item paddingTop={1}>
                <TextField sx={{maxWidth:100}} size='small'   variant="outlined" label="출발" />
            </Grid2>
            <Grid2 item paddingTop={1}>
                <TextField sx={{maxWidth:100}}  size='small'  variant="outlined" label="도착" />
            </Grid2>
            <Grid2 item >
                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DemoContainer   components={['DateRangePicker']} > 
                        <DateRangePicker  calendars={1} sx={{maxWidth:300}}  slotProps={{textField:{size:'small'}}}  value={datevalue}  onChange={handleDateChange}/>
                    </DemoContainer>
                </LocalizationProvider>
            </Grid2>
            <Grid2 item paddingTop={1}>
                <Button size="large" variant="outlined" sx={{maxHeight:50}} >검색</Button>
            </Grid2>
        </Grid2>
    );

}

export default TableSearch;