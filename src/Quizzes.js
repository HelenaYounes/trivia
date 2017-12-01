import React from 'react';
import Quiz from './Quiz.js';
import { Route } from 'react-router';
import capitalQuiz from './CapitalsQuiz';
import cheeseQuiz from './CheeseQuiz';

const quizzes = [cheeseQuiz, capitalQuiz]
const Quizzes = ({ match })=>{
  const id = match.params.quizId;
  const quiz = quizzes.filter((q)=> q.id == id)[0];
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
