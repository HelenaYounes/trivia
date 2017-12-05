import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const Question = ({title, choices, disabled, onClick}) => {
  return (
    <Card title={title}>
      {choices.map((choice, i) =>
        <Choice
          key={'choice_' + i}
          choice={choice}
          onClick={()=>onClick(choice)}
          disabled={disabled}
        />
      )}
    </Card>
  )
}

export default Question;
