import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Progress } from 'antd';
import { toPairs } from 'ramda';
import Quiz from './Quiz';


const QuizList = (props) =>{
  const quizes = props.list;
  const list = toPairs(quizes)
  // const listByCat = list.sort((a,b) => a[1][0].category > b[1][0].category);
  const completedQuizes = list.filter((quiz) => quiz.isCompleted);
  const inProgress = list.filter((quiz) => !quiz.isCompleted);
  return <Card>
    <Card className ="inProgress" title="In Progress">
      <Quiz onDelete = {props.onDelete} quizes={inProgress}/>
    </Card>
    <Card className ="inProgress" title="Completed">
      <Quiz onDelete = {props.onDelete} quizes={completedQuizes}/>
    </Card>

    </Card>
}


export default QuizList;
