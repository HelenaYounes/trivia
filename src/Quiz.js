import React from 'react';
import Question from './Question.js';

const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}
const Quiz = ({quiz, match}) => {
  const questionIndex = match.params.questionId;
  const question = quiz[questionIndex];
  const title = question.title;
  const choices = question.choices;
  const answer = question.answer;

  return (
    <Question
      title={title}
      choices={choices}
      onClick={(choice) => check(choice, answer)}
    />
  )
}

export default Quiz;
