import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { DropTarget, DragSource } from 'react-dnd';

import styles from './WildlingsTrack.scss';

const source = {
  beginDrag() {

  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) { return false; }
    var r = monitor.getDropResult();
    const el = ReactDOM.findDOMNode(component);
    const top = el.offsetTop + r.y
    return top;
  }
};

@DragSource("wildling-threat-token", source, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})
@CSSModules(styles)
export class WildlingThreatToken extends React.Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div styleName="threat-token"></div>
    );
  }
}

const POSITION_COUNT = 7;

@CSSModules(styles)
export default class WildlingsTrack extends React.Component {
  constructor() {
    super();
    this.state = { positionIndex: 2 };
  }

  updateCurrentPosition(position) {
    this.setState('position', position);
  }

  renderToken(position) {
    if (this.state.position === position) {
      return <WildlingThreatToken />;
    }
  }

  renderPosition(position) {
    return (
      <div styleName="position-actived">
        { this.renderToken(position) }
      </div>
      );
  }

  render() {
    const positions = new Array(POSITION_COUNT);
    console.log(positions);
    const arr = positions.map(i => { return 0 })
    console.log(arr);
    return (
      <div styleName="track">
        {
        positions.map(i => { return (<div styleName="position-actived"> { this.renderToken(i) } </div>) })
        }
      </div>
      );
  }
}

