import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MainPage from './pages/MainPage';
import store from './store';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
      <MainPage />
    </Provider>,
  document.getElementById('root')
);

export default MainPage;
