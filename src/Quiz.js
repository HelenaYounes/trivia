import React from 'react';
import { Card, Radio } from 'antd';
import shuffle from 'shuffle-array';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Quiz = ({ quiz,  disabledQuest, match, onClick }) => {
  const title = quiz.question;
  const choices = shuffle(quiz.incorrect_answers.concat(quiz.correct_answer));
  const answer = quiz.correct_answer;

  return <Card
      className='quiz-card'
      match={match}
      title={title}
    >
      <RadioGroup defaultValue="a">
        {choices.map((choice, i) => {
          return <RadioButton
            key={i}
            disabled={disabledQuest}
            onClick={()=>onClick(choice, answer)}
            style={{display:'block'}}
            value={choice}>{choice}
          </RadioButton>})
        }
      </RadioGroup>
    </Card>
}

export default Quiz;
