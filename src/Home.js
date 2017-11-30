import React, { Component } from 'react';
import { Card, Input, Progress, Radio, Rate } from 'antd';
import allQuizes from './allQuizes';
import 'antd/dist/antd.css';
import './App.css';

class Home extends Component {
  render() {
    const {onCardClick, progressBar, value} = this.props;
    const quizList = allQuizes;
    return (
      <div className='home'>
        <Search
          className='Search-bar'
          placeholder="input search text"
          onSearch={value => console.log(value)}
        />
        <div className='gameboard'>
          <div className='quizList'>
            {quizList.map(({question, answer, choices, index}) => {
              return (<Card
                  className='Card'
                  key={index}
                  title={question}
                >
                { choices.map((choice)=> { return <Radio className='quizChoices' onClick={()=>
                  onCardClick(choice, answer)}>{choice}</Radio>})}
                </Card>)
              }
            )}
          </div>
          <div className="progress-bar">
            {progressBar.map((result)=>(<Progress type="circle" percent={100}/>))}
          </div>
          <Rate value={value}/>
        </div>
      </div>
    );
  }
}

export default Home;
