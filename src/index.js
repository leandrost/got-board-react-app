import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import 'xray-react/lib/xray-react-ui';

import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import './index.scss';

if (!window.location.host.startsWith('local')) {
  Raven.config('https://abfdfecaed9e4bff9ccaa89645dcdd61@sentry.io/217779', {
  })
  .install();
}

const rootElement = document.getElementById('root');

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}

render(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

