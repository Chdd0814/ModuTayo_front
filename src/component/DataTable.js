import React, {useState,useCallback,useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Table,TableCell,TableHead,TableRow,TableBody,TableContainer,Paper,Typography,Box,IconButton,TableFooter,TablePagination } from '@mui/material';
import {FirstPage ,KeyboardArrowLeft ,KeyboardArrowRight ,LastPage } from '@mui/icons-material';
import './FontCss.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // React Router v6 사용
const HeadTable=(props)=>{
    const {title,TableColor}=props
    return(
        <TableHead>
            <TableRow>
            {title.map((item)=>(
                    <TableCell sx={{border:0,backgroundColor:TableColor,color:'#000000'}}>
                        <Typography fontFamily='GmarketSansMedium' textAlign='center'>{item}</Typography>
                    </TableCell>
            ))}
            </TableRow>
        </TableHead>

    );
}
const BodyTable=(props)=>{
    const {content,page,rowsPerPage,membercontent,TableColor,searchitem,handleOpen}=props
    return( 
        <TableBody>    
            {(rowsPerPage > 0
            ? content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : content
          ).map((item,index)=>(
            <TableRow key={index}>
                {membercontent.map((column) => (
                        <TableCell key={column.key} sx={{backgroundColor: index % 2 === 0 ?TableColor[2]:TableColor[1], width:column.width,minWidth:column.width}}>
                            <Typography  color='black' textAlign='center'>{searchitem===column.key?<Link  onClick={handleOpen(item[column.key])}>{item[column.key]}</Link>:item[column.key]}</Typography>
                        </TableCell>
                    ))}
            </TableRow> ))}
        </TableBody>
    );
}

const FooterTable=(props)=>{
    
    const { count, page, rowsPerPage, onPageChange,TableColor } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
      };
    
      const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
      };
    
      const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
    return(
       
                    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                        <IconButton
                            onClick={handleFirstPageButtonClick}
                            disabled={page === 0}
                            aria-label="first page">
                            <FirstPage />
                        </IconButton>
                        <IconButton
                            onClick={handleBackButtonClick}
                            disabled={page === 0}
                            aria-label="previous page">
                           <KeyboardArrowLeft />
                         </IconButton>
                        <IconButton
                            onClick={handleNextButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="next page">
                            <KeyboardArrowRight />
                        </IconButton>
                        <IconButton
                            onClick={handleLastPageButtonClick}
                            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                            aria-label="last page">
                            <LastPage />
                        </IconButton>
                    </Box>
            
    );
}
FooterTable.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

const DataTable=(props)=>{
    const {title,member,membercontent,TableColor,searchitem,handleOpen}=props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows =   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - membercontent.length) : 0;
    const handleChangePage = (event, newPage) => {
    setPage(newPage);};
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);};
    return(
        <Grid2 xs={12}> 
            <TableContainer component={Paper} elevation={3} >
                <Table sx={{borderRadius:5}}>
                    <HeadTable title={title} TableColor={TableColor[0]}/>
                    <BodyTable handleOpen={handleOpen} searchitem={searchitem} TableColor={TableColor} emptyRows={emptyRows} content={member} membercontent={membercontent} rowsPerPage={rowsPerPage} page={page}/>
                    <TableFooter> 
                        <TableRow sx={{backgroundColor:TableColor[0]}}>  
                        <TablePagination 
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={member.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={FooterTable}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid2>

    );
}

export default DataTable;