import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;


class CategorySelect extends Component {
  constructor(props){
    super();
    this.state ={
      categories:[]
    }
  }
  onFetchCategories = (data) => {
    this.setState({categories: data.trivia_categories});
  }

  componentWillMount(){
    fetch('https://opentdb.com/api_category.php').then(response => response.json()).then(this.onFetchCategories)
  }

  handleChange = (value) => {
    this.props.onChange(value);
  };

  render(){
    return <div>
      <Select onChange={this.handleChange} value={this.props.value}>
        {this.state.categories.map((category) => {
          return (
            <Option value={category.id} key={category.id} >
                {category.name}
            </Option>)
          })
        }
      </Select>
    </div>
  }
}

export default CategorySelect;
