import React, { Component } from 'react';
import { Card, Radio } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import Quiz from './Quiz.js';
const Button = Radio.Button;

const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}

class QuizesList extends Component {
  constructor(props){
    super();
    this.state ={
      results:[]
    }
  }
  onFetchQuiz = (data) => {
    this.setState({results: data.results});
  }
  componentDidMount(){
    fetch('https://opentdb.com/api.php?amount=10&category=25').then(response => response.json()).then(this.onFetchQuiz)
  }

  getOptions = (wrg, cor) => {
    return wrg.concat(cor)
  }
  render(){
    const { match, } = this.props;
    return (this.state.results.map((result) => { return (<Quiz quiz={result}/>)}))}
  }

export default QuizesList;
