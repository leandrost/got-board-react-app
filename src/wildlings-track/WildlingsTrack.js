import React from 'react';
import CSSModules from 'react-css-modules';
import { DropTarget, DragSource } from 'react-dnd';

import styles from './WildlingsTrack.scss';

@DragSource("wildling-threat-token", {
  beginDrag(props) {
    return props;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) { return false; }
    var object = monitor.getDropResult();
    props.onDragEnd(object);
  }
}, (connect, monitor) => {
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

@DropTarget("wildling-threat-token", {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (component.onDrop) { component.onDrop(item); }
    return props;
  }
}, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
})
@CSSModules(styles)
export class WildlingTrackSlot extends React.Component {
  render() {
    const { connectDropTarget, isOver, children } = this.props;
    const actived =  isOver ? "-actived" : '';

    return connectDropTarget(
      <div styleName={`position${actived}`}>
        { children }
      </div>
    );
  }
}

@CSSModules(styles)
export default class WildlingsTrack extends React.Component {
  constructor() {
    super();
    this.state = { position: 1 };
  }

  updateCurrentPosition(position) {
    this.setState({ position: position });
  }

  renderToken(position) {
    if (this.state.position === position)  {
      return <WildlingThreatToken position={position} onDragEnd={ token => this.updateCurrentPosition(token.position) } />;
    }
  }

  renderPosition(position) {
    return (
      <WildlingTrackSlot key={position} position={position}>
        { this.renderToken(position) }
      </WildlingTrackSlot>
      );
  }

  render() {
    const positions = [0, 2, 4, 6, 8, 10, 12];
    return <div styleName="track">
      { positions.map((threat, position) => { return this.renderPosition(position) }) }
    </div>
  }
}

