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
        const answered = questions.filter(question => question.choice).length;
        const score = questions.filter(question => question.choice === question.correct_answer).length;
        return (
          <List.Item
            actions={[
              <Link to={`/quizzes/${quizId}/questions/${answered-1}`}>
                Continue
              </Link>,
              <a icon="delete" onClick={()=>this.delete(quizId)}>
                Delete
              </a>]}
          >
            <List.Item.Meta
              title={category}
              avatar={<Progress
                width={40} type="circle" percent={score} format={percent => `${percent}/${totalQuestions}`}
              />}
            />
          </List.Item>
        )
      }}
    />
  }
}


export default Quizes;
