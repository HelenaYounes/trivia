import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon} from 'antd';
import cx from 'classnames';

const Meta = Card.Meta;

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
    debugger
    const { id } = this.props.match.params;
    const currentQuest = this.state.questions[Number(id)];
    (currentQuest.choice)? alert('answered'):this.update(currentQuest, choice)
  }

   update = (currentQuest, choice) =>{
     const { quizId } = this.props.match.params;
     currentQuest.choice = choice;
     this.setState({ questions: this.state.questions}, (() => {
       const quizes = JSON.parse(window.localStorage.getItem("quizes")) || {};
       quizes[quizId] = this.state.questions;
       window.localStorage.setItem("quizes", JSON.stringify(quizes));
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
    const choices = quiz.incorrect_answers.concat(quiz.correct_answer).sort(([a], [b]) => a > b);
    const answer = quiz.correct_answer;
    const correct = this.state.questions.filter((question) => (question.choice === answer)).length;
    const hasChoice = quiz.choice;

    return(
      <div>
        <div className="score">{`${correct}/${this.state.questions.length}`}</div>
        <Card
          title={<h2 dangerouslySetInnerHTML={{__html: title }} />}
          actions={[
            <Link to={`/quizzes/${quizId}/questions/${prevQuestion}`}>
             {prevQuestion >= 0 && ( <Button icon='step-backward'/>)}
            </Link>, <Link to={`/quizzes/${quizId}/questions/${nextQuestion}`}>
              {nextQuestion <= lastQuestion && (<Button icon='step-forward'/>)}
            </Link>
          ]}
        >
          {choices.map((choice, i) => {
            const showCorrect = (hasChoice && choice === answer);

            return (
              <a key={i}
                onClick={()=>this.check(choice, answer)}
              >
                <Card
                  hoverable
                  className={cx({ correct: showCorrect, incorrect: hasChoice && (quiz.choice===choice) })}
                >
                  <Meta
                    avatar={(showCorrect && <Icon type="check"/>)}
                    title={(
                      <h3>
                        <div dangerouslySetInnerHTML={{__html: choice }} />
                      </h3>
                    )}
                  />
                </Card>
              </a>
            )
          })}
        </Card>
      </div>
    )
  }
}

export default Quiz;
