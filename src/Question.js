import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const Question = ({title, choices, onClick}) => {
  return (
    <Card title={title}>
      {choices.map((choice, i) =>
        <Choice
          key={'choice_' + i}
          choice={choice}
          onClick={onClick}
        />
      )}
    </Card>
  )
}

export default Question;
