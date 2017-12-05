import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;

const Choice = ({choice, onClick, disabled}) => {
  return (
    <RadioButton
      style={{display:'block'}}
      onClick={()=>onClick()}
      checked={disabled}
    >
      {choice}
    </RadioButton>
  )
}

export default Choice;
