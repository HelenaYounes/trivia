import { List } from 'antd';
import { toPairs } from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Quizes extends Component {
  render(){
    const quizes = JSON.parse(window.localStorage.getItem("quizes"));
  return(
    <List
      itemLayout="horizontal"
      dataSource={toPairs(quizes)}
      renderItem={([quizId, questions]) => {
        const question = questions[0];
        const category = question.category;
        const score = questions.filter(question => question.choice === question.correct_answer).length / questions.length;
        const unanswered = questions.length - questions.filter(question => question.choice).length;
        return (
          <Link to={`/quizzes/${quizId}/questions/0`}>
            <List.Item>
              <List.Item.Meta
                title={category}
                description={`Score: ${score*100} ${unanswered} questions left`}
              />
            </List.Item>
          </Link>
        )
      }}
    />);
  }
}

export default Quizes;
