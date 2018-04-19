import React, { Component} from 'react';
import CategorySelect from './CategorySelect';
import uuid from 'uuid';
import { Button, message, Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
    const quizId = uuid.v4();
    const quizes = JSON.parse(window.localStorage.getItem("quizes")) || {};
    quizes[quizId] = data.results;
    window.localStorage.setItem("quizes", JSON.stringify(quizes));
    this.props.history.push(`/quizes/${quizId}/questions/0`);
    this.setState({ visible: false })
  }

  handleCreate = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      fetch(`https://opentdb.com/api.php?amount=${values.amount}&category=${values.category}&difficulty=${values.difficulty}&type=${values.type}`)
        .then(response => response.json())
        .then(data => new Promise((success, reject) => {
          switch (data.response_code) {
            case 1:
              reject({ field: 'amount', msg: 'Not enough questions for this category'});
              break;
            default:
              success(data);
          }
        }))
        .then(this.onFetchQuestions)
        .catch(({ msg, field }) => {
          message.error(msg);
        })
    });
  }

  render() {
    const { form} = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create New Quiz</Button>
        <Modal
          visible={this.state.visible}
          title="Create a new quiz"
          okText="Create"
          onCancel={this.handleCancel}
          onOk={this.handleCreate}
        >
          <Form layout="vertical">
            <FormItem label="Trivia Category">
              {getFieldDecorator('category', {
                initialValue: 20,
                rules: [{ required: true, message: 'Please input a trivia category!' }],
              })(
                <CategorySelect />
              )}
            </FormItem>
            <FormItem label="Question type">
              {getFieldDecorator('type', {
                initialValue:'multiple'
              })(
              <Select>
                <Option value="multiple">Multiple Choice</Option>
                <Option value="boolean">True / False</Option>
              </Select>)
              }
            </FormItem>
            <FormItem label="Question difficulty">
              {getFieldDecorator('difficulty', {
                initialValue:'easy'
              })(
              <Select>
                <Option value="easy">Easy</Option>
                <Option value="medium">Medium</Option>
                <Option value="hard">Hard</Option>
              </Select>)
              }
            </FormItem>
            <FormItem label="Number of questions">
              {getFieldDecorator('amount', {
                initialValue: '10',
              })(<Input/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CreateQuiz);
