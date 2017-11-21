import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;

const Choice = (props) => {
  return (
    <RadioButton>
      {props.choice}
    </RadioButton>
  )
}

export default Choice;
