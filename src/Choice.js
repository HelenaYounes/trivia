import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;

const Choice = ({choice, onClick, disabledQuest}) => {
  return (
    <RadioButton
      style={{display:'block'}}
      onClick={()=>onClick()}
      checked={disabledQuest}
    >
      {choice}
    </RadioButton>
  )
}

export default Choice;
