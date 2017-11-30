import React, { Component } from 'react';
import Home from './Home.js';
import 'antd/dist/antd.css';
import './App.css';

class Game extends Component {
  constructor(props){
    super(props)
    this.state={
      streakBar: 0,
      progressBar: [],
      // result: false
    }
  }

  checkAnswer(choice, answer) {
    const currentProgressBar = this.state.progressBar;

    choice===answer? this.updateStreakBar() && currentProgressBar.push(true):this.resetStreakBar() && currentProgressBar.push(false);

  }
  resetStreakBar(){
    this.setState(({streakBar})=>({streakBar: 0}));
  }
  updateStreakBar(){
    this.setState(({streakBar})=>({streakBar: this.state.streakBar +1 }));
  }
  render() {
    return (
      <Home onCardClick={(choice, answer)=>this.checkAnswer(choice, answer)} value={this.state.streakBar} progressBar={this.state.progressBar} />
    );
  }
}

export default Game;
