import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Score from './Score.js';
import Quiz from './Quiz.js';

class Quizzes extends Component {
  constructor(props){
    super()
    this.state={
      questionsData:[
        {
          category: "Entertainment: Books",
          type:"multiple",
          difficulty:"easy",
          question:"George Orwell wrote this book, which is often considered a statement on government oversight.",
          correct_answer:"1984",
          incorrect_answers:["The Old Man and the Sea","Catcher and the Rye","To Kill a Mockingbird"]
        },
        {
          category: "Entertainment: Books",
          type:"multiple",
          difficulty:"easy",
          question:"George Orwell wrote this book, which is often considered a statement on government oversight.",
          correct_answer:"1984",
          incorrect_answers:["The Old Man and the Sea","Catcher and the Rye","To Kill a Mockingbird"]
        }],
      disabledQuestion:false,
      streakBar: 0,
      progressBar: [],
    }
  }

  check = (choice, answer) => {
    this.checkScoreAnswer(choice, answer);
  }


  onFetchQuestions = (data) => {
    this.setState({questionsData: data.results});
    // window.localStorage.setItem()
  }

  componentWillMount(){
    this.fetchCategories(this.props.match.params.categoryId)
  }

  fetchCategories(id) {
    fetch(`https://opentdb.com/api.php?amount=10&category=${id}`)
      .then(response => response.json())
      .then(this.onFetchQuestions)
  }

  componentDidUpdate(prevProps) {
    const newCatId = this.props.match.params.categoryId !== prevProps.match.params.categoryId;
    if (newCatId) {
      this.fetchCategories(this.props.match.params.categoryId);
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
    const categoryId = match.params.categoryId;
    const quizId = match.params.quizId;
    let idquest = Number(match.params.id);

    return (
      <div className='quiz-content'>
        <Quiz
            match={match}
            categoryId={categoryId}
            quiz={this.state.questionsData[idquest]}
            currentQuestionIndex={idquest}
            disabledQuest={this.state.disabledQuestion}
            onClick={(choice, answer)=>this.check(choice, answer)}
          />
          <div className='switch-question-buttons'>
            <Link to={`/categories/${categoryId}/quizzes/${quizId}/questions/${idquest - 1}`}>
              <Button icon='step-backward'/>
            </Link>
            <Link to={`/categories/${categoryId}/quizzes/${quizId}/questions/${idquest + 1}`}>
              <Button icon='step-forward'/>
            </Link>
          </div>
        <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
      </div>)
          }
}

export default Quizzes;
