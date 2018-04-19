import * as QuizActionTypes from '../actionTypes/quiz';

const initialState = {
  quizes: JSON.parse(window.localStorage.getItem('quizes')) || {}
}

export default function Quiz(state=initialState, action){
  switch(action.type) {
    case QuizActionTypes.ADD_QUIZ:
      return Object.assign({}, state, {
        quizes: action.quizes
      })  
    default:
      return state;
  }
}
