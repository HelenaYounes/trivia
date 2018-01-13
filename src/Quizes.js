import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Progress } from 'antd';
import { toPairs } from 'ramda';

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
    const list = toPairs(quizes).sort(([a], [b]) => a > b);
    return <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={list}
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
              avatar={<Progress
                width={40} type="circle" percent={(answeredQuestions/totalQuestions)*100} format={percent => `${answeredQuestions}`}
              />}
            />
          </Link>
        </List.Item>)
      }}
    />
  }
}


export default Quizes;
