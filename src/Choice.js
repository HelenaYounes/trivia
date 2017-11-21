import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;

const Choice = ({choice, onClick}) => {
  return (
    <RadioButton
      style={{display:'block'}}
      onClick={()=>onClick(choice)}
    >
      {choice}
    </RadioButton>
  )
}

export default Choice;
