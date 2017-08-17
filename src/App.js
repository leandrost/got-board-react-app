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
          <div styleName="iron-throne-token"></div>
          <div styleName="valyrian-steel-blade-token"></div>
          <div styleName="mensseger-raven-token"></div>
          <div styleName="wilding-threat-token"></div>
        </aside>
      </div>
    );
  }
}

export default App;
