import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { droppable } from './decorators';

import Board from './board/Board';
import WarRoom from './war-room/WarRoom';

import styles from './app.scss';

function DnDBackend()
{
  const is_touch_device = 'ontouchstart' in window || navigator.maxTouchPoints;
  if (is_touch_device) {
    return TouchBackend;
  }
  return HTML5Backend;
}

@DragDropContext(DnDBackend())
@droppable("war-room")
@CSSModules(styles)
class App extends Component {
  drop(monitor) {
    return monitor.getDropPosition();
  }

  render() {
    return this.props.connectDropTarget(
      <div styleName="app">
        <Board />
        <aside>
          <div styleName="iron-throne-token"></div>
          <div styleName="valyrian-steel-blade-token"></div>
          <div styleName="mensseger-raven-token"></div>
          <div styleName="round-marker"></div>
          { this.renderFactions() }
          <div>
            { this.renderGarrisons() }
          </div>
        </aside>
				<WarRoom />
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
        <div key={faction}>
          <div styleName={`${faction}-supply-token`}></div>
          <div styleName={`${faction}-victory-token`}></div>
          <div styleName={`${faction}-power-token`}></div>
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
      return (<div key={garrison} styleName={`garrison-${garrison}`}></div>);
    });
  }
}

export default App;
