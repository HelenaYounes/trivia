import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
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
    const { match, } = this.props;
    const menu =(
      <Menu>
        {this.state.categories.map((category) => {
          return (
            <Menu.Item key={category.id}>
              <Link to={`/quiz/${category.id}`}>
                {category.name}
              </Link>
            </Menu.Item>)
          })
        }
      </Menu>)
    return (<div>
      <Dropdown overlay={menu} >
        <a className="ant-dropdown-link" href="#">
          Categories <Icon type="down" />
        </a>
      </Dropdown>
    </div>)
    }
  }

export default CategoryList;
