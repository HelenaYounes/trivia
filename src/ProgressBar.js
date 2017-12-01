import React, { Component } from 'react';
import { Progress } from 'antd';
class ProgressBar extends Component {
  render(){
    const {results}=this.props;
    return(
      results.map((result)=>{
        return <Progress type="circle" percent={100} width={15}/>
      })
    );
  }
}

export default ProgressBar;
