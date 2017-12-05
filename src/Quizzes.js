import React, { Component } from 'react';
import Quiz from './Quiz.js';

class Quizzes extends Component {
  constructor(props){
    super()
    this.state={
      questionsData:[],
      disabledQuestion:false,
    }
  }

  check = (choice, answer) => {
    const winningMes = (choice === answer)?'yes':'no';
    this.disableQuestion(winningMes);

  }
  onFetchQuestions = (data) => {
    this.setState({questionsData: data.results});
  }

  componentDidMount(){
    this.fetchCategories(this.props.match.params.id)
  }

  fetchCategories(categoryId) {
    fetch('https://opentdb.com/api.php?amount=5&category='+categoryId)
      .then(response => response.json())
      .then(this.onFetchQuestions)
  }

  disableQuestion = (winningMes) => {
    this.setState({disabledQuestion: true});
    alert(winningMes);
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
    return this.state.questionsData.map((result, i)=> (
      <Quiz key={category+i} quiz={result} disabled={this.state.disabledQuestion} onClick={(choice, answer)=>this.check(choice, answer)}/>
    ));
  }
}

export default Quizzes;
