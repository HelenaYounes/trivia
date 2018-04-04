import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Icon} from 'antd';
import cx from 'classnames';

const Meta = Card.Meta;

const Question = (props) => {
  const {quizId, id} = props.match.params;
  const quizes = JSON.parse(window.localStorage.getItem('quizes'));
  const questions = quizes[quizId];
  const questionIndex = Number(id);
  const currentQuestion = questionIndex>= questions.length? questions[questionIndex - 1]: questions[questionIndex];
  const prevQuestion = questionIndex - 1;
  const nextQuestion = questionIndex + 1;
  const lastQuestion = questions.length - 1;
  const title = currentQuestion.question;
  const choices = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort(([a], [b]) => a > b);
  const answer = currentQuestion.correct_answer;
  const hasChoice = currentQuestion.choice;
  const totalQuestions = questions.length;
  const score = questions.filter(question=> (question.choice && question.choice === question.correct_answer)).length;

  const check = (choice, answer) => {
    (currentQuestion.choice)? alert("You have already answered the question"):checkAnswer(choice, answer);
    window.localStorage.setItem("quizes", JSON.stringify(quizes));
  }

  const checkAnswer = (choice, answer) => {
    currentQuestion.choice = choice;
    choice === answer? alert("right answer"):alert(`wrong, correct answer: ${answer}`)
  }

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
            </Link>,
            <Link to={`/quizes/${quizId}/questions/${nextQuestion}`}>
              {nextQuestion <= lastQuestion && (<Button icon='step-forward'/>)}
            </Link>
          ]}
        >
          <h2 dangerouslySetInnerHTML={{__html: `${currentQuestion + 1}. ${title}` }} />
          {choices.map((choice, i) => {
            const showCorrect = (hasChoice && choice === answer);

            return (
              <a key={i}
                onClick={() => check(choice, answer)}
              >
                <Card
                  hoverable={!hasChoice}
                  className={cx({ correct: showCorrect, incorrect: hasChoice && (currentQuestion.choice===choice) })}
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
            );
          })}
        </Card>
      </div>
    );
}

export default Question;
