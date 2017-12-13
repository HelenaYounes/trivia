import React from 'react';
import Question from './Question.js';

const Quiz = ({ quiz,  disabledQuest, match, onClick }) => {
  const title = quiz.question;
  const choices = quiz.incorrect_answers.concat(quiz.correct_answer);
  const answer = quiz.correct_answer;
  return <Question
    match={match}
    title={title}
    choices={choices}
    disabledQuest={disabledQuest}
    onClick={(choice)=>onClick(choice, answer)}
  />
}

export default Quiz;
