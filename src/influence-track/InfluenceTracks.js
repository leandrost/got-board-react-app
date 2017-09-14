import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import build from 'redux-object';

import styles from './InfluenceTracks.scss';

import { droppable, draggable } from '../decorators';

@draggable('influence-token')
@CSSModules(styles)
export class InfluenceToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, position: props.position };
  }

  endDrag(monitor) {
    const { x, y, position } = monitor.getDropResult();
    this.setState({ x, y, position });
  }

  render() {
    const { x, y, position } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      position: position ? 'static' : 'absolute',
    };
    const { connectDragSource, house } = this.props;
    return connectDragSource(
      <div styleName={`${house}-influence-token`} style={style}></div>
    );
  }
}

@droppable('influence-token')
@CSSModules(styles)
export class InfluencePosition extends React.Component {
  render() {
    const { connectDropTarget, house, key } = this.props;
    return connectDropTarget(
      <li>
        { house ? <InfluenceToken house={house} position={key} /> : null }
      </li>
    );
  }
}

@connect(
  state => ({ ironThroneTrack: build(state, 'ironThroneTrack')[0] }),
)
@CSSModules(styles)
export default class InfluenceTracks extends React.Component {
  render() {
    const { ironThroneTrack } = this.props;
    const positions = ironThroneTrack.positions.slice().reverse();
    return <div styleName="tracks">
      <ol className="iron-throne">
        { positions.map((position, index) => { return <InfluencePosition key={index} house={position} /> }) }
      </ol>
      <ol className="fiefdoms">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
      <ol className="kings-court">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
    </div>
  }
}

