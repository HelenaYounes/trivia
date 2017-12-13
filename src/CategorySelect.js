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
    const { match, } = this.props;
    return <div>
      <Select onChange={this.handleChange}>
        {this.state.categories.map((category) => {
          return (
            <Option key={category.id} value={category.id}>
                {category.name}
            </Option>)
          })
        }
      </Select>
    </div>
  }
}

export default CategorySelect;
