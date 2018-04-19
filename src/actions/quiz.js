import * as QuizActionTypes from '../actionTypes/quiz';

export const addQuiz = quizId => {
  return {
    type: QuizActionTypes.ADD_QUIZ,
    quizId
  };
};
