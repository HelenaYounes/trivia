import React, { Component } from 'react';
import Score from './Score.js';
import Quiz from './Quiz.js';

class Quizzes extends Component {
  constructor(props){
    super()
    this.state={
      questionsData:null,
      disabledQuestion:false,
      currentQuestionIndex: 0,
      streakBar: 0,
      progressBar: [],
    }
  }

  check = (choice, answer) => {
    this.setState({currentQuestionIndex: this.state.currentQuestionIndex +1})
    this.checkScoreAnswer(choice, answer);
  }


  onFetchQuestions = (data) => {
    this.setState({questionsData: data.results});
  }

  componentDidMount(){
    this.fetchCategories(this.props.match.params.id)
  }

  fetchCategories(categoryId) {
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}`)
      .then(response => response.json())
      .then(this.onFetchQuestions)
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.match.params.id !== prevProps.match.params.id
    if (newId) {
      this.fetchCategories(this.props.match.params.id)
    }

  }
  checkScoreAnswer(choice, answer) {
    choice===answer? this.updateProgressBar():this.resetStreakBar();
  }
  
  resetStreakBar(){
    const currentProgressBar = this.state.progressBar;
    this.setState(({streakBar})=>({streakBar: 0}));
    currentProgressBar.push(false)
    this.setState(({progressBar})=>({progressBar: currentProgressBar}));
  }
  updateStreakBar(){
    this.setState(({streakBar})=>({streakBar: this.state.streakBar +1 }));
  }

  updateProgressBar(){
    const currentProgressBar = this.state.progressBar;
    currentProgressBar.push(true)
    this.setState(({progressBar})=>({progressBar: currentProgressBar}));
    this.updateStreakBar();
  }

  render(){
    const { match } = this.props;
    const category = match.params.id;

    return (
      <div>
        <div className='questions-content'>
          {
            this.state.questionsData && <Quiz categoryId={category} quiz={this.state.questionsData[this.state.currentQuestionIndex]} currentQuestionIndex={this.state.currentQuestionIndex} disabledQuest={this.state.disabledQuestion} onClick={(choice, answer)=>this.check(choice, answer)}/>
          }
        </div>
        <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
      </div>)
  }
}

export default Quizzes;
