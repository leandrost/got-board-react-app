import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Pusher from 'pusher-js';

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
  componentWillMount() {
    const params = {}
    window.location.search.replace('?', '').split('&').forEach(param => {
      const arr = param.split('=');
      const key = arr[0]
      const value = arr[1];
      params[key] = value;
    })
    this.setState(params);
  }

  componentDidMount() {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const pusher = new Pusher("cfdf3c0b0c4a559c3dfe", { cluster: "mt1" });
    const channel = pusher.subscribe('game');

    channel.bind('update', function(data) {
      console.table(data);
      //this.props.update(data);
    });
  }

  drop(monitor) {
    return monitor.getDropPosition();
  }

  selectHouse = () => {
    alert('For now, please inform the params house in the url. ex.: https://got-board-react-app.herokuapp.com?game=12&house=greyjoy');
  }

  renderWarRoom() {
    if(this.state.house) {
      return <WarRoom visible={false} house={this.state.house} />;
    }
    const selectHouseStyle = {
      position: 'absolute',
      top: 30,
      left: 30,
    }
    return <button style={selectHouseStyle} onClick={this.selectHouse}>Select a House</button>;
  }

  render() {
    return this.props.connectDropTarget(
      <div styleName="app">
        <Board gameId={this.state.game} house={this.state.house} />
        <aside>
          <div styleName="iron-throne-token"></div>
          <div styleName="valyrian-steel-blade-token"></div>
          <div styleName="mensseger-raven-token"></div>
        </aside>
        { this.renderWarRoom() }
      </div>
    );
  }
}

export default App;
