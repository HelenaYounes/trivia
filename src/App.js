import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Question from './Question.js';
import CreateQuiz from './CreateQuiz.js';
import Home from './Home.js';
import 'antd/dist/antd.css';
import './App.css';
const { Header, Content } = Layout;

class App extends Component {
  state = {
    quizes: JSON.parse(window.localStorage.getItem('quizes')) || {}
  }
  deleteQuiz = (quizId) => {
    const quizes = this.state.quizes ;
    delete quizes[quizId];
    this.setState({ quizes: quizes }, () => {
      window.localStorage.setItem("quizes", JSON.stringify(this.state.quizes));
    })
  }

  saveAnswer = () => {
    const quizes = JSON.parse(window.localStorage.getItem('quizes'))
    this.setState({ quizes: quizes });
  }
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
                <Route path='/quizes/:quizId/questions/:id' render={(props) => (
                  <Question {...props} onAnswer={this.saveAnswer}/>
                )}/>
                <Route path='/' render={(props) => <Home {...props} list={this.state.quizes} onDelete={this.deleteQuiz}/>} />
              </Switch>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => (
  {
    quizes: state
  }
);

const routes = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
)



export default connect(mapStateToProps)(routes);
