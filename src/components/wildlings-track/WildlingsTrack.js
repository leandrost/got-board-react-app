import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './WildlingsTrack.scss';

import { droppable } from '~/decorators';
import { connect, actions } from '~/redux/tools';
import { updateGame } from '~/redux/actions';

import Piece from '~/components/piece/Piece';

const POSITIONS = [0, 2, 4, 6, 8, 10, 12];

@CSSModules(styles)
export class WildlingThreatToken extends React.Component {
	render() {
    return <Piece
      {...this.props}
      type="wildling-threat-token"
      styleName="threat-token"
    />
	}
}

@droppable("wildling-threat-token")
@CSSModules(styles)
export class WildlingTrackSlot extends React.Component {
  drop() {
    return { position: this.props.position }
  }

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

@connect(
  (state) => ({ }),
  actions({ updateGame })
)
@CSSModules(styles)
export default class WildlingsTrack extends React.Component {
  updatePosition = (props, dropResult) => {
    const threat = POSITIONS[dropResult.position];
    this.props.updateGame(this.props.gameId, { wildlingThreat: threat });
  }

  renderToken(position) {
    const  { threat } = this.props;
    const currentPostion = POSITIONS.indexOf(threat);

    console.log(position, currentPostion);
    if (position !== currentPostion)  { return }

    return <WildlingThreatToken onDragEnd={ this.updatePosition} />;
  }

  renderPosition(position) {
    return (
      <WildlingTrackSlot key={position} position={position}>
        { this.renderToken(position) }
      </WildlingTrackSlot>
      );
  }

  render() {
    return <div styleName="track">
      { POSITIONS.map((threat, position) => { return this.renderPosition(position) }) }
    </div>
  }
}
