import React from 'react';
import { Card } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
// import { indexOf } from 'ramda';
import Quiz from './Quiz.js';
import CapitalsQuiz from './CapitalsQuiz.js'
import CheeseQuiz from './CheeseQuiz.js'

const listQuiz= [ CheeseQuiz, CapitalsQuiz ];

const QuizesList =({ match }) => {
  return (
    <Switch>
      <Route path='/quiz/:quizId/question/:questionId' render={({match}) => {
        const id = match.params.quizId;
        const quiz = listQuiz.filter((q)=> q.id == id)[0];
        return <Quiz match={match} quiz={quiz} />
      }}/>
      <Route path='/' render={() => {
        return (
          <div className='quizList'>
            {listQuiz.map((quizz)=> {
              return (
                <Link to={`/quiz/${quizz.id}/question/0`}>
                <Card className='Card' title={quizz.quizTitle}/>
              </Link>
            )
          })}
        </div>
      )
    }}/>
  </Switch>
  )
}


export default QuizesList;
