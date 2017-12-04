import React, { Component } from 'react';
import { Card } from 'antd';
import Question from './Question.js';

import Quiz from './Quiz.js';


class Quizzes extends Component {
  constructor(props){
    super()
    this.state={
      results:[]
    }
  }
  onFetchQuestions = (data) => {
    this.setState({results: data.results});
  }

  componentDidMount(){
    this.fetchCategories(this.props.match.params.id)
  }

  fetchCategories(categoryId) {
    fetch('https://opentdb.com/api.php?amount=5&category='+categoryId)
      .then(response => response.json())
      .then(this.onFetchQuestions)
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id !== prevProps.match.params.id
    if (newId) {
      this.fetchCategories(this.props.match.params.id)
    }
  }

  render(){
    const { match } = this.props;
    const category = match.params.id;
    return this.state.results.map((result, i)=> (
      <Quiz key={category+i} quiz={result} />
    ));
  }
}

export default Quizzes;
