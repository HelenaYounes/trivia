import React from 'react';
import { Card } from 'antd';
import Question from './Question.js';

const questions = [
  {
    title: 'capital Belgium',
    choices: ['Brussels', 'Ankara', 'Jakarta'],
    answer: 'Brussels'
  },
  {
    title: 'capital Mexico',
    choices: ['Vienna', 'Berlin', 'Mexico City'],
    answer: 'Mexico City'
  },
  {
    title: 'capital Brazil',
    choices: ['Rome', 'Johanesburg', 'Brazilia'],
    answer: 'Brazilia'
  },
];
const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}
const Quiz = ({match}) => {
  const index = match.params.id;
  const question = questions[index];
  const title = question.title;
  const choices = question.choices;
  const answer = question.answer;

  return (
    <Question title={title} choices={choices} onClick={(choice) => check(choice, answer)}/>
  )
}

export default Quiz;
