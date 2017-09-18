import React from 'react';
import CSSModules from 'react-css-modules';
import { draggable, droppable } from '../decorators';

import AvailableUnits from './available-units/AvailableUnits';
import GarrisonTokens from '~/garrison-tokens/GarrisonTokens';

import styles from './WarRoom.scss';

const DEFAULT_POSITION = { x: 30, y: 30 };

@droppable(['unit', 'garrison-token'])
@draggable('war-room')
@CSSModules(styles)
export default class WarRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.visible || false,
      DEFAULT_POSITION
    };
  }

  endDrag(monitor){
    const { x, y } = monitor.getDropResult();
    this.setState({ x, y });
  }

  drop(){
    return { territory: null, x: 0, y: 0 };
  }

  openWarRoom() {
    const x = window.pageXOffset + DEFAULT_POSITION.x;
    const y = window.pageYOffset + DEFAULT_POSITION.y;
    this.setState({ isVisible: true, x, y });
  }

  closeWarRoom() {
    this.setState({ isVisible: false });
  }

  getVisibility() {
    let isVisible = this.state.isVisible;
    if(this.props.isDragging) { isVisible = false; }
    return isVisible ? '' : 'hidden';
  }

  render() {
    const house = 'stark';
    const { connectDragSource, isDragging, connectDropTarget, isOver } = this.props;
    const { x, y } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      visibility: this.getVisibility()
    };
    return (
      <div>
        <button styleName='war-room-button' onClick={() => this.openWarRoom()}>War Room</button>
        {
        connectDragSource(connectDropTarget(
        <div styleName='war-room' data-dragging={isDragging} data-dragging-over={isOver || null}  style={style}>
          <button onClick={() => this.closeWarRoom()}>Fechar</button>
          <main>
            <AvailableUnits house={house} type='footman' />
            <AvailableUnits house={house} type='knight' />
            <AvailableUnits house={house} type='ship' />
            <AvailableUnits house={house} type='siege-engine' />
            <GarrisonTokens filter={token => !token.territory} />
          </main>
        </div>
        ))
        }
      </div>
      )
  }
}

