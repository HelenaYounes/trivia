import React, { Component } from 'react';
import { Progress } from 'antd';
class ProgressBar extends Component {
  render(){
    const {results}=this.props;
    return(
      results.map((correct)=>{
        return  <Progress type="circle" percent={100} width={15} status={correct? "success":"exception"} />
      })
    );
  }
}

export default ProgressBar;
