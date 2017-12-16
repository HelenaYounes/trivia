import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Radio } from 'antd';
import Score from './Score.js';
import shuffle from 'shuffle-array';
import InnerHTML from 'dangerously-set-inner-html';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Quiz extends Component {
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

  check = (choice, answer, quizId, idquest) => {
    this.checkScoreAnswer(choice, answer);
    // this.setState({disabledQuestion: !this.state.disabledQuestion});
    alert(`you picked ${choice}, the correct answer is${answer}`)
    this.props.history.push(`/quizzes/${quizId}/questions/${idquest + 1}`)
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
    const quiz = this.state.questionsData[idquest]
    const title = quiz.question;
    const choices = shuffle(quiz.incorrect_answers.concat(quiz.correct_answer));
    const answer = quiz.correct_answer;
    return (
      <div className='quiz-content'>
        <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
        <Card
            className='quiz-card'
            match={match}
            title={<InnerHTML html={title}/>}
          >
            <RadioGroup defaultValue="a">
              {choices.map((choice, i) => {
                return <RadioButton
                  key={i}
                  disabled={this.state.disabledQuestion}
                  onClick={()=>this.check(choice, answer, quizId, idquest)}
                  style={{display:'block'}}
                  value={choice}
                >
                  {<InnerHTML html={choice}/>}
                </RadioButton>})
              }
            </RadioGroup>
          </Card>
        <div className='switch-question-buttons'>
          {prevQuestion >= 0 && (
            <Link to={`/quizzes/${quizId}/questions/${prevQuestion}`}>
              <Button icon='step-backward'/>
            </Link>)
          }
          {nextQuestion <= lastQuestion && (
            <Link to={`/quizzes/${quizId}/questions/${nextQuestion}`}>
              <Button icon='step-forward' onClick={()=>this.setState({disabledQuestion: false})}/>
            </Link>)
          }
        </div>
      </div>
    )
  }
}

export default Quiz;
