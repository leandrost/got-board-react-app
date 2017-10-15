import React from 'react';
import CSSModules from 'react-css-modules';
import { draggable, droppable } from '~/decorators';

import Pieces from '~/components/pieces/Pieces';
import GarrisonToken from '~/components/garrison-token/GarrisonToken';
import HouseToken from '~/components/house-token/HouseToken';
import OrderToken from '~/components/order-token/OrderToken';
import PieceCounter from '~/components/piece-counter/PieceCounter';

import styles from './WarRoom.scss';

const DEFAULT_POSITION = { x: 30, y: 30 };

@droppable([
  'footman',
  'knight',
  'ship',
  'siege-engine',
  'garrison-token',
  'power-token'
])
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

  filter(piece, props) {
    return piece.available && piece.houseName === props.houseName;
  }

  render() {
    const house = 'stark';
    const { connectDragSource, isDragging, connectDropTarget, isOver } = this.props;
    const { x, y } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      visibility: this.getVisibility()
    };
    const unitFilter = (unit) => !unit.territory && unit.houseName === house;
    return (
      <div>
        <button styleName='war-room-button' onClick={() => this.openWarRoom()}>War Room</button>
        {
        connectDragSource(connectDropTarget(
        <div styleName='war-room' data-dragging={isDragging} data-dragging-over={isOver || null}  style={style}>
          <button onClick={() => this.closeWarRoom()}>Fechar</button>
          <main>
            <section>
              <PieceCounter
                type='footman'
                collection='footmen'
                houseName={house}
                piece={HouseToken}
                filter={unitFilter}
              />
              <PieceCounter
                type='knight'
                collection='knights'
                houseName={house}
                piece={HouseToken}
                filter={unitFilter}
              />
              <PieceCounter
                type='ship'
                collection='ships'
                houseName={house}
                piece={HouseToken}
                filter={unitFilter}
              />
              <PieceCounter
                type='siege-engine'
                collection='siegeEngines'
                houseName={house}
                piece={HouseToken}
                filter={unitFilter}
              />
              <PieceCounter
                type='power-token'
                collection='powerTokens'
                houseName={house}
                filter={this.filter}
                piece={HouseToken}
              />
            </section>
            <section>
              <OrderToken houseName={house} type="march-order" steady />
              <OrderToken houseName={house} type="march-order" steady special />
              <OrderToken houseName={house} type="minus-march-order" steady />
              <OrderToken houseName={house} type="support-order" steady />
              <OrderToken houseName={house} type="support-order" steady special />
              <OrderToken houseName={house} type="raid-order" steady />
              <OrderToken houseName={house} type="raid-order" steady special />
              <OrderToken houseName={house} type="defend-order" steady />
              <OrderToken houseName={house} type="defend-order" steady special />
              <OrderToken houseName={house} type="consolidate-order" steady />
              <OrderToken houseName={house} type="consolidate-order" steady special />
            </section>
            <section>
              <HouseToken houseName={house} type="card-cover" steady />
            </section>
            <section>
              <Pieces piece={GarrisonToken} collection="garrisonTokens" steady filter={piece => !piece.territory} />
            </section>
          </main>
        </div>
        ))
        }
      </div>
      )
  }
}
