import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import build from 'redux-object';

import styles from './InfluenceTracks.scss';

import { droppable } from '../decorators';

@CSSModules(styles)
export class InfluenceToken extends React.Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div></div>
    );
  }
}

@droppable('influence-token')
@CSSModules(styles)
export class InfluenceTrackSlot extends React.Component {
  render() {
    const { connectDropTarget, house } = this.props;
    const token = <div styleName={`${house}-influence-token`}></div>;
    return connectDropTarget(
      <li>
        { house ? token : null }
      </li>
    );
  }
}

@connect(
  state => ({ ironThroneTrack: build(state, 'ironThroneTrack')['0'] }),
)
@CSSModules(styles)
export default class InfluenceTracks extends React.Component {
  render() {
    const { ironThroneTrack } = this.props;
    const positions = ironThroneTrack.positions.slice().reverse();
    return <div styleName="tracks">
      <ol className="iron-throne">
        { positions.map((position, index) => { return <InfluenceTrackSlot key={index} house={position} /> }) }
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

