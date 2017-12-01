import React, { Component } from 'react';
import Home from './Home.js';
import Score from './Score.js';
import { Progress, Input } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const Search = Input.Search;

class Game extends Component {
  constructor(props){
    super(props)
    this.state={
      streakBar: 0,
      progressBar: [true],
      // result: false
    }
  }

  checkAnswer(choice, answer) {
    const results = this.state.progressBar;

    choice===answer? this.updateProgressBar():this.resetStreakBar();

  }
  resetStreakBar(){
    this.setState(({streakBar})=>({streakBar: 0}));
  }
  updateStreakBar(){
    this.setState(({streakBar})=>({streakBar: this.state.streakBar +1 }));
  }

  updateProgressBar(){
    debugger;
    const currentProgressBar = this.state.progressBar;
    currentProgressBar.push(true)
    this.setState(({progressBar})=>({progressBar: currentProgressBar}));
  }
  render() {
    return (
    <div>
      <Search
        className='Search-bar'
        placeholder="input search text"
        onSearch={value => console.log(value)}
      />
      <Score streakBar={this.state.streakBar} results={this.state.progressBar}/>
      <Home onCardClick={(choice, answer)=>this.checkAnswer(choice, answer)} />
    </div>
    );
  }
}

export default Game;
