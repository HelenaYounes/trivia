import React, { Component } from 'react';
import { List } from 'antd';
import { toPairs } from 'ramda';
import { Link } from 'react-router-dom';

class Quizes extends Component {
  constructor(props){
    const quizes = JSON.parse(window.localStorage.getItem("quizes"))
    super()
    this.state = {
      quizes,
    }
  }

  delete = (quizId)=>{
    const quizes = this.state.quizes;
    delete quizes[quizId];
    this.setState({ quizes: quizes }, () => {
      window.localStorage.setItem("quizes", JSON.stringify(this.state.quizes));
    })
  }

  render(){
    const quizes = this.state.quizes;
    const list = toPairs(quizes);

      return(<List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={([quizId, questions]) => {
          const question = questions[0];
          const category = question.category;
          const totalQuestions = questions.length
          const answered = questions.filter(question => question.choice).length;
          const score = questions.filter(question => question.choice === question.correct_answer).length / answered || 0

          return (
                <List.Item
                    actions={[<Link to={`/quizzes/${quizId}/questions/${answered}`}>Continue</Link>, <a icon="delete" onClick={()=>this.delete(quizId)}>Delete</a>]}>
                  <List.Item.Meta
                    title={category}
                  />
                  {`Score: ${score*100}/${totalQuestions}`}
                </List.Item>
          )
        }}
      />
    );
  }
}

export default Quizes;
