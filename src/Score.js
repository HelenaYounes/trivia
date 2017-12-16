import React, { Component } from 'react';
import { Rate } from 'antd';
import ProgressBar from './ProgressBar.js';

class Score extends Component {
  render(){
    const {streakBar, results}=this.props;
    return(<div className='scorebar'>
        <Rate value={streakBar}/>
        <ProgressBar results={results}/>
      </div>
    );
  }
}

export default Score;
