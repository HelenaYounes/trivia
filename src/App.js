import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
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
          <Row>
            <Col span={12}>
              <Link to='/'><h1 className="App-title" style={{color:'white'}}>Trivia</h1></Link>
            </Col>
            <Col offset={8} span={4}>
              <CreateQuiz history={this.props.history}/>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={18} offset={3}>
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
