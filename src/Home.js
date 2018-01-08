import React, { Component } from 'react';
import CreateQuiz from './CreateQuiz';
import Quizes from './Quizes';

class Home extends Component {
  constructor(props){
    super();
    this.state ={
      results:[],
      categories:[]
    }
  }
  onFetchCategories = (data) => {
    this.setState({categories: data.trivia_categories});
  }
  componentDidMount(){
    fetch('https://opentdb.com/api_category.php').then(response => response.json()).then(this.onFetchCategories)
  }

  render(){
    return (<div>
      <CreateQuiz history={this.props.history}/>
      <Quizes/>
    </div>
    );
  }
}

export default Home;
