import React from 'react';
import Question from './Question.js';

const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}
const Quiz = ({quiz}) => {
  const title = quiz.question;
  const correctAnswer = [quiz.correct_answer];
  const incorrectAnswers = quiz.incorrect_answers;
  const choices = incorrectAnswers.concat(correctAnswer);
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
