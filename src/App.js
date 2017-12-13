import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import Quizzes from './Quizzes.js';
import Home from './Home.js';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
      <Layout>
        <Header>
          <div className='App-header'>
            <p>categories</p>
            <h1 className="App-title" style={{color:'white'}}>Trivia</h1>
            <div className="social-media-icons">
              <SocialIcon url="http://twitter.com"/>
              <SocialIcon url="http://facebook.com"/>
              <SocialIcon url="http://linkedin.com"/>
            </div>
          </div>
        </Header>
        <Content>
            <div className='App-content' >
              <Switch>
                <Route path='/quizzes/:quizId/questions/:id' component={Quizzes} />
                <Route path='/' component={Home} />
              </Switch>
            </div>
        </Content>
      </Layout>
    </Router>
    );
  }
}

export default App;
