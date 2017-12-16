import React from 'react';
import { Radio } from 'antd';
const RadioButton = Radio.Button;

const Choice = ({choice, onClick, disabledQuest}) => {
  return (
    <RadioButton
      onClick={()=>onClick()}
      disabled={disabledQuest}
    >
      {choice}
    </RadioButton>
  )
}

export default Choice;
