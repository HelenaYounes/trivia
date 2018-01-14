import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Icon} from 'antd';
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
    const { id, quizId } = this.props.match.params;
    const quizes = this.getQuizes();
    const questions = quizes[quizId];
    const currentQuest = questions[Number(id)];

    if (currentQuest.choice) {
      return;
    }

    currentQuest.choice = choice;

    quizes[quizId] = questions;

    window.localStorage.setItem("quizes", JSON.stringify(quizes));
    this.setState({ questions: questions });
  }

   // update = (currentQuest, choice) => {
   //   const { quizId } = this.props.match.params;
   //   const quizes = this.getQuizes();
   //   const questions = this.getQuestions(quizId);
   //   currentQuest.choice = choice;
   //   quizes[quizId] = questions;
   //   window.localStorage.setItem("quizes", JSON.stringify(quizes));
   //   this.setState({ questions: questions})
   // }

   getQuizes = () => JSON.parse(window.localStorage.getItem("quizes")) || {};

   getQuestions = (quizId) => {
     const quizes = this.getQuizes();
     return quizes[quizId];
   }

  render(){
    const { match } = this.props;
    const quizId = match.params.quizId;
    const questions = this.getQuestions(quizId);
    const currentQuestion = Number(match.params.id);
    const prevQuestion = currentQuestion - 1;
    const nextQuestion = currentQuestion + 1;
    const lastQuestion = questions.length - 1;
    const quiz = questions[currentQuestion];
    const title = quiz.question;
    const choices = quiz.incorrect_answers.concat(quiz.correct_answer).sort(([a], [b]) => a > b);
    const answer = quiz.correct_answer;
    const hasChoice = quiz.choice;
    const totalQuestions = questions.length;
    const score = questions.filter(question=> (question.choice && question.choice === question.correct_answer)).length
    return(
      <div>

        <div className="score">
          {questions.map((question, i) => {
            return <Link key={i} to={`/quizes/${quizId}/questions/${i}`}>
              <div
                key={i}
                className={cx(
                  "dot",
                  {
                    current: currentQuestion === i,
                    incorrect: (question.choice && question.choice !== question.correct_answer),
                    correct: question.correct_answer === question.choice
                  }
                )}
              />
            </Link>
          })}
          <div>{`Score: ${score} / ${totalQuestions}`}</div>
        </div>
        { questions.filter(question=> (question.choice)).length === totalQuestions && <Alert message={`You have completed the quiz, your score: ${questions.filter(question=> (question.choice &&
          question.choice === question.correct_answer)).length}/${questions.length}`} type="success" />}
        <Card
          actions={[
            <Link to={`/quizes/${quizId}/questions/${prevQuestion}`}>
             {prevQuestion >= 0 && ( <Button icon='step-backward'/>)}
            </Link>, <Link to={`/quizes/${quizId}/questions/${nextQuestion}`}>
              {nextQuestion <= lastQuestion && (<Button icon='step-forward'/>)}
            </Link>
          ]}
        >
          <h2 dangerouslySetInnerHTML={{__html: `${currentQuestion + 1}. ${title}` }} />
          {choices.map((choice, i) => {
            const showCorrect = (hasChoice && choice === answer);

            return (
              <a key={i}
                onClick={()=>this.check(choice, answer)}
              >
                <Card
                  hoverable={!hasChoice}
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
