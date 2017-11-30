import React, { Component } from 'react';
import { Card, Input, Progress, Radio, Rate } from 'antd';
import allQuizes from './allQuizes.js';
import 'antd/dist/antd.css';
import './App.css';

const Search = Input.Search;

class Home extends Component {
  render() {
    const {onCardClick, value} = this.props;
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
                { choices.map((choice)=> { return <Radio className='quizChoices' onClick={()=>onCardClick(choice, answer)}>{choice}</Radio>})}
                </Card>)
              }
            )}
          </div>
          <Rate value={value}/>
        </div>
      </div>
    );
  }
}

export default Home;
