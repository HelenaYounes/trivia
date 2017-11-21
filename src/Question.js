import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const Question = (props) => {
  return (
    <Card title={props.title}>
      {props.choices.map(choice => (
      <p>
        <Choice choice={choice}/>
      </p>
    ))}
    </Card>

  )
}

export default Question;
