import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const Question = ({title, choices, disabledQuest, onClick}) => {
  return (
    <Card title={title}>
      {choices.map((choice, i) =>
        <Choice
          key={'choice_' + i}
          choice={choice}
          onClick={()=>onClick(choice)}
          disabledQuest={disabledQuest}
        />
      )}
    </Card>
  )
}

export default Question;
