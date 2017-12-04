import React, { Component } from 'react';
import { Card, Dropdown, Icon, Input, Menu, Radio } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import Quiz from './Quiz.js';

const check = (choice, answer) => {
  const winningMsg = choice === answer? 'yes': 'no'
  return alert(winningMsg);
}

class CategoryList extends Component {
  constructor(props){
    super();
    this.state ={
      results:[],
      categories:[]
    }
  }
  onFetchCategories = (data) => {
    debugger;
    this.setState({categories: data.trivia_categories});
  }
  componentDidMount(){
    fetch('https://opentdb.com/api_category.php').then(response => response.json()).then(this.onFetchCategories)
  }

  render(){
    const { match, } = this.props;
    const menu =(<Menu>
      {this.state.categories.map((category) => {
        return (<Menu.Item key={category.id}>
          <Link to={`/quiz/${category.id}`}>
            {category.name}
          </Link>
        </Menu.Item>)})}
      </Menu>)

    return (<div>
      <Dropdown overlay={menu} >
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>
      </Dropdown>
    </div>)
    }
  }

export default CategoryList;
