import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { droppable } from '~/decorators';

import Board from '~/components/board/Board';
import WarRoom from '~/components/war-room/WarRoom';

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
        </aside>
				<WarRoom visible={false} />
      </div>
    );
  }
}

export default App;
