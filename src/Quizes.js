import { Col, Row } from 'antd';
import { toPairs } from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Quizes extends Component {
  render(){
    const quizes = JSON.parse(window.localStorage.getItem("quizes"));
    const list = toPairs(quizes);
    return(
      <div>
        { list.map(([quizId, questions]) => {
          const question = questions[0];
          const category = question.category;
          const score = questions.filter(question => question.choice === question.correct_answer).length / questions.length;
          const unanswered = questions.length - questions.filter(question => question.choice).length;
          return (
            <Link key={quizId} to={`/quizzes/${quizId}/questions/0`}>
            <Row>
              <Col span={12}>{category}</Col>
              <Col span={12}>{`Score: ${score}`}</Col>
            </Row>
            <Row>
              <Col span={12}/>
              <Col span={12}>{`You have ${unanswered} question left`}</Col>
            </Row>
          </Link>)})
        }
      </div>
    );
  }
}

export default Quizes;
