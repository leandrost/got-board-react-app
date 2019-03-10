import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Raven from 'raven-js';

import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Games from './components/game/Games';

import 'semantic-ui-css/semantic.min.css'
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
      <BrowserRouter>
        {/* <App /> */}
        <Games />
      </BrowserRouter>
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
