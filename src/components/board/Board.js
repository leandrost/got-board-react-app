import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import build from 'redux-object';

import { droppable } from '~/decorators';

import Map from '~/components/map/Map';
import WildlingsTrack from '~/components/wildlings-track/WildlingsTrack';
import InfluenceTracks from '~/components/influence-track/InfluenceTracks';
import SupplyTrack from '~/components/supply-track/SupplyTrack';
import RoundTrack from '~/components/round-track/RoundTrack';
import VictoryTrack from '~/components/victory-track/VictoryTrack';
import Unit from '~/components/unit/Unit';
import InfluenceToken from '~/components/influence-token/InfluenceToken';
import GarrisonTokens from '~/components/garrison-tokens/GarrisonTokens';
import GarrisonToken from '~/components/garrison-token/GarrisonToken';

import styles from './Board.scss';

@connect(
  state => ({
    units: (build(state, 'units') || []).filter(unit => unit.territory),
      influenceTokens: (build(state, 'influenceTokens') || []).filter(token => !token.position)
  })
)
@droppable('influence-token')
@CSSModules(styles)
export default class Board extends React.Component {
  drop(monitor) {
    console.log('Board#drop');
    return monitor.getDropPosition();
  }

  render() {
    const { connectDropTarget, units, influenceTokens } = this.props;
    return (
      <div styleName="board">
        { connectDropTarget(
        <main>
          <Map />
          <WildlingsTrack />
          { units.map(unit =>  <Unit key={unit.id} {...unit} />) }
          { influenceTokens.map(token => <InfluenceToken key={token.id} {...token} />) }
          <GarrisonTokens piece={GarrisonToken} filter={token => token.territory} />
        </main>
        )}
        <aside>
          <InfluenceTracks />
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
