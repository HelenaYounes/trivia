import React from 'react';
import Question from './Question.js';

const Quiz = ({quiz, onClick, disabled}) => {
  const title = quiz.question;
  const choices = quiz.incorrect_answers.concat(quiz.correct_answer);
  const answer = quiz.correct_answer;

  return (
    <Question
      title={title}
      choices={choices}
      disabled={disabled}
      onClick={(choice)=>onClick(choice, answer)}
    />
  )
}

export default Quiz;
