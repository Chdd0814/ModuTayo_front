import React,{useState} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import {TextField,Select,MenuItem,Button } from '@mui/material';
const MemberSearch=(props)=>{
    const {handleChange,searchMember,SearchFilter,classification_content}=props   
return(
    <form onSubmit={searchMember}>
    <Grid2 container direction='row' justifyContent='center'  columnSpacing={1}>
        <Grid2 item>
        <Select size='small' name='classification' value={SearchFilter.classification} onChange={handleChange} sx={{minWidth:79}} >
        {classification_content.map(item=>
            <MenuItem value={item.type}>{item.display}</MenuItem>
        )}
          
        </Select>
        </Grid2>
        <Grid2 item>
            <TextField size='small' name='search' variant="outlined"  onChange={handleChange}/>
        </Grid2>
        <Grid2 item marginLeft={3}>
            <Button type='submit'   variant="outlined">검색</Button>
        </Grid2>
    </Grid2>
    </form>
    
);
}
export default MemberSearch;