import React from 'react';
import QuizList from './QuizList';

const Home = (props) => {
   return (
     <QuizList list={props.list} onDelete = {(quizId) => props.onDelete(quizId)}/>
   );
 }

export default Home;
