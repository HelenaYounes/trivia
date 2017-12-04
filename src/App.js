import React, { Component } from 'react';
import { Button, Icon, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import CategoryList from './CategoryList.js';
import Quizzes from './Quizzes.js';
import Quiz from './Quiz.js';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <div className='App-header'>

            <h1 className="App-title" style={{color:'white'}}>Trivia</h1>
            <div className="social-media-icons">
              <SocialIcon url="http://twitter.com"/>
              <SocialIcon url="http://facebook.com"/>
              <SocialIcon url="http://linkedin.com"/>
            </div>
          </div>
        </Header>
        <Content>
          <Router>
            <div>
              <CategoryList />
              <Switch>
                <Route path='/quiz/:id' component={Quizzes} />
              </Switch>
            </div>
          </Router>
        </Content>
      </Layout>
    );
  }
}

export default App;
