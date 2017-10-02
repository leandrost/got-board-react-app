import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import build from 'redux-object';
import { bindActionCreators } from 'redux'

import { droppable } from '~/decorators';

import Map from '~/components/map/Map';
import WildlingsTrack from '~/components/wildlings-track/WildlingsTrack';
import InfluenceTrack from '~/components/influence-track/InfluenceTrack';
import SupplyTrack from '~/components/supply-track/SupplyTrack';
import RoundTrack from '~/components/round-track/RoundTrack';
import VictoryTrack from '~/components/victory-track/VictoryTrack';
import Unit from '~/components/unit/Unit';
import InfluenceToken from '~/components/influence-token/InfluenceToken';
import GarrisonTokens from '~/components/garrison-tokens/GarrisonTokens';
import GarrisonToken from '~/components/garrison-token/GarrisonToken';

import styles from './Board.scss';
import { fetchGame } from '~/redux/actions/';

@connect(
  state => ({
    footmen: (build(state, 'footmen') || []).filter(unit => unit.territory),
    knights: (build(state, 'knights') || []).filter(unit => unit.territory),
    ships: (build(state, 'ships') || []).filter(unit => unit.territory),
    siegeEngines: (build(state, 'siegeEngines') || []).filter(unit => unit.territory),
    ironThroneTokens: (build(state, 'ironThroneTokens') || []).filter(token => !token.position),
    fiefdomTokens: (build(state, 'fiefdomTokens') || []).filter(token => !token.position),
    kingsCourtTokens: (build(state, 'kingsCourtTokens') || []).filter(token => !token.position)
  }),
  dispatch => (
    bindActionCreators({ fetchGame }, dispatch)
  )
)
@droppable('influence-token')
@CSSModules(styles)
export default class Board extends React.Component {
  componentDidMount() {
    const arr = window.location.pathname.split('/');
    const gameId = arr[arr.length - 1];
    this.props.fetchGame(gameId);
  }

  drop(monitor) {
    return monitor.getDropPosition();
  }

  render() {
    const {
      connectDropTarget,
      footmen,
      knights,
      ships,
      siegeEngines,
      ironThroneTokens,
      fiefdomTokens,
      kingsCourtTokens
    } = this.props;

    const units = [...footmen, ...knights, ...ships, ...siegeEngines];

    return (
      <div styleName="board">
        { connectDropTarget(
        <main>
          <Map />
          <WildlingsTrack />
          { units.map(unit =>  <Unit key={unit.id} {...unit} />) }
          { ironThroneTokens.map(token => <InfluenceToken key={token.id} {...token} />) }
          { fiefdomTokens.map(token => <InfluenceToken key={token.id} {...token} />) }
          { kingsCourtTokens.map(token => <InfluenceToken key={token.id} {...token} />) }
          <GarrisonTokens piece={GarrisonToken} filter={token => token.territory} />
        </main>
        )}
        <aside>
          <div styleName="influence-tracks">
            <InfluenceTrack type="ironThrone" />
            <InfluenceTrack type="fiefdom"/>
            <InfluenceTrack type="kingsCourt" />
          </div>
          <div styleName="supply">
            <SupplyTrack />
          </div>
          <div styleName="round-victory">
            <RoundTrack />
            <VictoryTrack />
          </div>
        </aside>
      </div>
      );
  }
}
