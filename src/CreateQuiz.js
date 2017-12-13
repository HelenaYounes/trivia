import React, { Component} from 'react';
import CategorySelect from './CategorySelect';
import uuid from 'uuid';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const handleChange = (value) => {
  this.props.form.setFieldsValue('category')
  console.log(`selected ${value}`)
}

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form} = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new quiz"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Trivia Category">
            {getFieldDecorator('category', {
              initialValue:'Any',
              rules: [{ required: false, message: 'Please input a trivia category!' }],
            })(
              <CategorySelect />
            )}
          </FormItem>
          <FormItem label="Question type">
            {getFieldDecorator('question-type', {
              initialValue:'Any'
            })(
            <Select>
              <Option value="Multiple Choice">Multiple Choice</Option>
              <Option value="True / False">True / False</Option>
            </Select>)
            }
          </FormItem>
          <FormItem label="Question difficulty">
            {getFieldDecorator('question-difficulty', {
              initialValue:'Any'
            })(
            <Select>
              <Option value="Easy">Easy</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Hard">Hard</Option>
            </Select>)
            }
          </FormItem>
          <FormItem label="Number of questions">
            {getFieldDecorator('total-questions', {
              initialValue: '10',
            })(<Input/>)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class CreateQuiz extends Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  onFetchQuestions = (data) => {
    debugger;
    const quizId = uuid.v4();
    window.localStorage.setItem(quizId, JSON.stringify(data.results));
    this.props.history.push(`/quizzes/${quizId}/questions/0`)
    // this.form.resetFields();
    // this.setState({ visible: false });
  }

  handleCreate = () => {
    this.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      fetch(`https://opentdb.com/api.php?amount=10&category=${values.category}`)
        .then(response => response.json())
        .then(this.onFetchQuestions)
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create New Quiz</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CreateQuiz;
