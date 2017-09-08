import React from 'react';
import CSSModules from 'react-css-modules';

import { draggable, droppable } from '../decorators';
import styles from './WildlingsTrack.scss';

@draggable("wildling-threat-token")
@CSSModules(styles)
export class WildlingThreatToken extends React.Component {
	render() {
		const { connectDragSource } = this.props;
		return connectDragSource(
				<div styleName="threat-token"></div>
		);
	}
}

@droppable("wildling-threat-token")
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
      return <WildlingThreatToken
				position={position}
			  onDragEnd={ token => this.updateCurrentPosition(token.position) } />;
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
