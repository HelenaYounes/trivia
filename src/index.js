import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import QuizReducer from './reducers/quiz';
import './index.css';
import App from './App';

const store = createStore(
  QuizReducer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
