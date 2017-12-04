import React from 'react';
import Question from './Question.js';

const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}
const Quiz = ({quiz}) => {
  const title = quiz.question;
  const choices = quiz.incorrect_answers.concat(quiz.correct_answer);
  const answer = quiz.correct_answer;


  return (
    <Question
      title={title}
      choices={choices}
      onClick={(choice) => check(choice, answer)}
    />
  )
}

export default Quiz;
