import React from 'react';
import CSSModules from 'react-css-modules';
import { DropTarget, DragSource } from 'react-dnd';

import styles from '../app.scss';

@DragSource("influence-token", {
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
export class InfluenceToken extends React.Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div styleName="threat-token"></div>
    );
  }
}

@DropTarget("influence-token", {
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
export class InfluenceTrackSlot extends React.Component {
  render() {
    const { connectDropTarget, isOver, children } = this.props;
    const actived =  isOver ? "-actived" : '';

    return connectDropTarget(
      <div>
        { children }
      </div>
    );
  }
}

@CSSModules(styles)
export default class InfluenceTrack extends React.Component {
  render() {
    return <div>
    </div>
  }
}

