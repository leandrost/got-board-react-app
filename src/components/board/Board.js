import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Board.scss';

import { connect, actions, build } from '~/redux/tools';
import { droppable } from '~/decorators';

import Map from '~/components/map/Map';
import WildlingsTrack from '~/components/wildlings-track/WildlingsTrack';
import Pieces from '~/components/pieces/Pieces';
import InfluenceTrack from '~/components/influence-track/InfluenceTrack';
import SupplyTrack from '~/components/supply-track/SupplyTrack';
import RoundTrack from '~/components/round-track/RoundTrack';
import VictoryTrack from '~/components/victory-track/VictoryTrack';
import InfluenceToken from '~/components/influence-token/InfluenceToken';
import GarrisonToken from '~/components/garrison-token/GarrisonToken';
import HouseToken from '~/components/house-token/HouseToken';
import NeutralForceToken from '~/components/neutral-force-token/NeutralForceToken';
import Orders from '~/components/orders/Orders';
import WildlingCard from '~/components/wildling-card/WildlingCard';

import { fetchGame, updateAll } from '~/redux/actions/';

@connect(
  (state, props) => {
    return {
      game: build(state, 'game', props.gameId, { eager: true }) || {},
    };
  },
  actions({ fetchGame, updateAll })
)
@droppable('influence-token')
@CSSModules(styles)
export default class Board extends React.Component {
  componentDidMount() {
    this.props.fetchGame(this.props.gameId);
  }

  drop(monitor) {
    return  { ...monitor.getDropPosition(), target: 'board' };
  }

  flipOrders = (revealed) => {
    const house = this.props.game.houses.find(
      (house) => house.name === this.props.house
    );

    this.props.updateAll(this.props.gameId, 'order', {
      filter: { house_id: house.id  },
      attributes: { revealed: revealed }
    })
  }

  render() {
    const { connectDropTarget, game, house } = this.props;
    const { id, round, wildlingThreat }  = game;
    const territoryFilter = (piece) => piece.territory;
    const positionFilter = (token) => (token.position === 0);
    const showStyle = { position: 'fixed', top: 5, left: 90 };
    const hideStyle = { position: 'fixed', top: 5, left: 190 };

    return (
      <div styleName="board">
        <button style={showStyle} onClick={() => this.flipOrders(true)}>Show Orders</button>
        <button style={hideStyle} onClick={() => this.flipOrders(false)}>Hide Orders</button>
        <WildlingsTrack gameId={id} threat={wildlingThreat} />
        <WildlingCard gameId={id} />
        { connectDropTarget(
        <main>
          <Map />
          <Pieces piece={InfluenceToken} collection="influenceTokens" type="influenceToken" filter={positionFilter} />

          <Pieces piece={HouseToken} collection="units" type="footman" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="units" type="knight" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="units" type="ship" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="units" type="siegeEngine" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="powerTokens" type="powerToken" filter={territoryFilter} />

          <Orders houseName={house} filter={territoryFilter} />

          <Pieces piece={GarrisonToken} collection="garrisonTokens" type="garrisonToken" filter={territoryFilter} />
          <Pieces piece={NeutralForceToken} collection="neutralForceTokens" type="neutralForceToken" filter={territoryFilter} />
        </main>
        )}
        <aside>
          <div styleName="influence-tracks">
            <InfluenceTrack type="IronThroneToken" />
            <InfluenceTrack type="FiefdomToken" />
            <InfluenceTrack type="KingsCourtToken" />
          </div>
          <div styleName="supply">
            <SupplyTrack />
          </div>
          <div styleName="round-victory">
            <RoundTrack gameId={id} round={round} />
            <VictoryTrack />
          </div>
        </aside>
      </div>
      );
  }
}
