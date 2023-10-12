import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };
  
  const handleBlur = () => {
    setIsClicked(false);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      onClick={handleClick}
      onBlur={handleBlur}
      tabIndex={0}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      {...other}
    >
      {value === index && (
        <Box p={0.7}>
        <Button component="div" style={{ backgroundColor: isClicked ? 'blue' : 'white', color: isClicked ? 'white' : 'black'}}>{children}</Button>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;