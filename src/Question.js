import React from 'react';
import { Card } from 'antd';
import Choice from './Choice.js';

const questions = [
  {
    title: 'capital Belgium',
    choices: ['Brussels', 'Ankara', 'Jakarta'],
  },
  {
    title: 'capital Mexico',
    choices: ['Vienna', 'Berlin', 'Mexico City'],
  },
  {
    title: 'capital Brazil',
    choices: ['Rome', 'Johanesburg', 'Brazilia'],
  },
];

const Question = ({match}) => {
  const index = match.params.id;
  const question = questions[index];
  const title = question.title
  const choices = question.choices;
  return (
    <Card title={title}>
      {choices.map(choice => (
      <p>
        <Choice choice= { choice }/>
      </p>
    ))}
    </Card>

  )
}

export default Question;
