import React, { Component } from 'react';
import QuizList from './QuizList';

export default class Home extends Component {
  constructor(props){
    super()
  }


  state = {
    quizes: JSON.parse(window.localStorage.getItem('quizes')) || {}
  }
  deleteQuiz = (quizId) => {
    const quizes = this.state.quizes ;
    delete quizes[quizId];
    this.setState({ quizes: quizes }, () => {
      window.localStorage.setItem("quizes", JSON.stringify(this.state.quizes));
    })
  }
 render(){
   return (
     <QuizList list={this.state.quizes} onDelete = {(quizId) => this.deleteQuiz(quizId)}/>
   );
 }
}
