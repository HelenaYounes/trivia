import React, { Component } from 'react';
import { Progress } from 'antd';
class ProgressBar extends Component {
  render(){
    const {results}=this.props;
    return(
      results.map((result)=>{
         return result? <Progress type="circle" percent={100} width={15}/>:<Progress type="circle" percent={100} width={15} status="exception"/>
      })
    );
  }
}

export default ProgressBar;
