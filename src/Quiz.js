import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, message, Progress, Radio} from 'antd';
import shuffle from 'shuffle-array';
import InnerHTML from 'dangerously-set-inner-html';

const RadioGroup = Radio.Group;
const radioStyle = Radio.Style;

class Quiz extends Component {
  constructor(props){
    const { quizId } = props.match.params;
    const quizes = JSON.parse(window.localStorage.getItem("quizes"));
    const questions = quizes[quizId];

    super()
    this.state = {
      questions,
    }
  }


  check = (choice, answer) => {
    const { id, quizId } = this.props.match.params;
    const currentQuest = this.state.questions[Number(id)];
    currentQuest.choice = choice;
    this.setState({ questions: this.state.questions}, (() => {
      const quizes = JSON.parse(window.localStorage.getItem("quizes")) || {};
      quizes[quizId] = this.state.questions;

      window.localStorage.setItem("quizes", JSON.stringify(quizes));
      message.success(`correct answer: ${answer}`, 2)

    }));
  }

  onFetchQuestions = (data) => {
    this.setState({questions: data.results});
  }

  render(){
    const { match } = this.props;
    const quizId = match.params.quizId;
    const currentQuestion = Number(match.params.id);
    const prevQuestion = currentQuestion - 1;
    const nextQuestion = currentQuestion + 1;
    const lastQuestion = this.state.questions.length - 1;
    const quiz = this.state.questions[currentQuestion]
    const title = quiz.question;
    const choices = shuffle(quiz.incorrect_answers.concat(quiz.correct_answer));
    const answer = quiz.correct_answer;
    const answered = this.state.questions.filter((question) => question.choice).length;
    return (
      <div className='quiz-content'>
          <Progress percent={(answered / this.state.questions.length)*100} />
        <Card
            className='quiz-card'
            match={match}
            title={<InnerHTML html={title}/>}
          >
            <RadioGroup>
              {choices.map((choice, i) => {
                return <Radio style={radioStyle} key={i} value={choice} onClick={()=>this.check(choice, answer)}>
                    <InnerHTML html={choice}/>
                    {quiz.choice === choice && <Progress type="circle" percent={100} width={15} status={(quiz.choice === quiz.correct_answer)?"success":"exception"}/>
                    }
                  </Radio>
                })
              }
            </RadioGroup>
          </Card>
        <div className='switch-question-buttons'>
          {prevQuestion >= 0 && (
            <Link to={`/quizzes/${quizId}/questions/${prevQuestion}`}>
              <Button icon='step-backward'/>
            </Link>)
          }
          {nextQuestion <= lastQuestion && (
            <Link to={`/quizzes/${quizId}/questions/${nextQuestion}`}>
              <Button icon='step-forward'/>
            </Link>)
          }
        </div>
      </div>
    )
  }
}

export default Quiz;
