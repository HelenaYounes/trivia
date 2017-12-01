import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
// import { indexOf } from 'ramda';
import Quiz from './Quiz.js';
// import { Route } from 'react-router';
import CapitalsQuiz from './CapitalsQuiz.js'
import CheeseQuiz from './CheeseQuiz.js'

const listQuiz= [ CheeseQuiz, CapitalsQuiz];
//
// const check = (choice, answer) => {
//   const winningMsg = choice === answer? 'yes': 'no'
//   return alert(winningMsg);
// // }
// const onClickQuiz =()=>{
//
//   return <Route
//       path='/quiz/:quizId/questions'
//       render={(routeProps)=>{
//         return <Quiz
//           match={routeProps.match}
//           quiz={quiz.questions}
//         />
//       }}
//     />
// }
const QuizesList =({ match })=>{

  return (<div className='quizList'>
    {listQuiz.map((quizz, index)=> {
      // const currentIndex= indexOf(quizz, listQuiz)


      return (<Link to={`/quiz/${quizz.id}/question/0`}>
        <Card className='Card' title={quizz.quizTitle}/>
      </Link>)
     })
   }
  </div>);
}


export default QuizesList;
