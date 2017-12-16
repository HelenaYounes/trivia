import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Score from './Score.js';
import Quiz from './Quiz.js';

class Quizzes extends Component {
  constructor(props){
    const { quizId } = props.match.params;
    super()
    this.state={
      questionsData: JSON.parse(window.localStorage.getItem(quizId)),
      disabledQuestion:false,
      streakBar: 0,
      progressBar: [],
    }
  }

  check = (choice, answer) => {
    this.checkScoreAnswer(choice, answer);
    this.setState({disabledQuestion: !this.state.disabledQuestion});
  }

  onFetchQuestions = (data) => {
    this.setState({questionsData: data.results});
  }

  checkScoreAnswer = (choice, answer) => {
    choice===answer? this.updateProgressBar():this.resetStreakBar();
  }

  resetStreakBar = ()=>{
    const currentProgressBar = this.state.progressBar;
    this.setState(({streakBar})=>({streakBar: 0}));
    currentProgressBar.push(false)
    this.setState(({progressBar})=>({progressBar: currentProgressBar}));
  }
  updateStreakBar = ()=>{
    this.setState(({streakBar})=>({streakBar: this.state.streakBar +1 }));
  }

  updateProgressBar = ()=>{
    const currentProgressBar = this.state.progressBar;
    currentProgressBar.push(true)
    this.setState(({progressBar})=>({progressBar: currentProgressBar}));
    this.updateStreakBar();
  }

  render(){
    const { match } = this.props;
    const quizId = match.params.quizId;
    const idquest = Number(match.params.id);
    const prevQuestion = idquest - 1;
    const nextQuestion = idquest + 1;
    const lastQuestion = this.state.questionsData.length - 1;

    return (
      <div className='quiz-content'>
        <Quiz
          match={match}
          quiz={this.state.questionsData[idquest]}
          currentQuestionIndex={idquest}
          disabledQuest={this.state.disabledQuestion}
          onClick={(choice, answer)=>this.check(choice, answer)}
        />
        <div className='switch-question-buttons'>
          {prevQuestion >= 0 && (
            <Link to={`/quizzes/${quizId}/questions/${prevQuestion}`}>
              <Button icon='step-backward'/>
            </Link>)
          }
          {nextQuestion < lastQuestion && (
            <Link to={`/quizzes/${quizId}/questions/${nextQuestion}`}>
              <Button icon='step-forward' onClick={()=>this.setState({disabledQuestion: false})}/>
            </Link>)
          }
        </div>
        <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
      </div>
    )
  }
}

export default Quizzes;
