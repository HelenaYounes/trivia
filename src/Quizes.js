import React, { Component } from 'react';
import { Button, Col, Row , List, Progress, Spin } from 'antd';
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
          const score = questions.filter(question => question.choice === question.correct_answer).length / questions.length;
          const answered = questions.filter(question => question.choice).length;
          const unanswered = questions.length - answered;

          return (
            <Row>
              <Col span={22}>
                <List.Item actions={[<Link to={`/quizzes/${quizId}/questions/${answered}`}>Continue</Link>, <a icon="delete" onClick={()=>this.delete(quizId)}>Delete</a>]}>
                  <List.Item.Meta
                    title={category}
                  />
                  <Progress percent={score*100} type="circle" width={80} />
                </List.Item>
              </Col>
            </Row>
          )
        }}
      />
    );
  }
}

export default Quizes;
