import React from 'react';
import Quiz from './Quiz.js';
import { Route } from 'react-router';
import capitalQuiz from './CapitalsQuiz';
import cheeseQuiz from './CheeseQuiz';
const quizzes = [
  capitalQuiz,cheeseQuiz
]
const Quizzes = ({ match })=>{
  const index = match.params.quizId;
  const quiz = quizzes[index];
  return <Route
      path='/quiz/:quizId/question/:questionId'
      render={(routeProps)=>{
        return <Quiz
          match={routeProps.match}
          quiz={quiz}
        />
      }}
    />
  }

export default Quizzes;
