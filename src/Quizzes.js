import React from 'react';
import Quiz from './Quiz.js';
import capitalQuiz from './CapitalsQuiz';
import cheeseQuiz from './CheeseQuiz';
const quizzes = [
  capitalQuiz,cheeseQuiz
]
const Quizzes = ({ match })=>{
  const index = match.params.quizId;
  const questionIndex = match.params.questionId;
  const quiz = quizzes[index];
  return (
    <Quiz
      quiz={quiz}
      questionIndex={questionIndex}
    />
  );
}

export default Quizzes;
