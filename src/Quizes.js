import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Progress } from 'antd';
import { prop, toPairs } from 'ramda';

class Quizes extends Component {
  constructor(props){
    const quizes = JSON.parse(window.localStorage.getItem("quizes"))
    super()
    this.state = {
      quizes,
    }
  }

  delete = (quizId)=>{
    const quizes = this.state.quizes ;
    delete quizes[quizId];
    this.setState({ quizes: quizes }, () => {
      window.localStorage.setItem("quizes", JSON.stringify(this.state.quizes));
    })
  }
  render(){
    const quizes = this.state.quizes;
    const list = toPairs(quizes)
    const listByCat = list.sort((a,b) =>  a[1][0].category > b[1][0].category);
    return <Card>
      <List
       className="demo-loadmore-list"
       itemLayout="horizontal"
       dataSource={listByCat}
       renderItem={([quizId, questions]) => {
         const question = questions[0];
         const totalQuestions = questions.length;
         const category = question.category;
         const answeredQuestions = questions.filter(question => question.choice).length;
         const score = questions.filter(question => question.choice === question.correct_answer).length;
         return (<List.Item actions={[<a icon="delete" onClick={()=>this.delete(quizId)}>Delete</a>]}>
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
    </Card>
  }
}


export default Quizes;
