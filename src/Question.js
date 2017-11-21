import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const Question = ({title, choices, onClick}) => {
  return (
    <Card title={title}>
      {choices.map(choice => (
      <p>
        <Choice choice={choice} onClick={onClick}/>
      </p>
    ))}
    </Card>

  )
}

export default Question;
