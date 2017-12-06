import React, { Component } from 'react';
import { Card } from 'antd';
import{ Link } from 'react-router-dom';

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
    return (
      this.state.categories.map((category) => {
        return (
          <Link to={`/quiz/${category.id}`} key={category.id}>
            <Card title={category.name}/>
          </Link>
        )
      })
    );
  }
}

export default Home;
