import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const Contact = () => {
  return (
    <div className='card'>
      <Card
        title="Contact"
        style={{ width: 300}}
      >
        <p>Card content</p>
      </Card>
    </div>
  );
}

export default Contact;
