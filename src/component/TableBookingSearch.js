import React ,{ useState} from "react";
import {TextField,Button} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import dayjs from "dayjs";
import { DatePicker} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
const TableSearch=(props)=>{
    const [datevalue, setdatevalue] = useState(dayjs()); // 날짜 
    return(
        <Grid2 container direction='row' justifyContent='center'  columnSpacing={3} marginLeft={5}>
            <Grid2 item>
                <TextField sx={{maxWidth:100}} size='small'   variant="outlined" label="출발역" />
            </Grid2>
            <Grid2 item>
                <TextField sx={{maxWidth:100}}  size='small'  variant="outlined" label="도착역" />
            </Grid2>
            <Grid2 item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker  sx={{
                    '& .MuiInputBase-root': { 
                      height: 40, 
                    fontSize: '0.875rem',
                     paddingTop: '6px',
                    paddingBottom: '6px'
                   },
                    '& .MuiInputLabel-outlined': {
                     transform: 'translate(14px, 18px) scale(1)', 
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -6px) scale(0.75)', }
                    }}
                    label="날짜"
                    value={datevalue}
                    onChange={(newdatevalue) => setdatevalue(newdatevalue)}
                    color="secondary"/>
            </LocalizationProvider>
            </Grid2>
            <Grid2 item>
                <Button size="large" variant="outlined" sx={{maxHeight:50}}>검색</Button>
            </Grid2>
        </Grid2>
    );

}

export default TableSearch;