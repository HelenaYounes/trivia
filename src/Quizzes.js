import React from 'react';
import Quiz from './Quiz.js';
import capitalQuiz from './CapitalsQuiz';
import cheeseQuiz from './CheeseQuiz';
const quizzes = [
  capitalQuiz,cheeseQuiz
]
const Quizzes = ({ match, children })=>{
  debugger;
  const index = match.params.quizId;
  const quiz = quizzes[index];
  return children;
}

export default Quizzes;
