import React, { Component } from 'react';
import { Icon, Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Quiz from './Quiz.js';
import CreateQuiz from './CreateQuiz.js';
import Home from './Home.js';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <div className='App-header'>
            <Icon type="bars" style={{fontSize: 20, color:'white'}}/>
            <Link to='/'><h1 className="App-title" style={{color:'white'}}>Trivia</h1></Link>
            <CreateQuiz history={this.props.history}/>
          </div>
        </Header>
        <Content>
          {/* <div className='App-content' > */}
            <Switch>
              <Route path='/quizzes/:quizId/questions/:id' component={Quiz} />
              <Route path='/' component={Home} />
            </Switch>
          {/* </div> */}
        </Content>
      </Layout>
    );
  }
}

const routes = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
)



export default routes;
