import React, { Component } from 'react';
import { Button, Icon, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import Game from './Game.js';
import Contact from './Contact.js';
import Quizzes from './Quizzes.js';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <div className='App-header'>
            <div className="App_menu">
              <Button type="primary" style={{ marginBottom: 16 }}>
                <Icon type='menu-unfold' />
              </Button>
              <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={false}
              >
                <Menu.Item key="1">
                  <span>Contact</span>
                </Menu.Item>
              </Menu>
            </div>
            <h1 className="App-title" style={{color:'white'}}>Some Title</h1>
            <div className="social-media-icons">
              <SocialIcon url="http://twitter.com"/>
              <SocialIcon url="http://facebook.com"/>
              <SocialIcon url="http://linkedin.com"/>
            </div>
          </div>

        </Header>
        <Content>
          <Router>
            <Switch>
              <Route exact path='/' component={Game} />
              <Route exact path='/contact' component={Contact} />
              <Route path='/quiz/:quizId' component={Quizzes}/>
            </Switch>
          </Router>
        </Content>
      </Layout>
    );
  }
}

export default App;
