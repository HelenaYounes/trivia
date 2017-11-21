import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

class Home extends Component {
  render() {
    return (
    <div className='card'>
        <Card
          title="Card title"
          style={{ width: 300}}
        >
         <p>Card content</p>
        </Card>
    </div>
    );
  }
}

export default Home;
