import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';

function Traintabpanel(props) {
  const { children, value, index, onSelect, selected, ...other } = props;


  const handleClick = () => {
    onSelect(index,value); // 선택한 값을 부모 컴포넌트에 알리기 위해 onSelect 함수 호출
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      variant="scrollable"
      aria-labelledby={`vertical-tab-${index}`} // 높이와 너비 조정
      {...other}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '80%', // 100% 너비로 설정
        justifyContent: 'center', // 가운데 정렬
    

      }}
      >
      {value === index  && (
        <Box p={2} style={{ height: 50 , width : 50 }}>
          <Button component="div" 
          onClick={handleClick}
        style={{
          backgroundColor: selected ? 'blue' : 'white', // 배경색 변경
          color: selected ? 'white' : 'black', // 글자색 변경
          margin: '0 5px',
        }}>{children}</Button>
        </Box>
      )}
    </div>
  );
}

Traintabpanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};


export default Traintabpanel;