import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './App.scss';

@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <div styleName="app">
        <div styleName="board"></div>
        <aside>
          <div styleName="throne-token"></div>
          <div styleName="blade-token"></div>
          <div styleName="raven-token"></div>
        </aside>
      </div>
    );
  }
}

export default App;
