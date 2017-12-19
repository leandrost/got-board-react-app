import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Board.scss';

import { connect, build, actions } from '~/redux/tools';
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

import { fetchGame } from '~/redux/actions/';

@connect(
  (state, props) => ({
    game: build(state, `games`, props.gameId) || {},
  }),
  actions({ fetchGame })
)
@droppable('influence-token')
@CSSModules(styles)
export default class Board extends React.Component {
  componentDidMount() {
    this.props.fetchGame(this.props.gameId);
  }

  drop(monitor) {
    return monitor.getDropPosition();
  }

  render() {
    const { connectDropTarget, game, house } = this.props;
    const { id, round }  = game;
    const territoryFilter = (piece) => piece.territory;
    const positionFilter = (token) => !token.position;

    return (
      <div styleName="board">
        { connectDropTarget(
        <main>
          <Map />
          <Pieces piece={InfluenceToken} collection="influenceTokens" filter={positionFilter} />

          <Pieces piece={HouseToken} collection="footmen" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="knights" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="ships" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="siegeEngines" filter={territoryFilter} />
          <Pieces piece={HouseToken} collection="powerTokens" type="power-token" filter={territoryFilter} />

          <Orders house={house} filter={territoryFilter} />

          <Pieces piece={GarrisonToken} collection="garrisonTokens" filter={territoryFilter} />
          <Pieces piece={NeutralForceToken} collection="neutralForceTokens" filter={territoryFilter} />
          <WildlingsTrack />
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
