import React from 'react';
import { Rate } from 'antd';
import ProgressBar from './ProgressBar.js';

const Score = () => {
    const {streakBar, results}=this.props;
    return(<div className='scorebar'>
        <Rate value={streakBar}/>
        <ProgressBar results={results}/>
      </div>
    );
}

export default Score;
