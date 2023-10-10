import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';

function Traintabpanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`} // 높이와 너비 조정
      {...other}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width : 50
      }}
      >
      {value === index  && (
        <Box p={2} style={{ height: 50 , width : 50 }}>
          <Button component="div">{children}</Button>
        </Box>
      )}
    </div>
  );
}

Traintabpanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};


export default Traintabpanel;