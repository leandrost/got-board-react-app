import { createStore, applyMiddleware }  from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import fetcher from './middlewares/fetcher';
import normalizer from './middlewares/normalizer';

const middlewares = applyMiddleware(
  thunk,
  logger,
  fetcher({
    // host: process.env.API_HOST,
    host: 'http://192.168.1.120:3000',
    //host: 'https://got-board-api.herokuapp.com/',

    headers: {
      'Content-Type': 'application/json',
    },
  }),
  normalizer,
);

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlewares,
);
