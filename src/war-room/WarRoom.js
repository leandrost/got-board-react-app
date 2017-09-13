import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import build from 'redux-object';
import { draggable, droppable } from '../decorators';

import Unit from '../unit/Unit';

import styles from './WarRoom.scss';

@connect(
  state => ({
    units: (build(state, 'units')  || []).filter(unit => !unit.territory)
  })
)
@droppable("unit")
@draggable("war-room")
@CSSModules(styles)
export default class WarRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      x: props.x,
      y: props.y
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
    const x = window.pageXOffset + 30;
    const y = window.pageYOffset + 30;
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
        <br />
        {
        this.props.units.map(unit => {
        return (<Unit key={unit.id} {...unit} />);
        })
        }
      </div>
      ))
      }
    </div>
    )
  }
}
