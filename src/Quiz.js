import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Progress } from 'antd';
import { toPairs } from 'ramda';

const Quiz = (props) =>{
    return <List
       className="demo-loadmore-list"
       itemLayout="horizontal"
       dataSource={props.quizes}
       renderItem={([quizId, questions]) => {
         const question = questions[0];
         const totalQuestions = questions.length;
         const category = question.category;
         const answeredQuestions = questions.filter(question => question.choice).length;
         const quizComplete = (answeredQuestions === totalQuestions);
         const score = questions.filter(question => question.choice === question.correct_answer).length;
         return (<List.Item actions={[<a icon="delete" onClick={()=>props.onDelete(quizId)}>Delete</a>]}>
           <Link to={`/quizes/${quizId}/questions/${answeredQuestions}`}>
             <List.Item.Meta
               title={category}
               description={`Score:${score}/${totalQuestions} Finish quiz`}
               avatar={<Progress
                 width={40} type="circle" percent={(answeredQuestions/totalQuestions)*100} format={percent => `${answeredQuestions}`}
               />}
             />
             <List.Item>
             <List.Item.Meta
               title={`Score:${score}/${totalQuestions} Finish quiz`}
             />
            </List.Item>
           </Link>
         </List.Item>)
       }}
     />
   }

export default Quiz;
