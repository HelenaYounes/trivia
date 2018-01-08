import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Progress, Rate } from 'antd';
import Score from './Score.js';
import shuffle from 'shuffle-array';
import InnerHTML from 'dangerously-set-inner-html';

class Quiz extends Component {
  constructor(props){
    const { quizId } = props.match.params;
    super()
    this.state={
      questions: JSON.parse(window.localStorage.getItem(quizId)),
      streakBar: 0,
      progressBar: [],
    }
  }

  check = (choice, answer) => {
    const { id, quizId } = this.props.match.params;
    const currentQuest = this.state.questions[Number(id)];
    const nextQuest =  Number(id)+1;
    currentQuest.choice = choice;
    currentQuest.correct = choice === answer
    // const resultsBar = this.state.progressBar;
    // resultsBar = resultsBar.push(currentQuest.correct)
    this.setState({ questions: this.state.questions}, (() => {
      window.localStorage.setItem(quizId, JSON.stringify(this.state.questions))
    }));

    this.checkScoreAnswer(choice, answer);
    alert(`you picked ${choice}, the correct answer is ${answer}`)
    // this.props.history.push(`/quizzes/${quizId}/questions/${nextQuest}`)
  }

  onFetchQuestions = (data) => {
    this.setState({questions: data.results});
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
    const currentQuestion = Number(match.params.id);
    const prevQuestion = currentQuestion - 1;
    const nextQuestion = currentQuestion + 1;
    const lastQuestion = this.state.questions.length - 1;
    const quiz = this.state.questions[currentQuestion]
    const title = quiz.question;
    const choices = shuffle(quiz.incorrect_answers.concat(quiz.correct_answer));
    const answer = quiz.correct_answer;
    return (
      <div className='quiz-content'>
        <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
        {
          (this.state.questions[currentQuestion].choice && (this.state.questions[currentQuestion].choice === this.state.questions[currentQuestion].correct_answer) ) &&  <Progress type="circle" percent={100} width={15} status= "success"/>
          }

        <Card
            className='quiz-card'
            match={match}
            title={<InnerHTML html={title}/>}
          >
              {choices.map((choice, i) => {
                return <Button
                  key={i}
                  disabled={!!quiz.choice}
                  onClick={()=>this.check(choice, answer)}
                  style={{display:'block'}}
                  size="large"
                >
                  <InnerHTML html={choice}/>
                  {(choice === quiz.choice) && (
                    quiz.choice === answer?
                    <Progress key={i} type="circle" percent={100} width={15} status="success"/>:<Progress key={i} type="circle" percent={100} width={15} status="exception"/>
                  )}
                </Button>})
              }
          </Card>
        <div className='switch-question-buttons'>
          {prevQuestion >= 0 && (
            <Link to={`/quizzes/${quizId}/questions/${prevQuestion}`}>
              <Button icon='step-backward'/>
            </Link>)
          }
          {nextQuestion <= lastQuestion && (
            <Link to={`/quizzes/${quizId}/questions/${nextQuestion}`}>
              <Button icon='step-forward'/>
            </Link>)
          }
        </div>
      </div>
    )
  }
}

export default Quiz;
