import React, { Component } from 'react';
import { Icon, Layout, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Quiz from './Quiz.js';
import CreateQuiz from './CreateQuiz.js';
import Quizes from './Quizes.js';
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
          <Row>
            <Col span={18} offset={4}>
              <Switch>
                <Route path='/quizzes/:quizId/questions/:id' component={Quiz} />
                <Route path='/' component={Quizes} />
              </Switch>
            </Col>
          </Row>
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
