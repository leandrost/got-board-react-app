import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './app.scss';

@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <div styleName="app">
        <div styleName="board">
        </div>
        <aside>
          <div styleName="iron-throne-token"></div>
          <div styleName="valyrian-steel-blade-token"></div>
          <div styleName="mensseger-raven-token"></div>
          <div styleName="wilding-threat-token"></div>
          <div styleName="round-marker"></div>
          { this.renderFactions() }
          <div>
            { this.renderGarrisons() }
          </div>
        </aside>
      </div>
    );
  }

  renderFactions() {
    const factions = [
      "baratheon",
      "lannister",
      "stark",
      "greyjoy",
      "tyrell",
      "martell"
    ];
    return factions.map(faction => {
      return (
        <div>
          <div styleName={`${faction}-influence-token`}></div>
          <div styleName={`${faction}-supply-token`}></div>
          <div styleName={`${faction}-victory-token`}></div>
          <div styleName={`${faction}-power-token`}></div>
          <div styleName={`${faction}-footman`}></div>
          <div styleName={`${faction}-knight`}></div>
          <div styleName={`${faction}-ship`}></div>
          <div styleName={`${faction}-siege-engine`}></div>
        </div>
      );
    });
  }

  renderGarrisons() {
    const garrisons = [
      "dragonstone",
      "highgarden",
      "lannisport",
      "pyke",
      "sunspear",
      "winterfell",
    ];

    return garrisons.map(garrison => {
      return (<div styleName={`garrison-${garrison}`}></div>);
    });
  }
}

export default App;
