import React, { Component } from 'react';
import Home from './Home.js';
import 'antd/dist/antd.css';
import './App.css';

class Game extends Component {
  constructor(props){
    super(props)
    this.state={
      streakBar: 0,
      // progressBar: [true, false],
      // result: false
    }
  }

  checkAnswer(choice, answer) {

    choice===answer? this.updateStreakBar():this.resetStreakBar();

  }
  resetStreakBar(){
    this.setState(({streakBar})=>({streakBar: 0}));
  }
  updateStreakBar(){
    this.setState(({streakBar})=>({streakBar: this.state.streakBar +1 }));
  }
  // ProgBar(){
  //   const currentProgressBar = this.state.progressBar;
  //   currentProgressBar.push(true)
  //   this.setState(({progressBar})=>({progressBar: currentProgressBar}));
  // }
  render() {
    return (
      <Home onCardClick={(choice, answer)=>this.checkAnswer(choice, answer)} value={this.state.streakBar}  />
    );
  }
}

export default Game;
