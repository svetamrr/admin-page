import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from './../reducers';

const store = createStore(
  mainReducer,
  applyMiddleware(thunk)
);

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    // console.log('Store updated', store.getState());
  });
}

export default store;
