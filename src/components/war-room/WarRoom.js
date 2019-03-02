import React from 'react';
import CSSModules from 'react-css-modules';
import { draggable, droppable } from '~/decorators';

import Pieces from '~/components/pieces/Pieces';
import GarrisonToken from '~/components/garrison-token/GarrisonToken';
import HouseToken from '~/components/house-token/HouseToken';
import Orders from '~/components/orders/Orders';
import PieceCounter from '~/components/piece-counter/PieceCounter';
import HouseCard from '~/components/house-card/HouseCard';

import styles from './WarRoom.scss';

const DEFAULT_POSITION = { x: 30, y: 30 };

@droppable([
  'footman',
  'knight',
  'ship',
  'siege-engine',
  'garrison-token',
  'power-token',
  'raid-order',
  'march-order',
  'support-order',
  'consolidation-order',
  'defense-order',
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

  unitFilter(unit, props) {
    return !unit.territory &&
      unit.houseName === props.houseName &&
      unit.type === props.type;
  }


  render() {
    const { connectDragSource, isDragging, connectDropTarget, isOver, house } = this.props;
    const { x, y } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      visibility: this.getVisibility()
    };
    const territoryFilter = (unit) => !unit.territory && unit.houseName === house;
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
                type='Footman'
                collection='units'
                houseName={house}
                piece={HouseToken}
                filter={this.unitFilter}
              />
              <PieceCounter
                type='Knight'
                collection='units'
                houseName={house}
                piece={HouseToken}
                filter={this.unitFilter}
              />
              <PieceCounter
                type='Ship'
                collection='units'
                houseName={house}
                piece={HouseToken}
                filter={this.unitFilter}
              />
              <PieceCounter
                type='SiegeEngine'
                collection='units'
                houseName={house}
                piece={HouseToken}
                filter={this.unitFilter}
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
              <Orders houseName={house} filter={territoryFilter} steady={true} />
              <Pieces piece={GarrisonToken} collection="garrisonTokens" steady filter={piece => !piece.territory} />
            </section>
            <section>
              <Pieces
                piece={HouseCard}
                collection="houseCards"
                steady
                filter={piece => piece.houseName === house}
              />
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
