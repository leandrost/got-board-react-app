import React from 'react';
import CSSModules from 'react-css-modules';

import WildlingsTrack from '../wildlings-track/WildlingsTrack';
import InfluenceTrack from '../influence-track/InfluenceTrack';
import SupplyTrack from '../supply-track/SupplyTrack';
import RoundTrack from '../round-track/RoundTrack';
import VictoryTrack from '../victory-track/VictoryTrack';
import Map from '../map/Map';
import Unit from '../unit/Unit';

import styles from './Board.scss';

@CSSModules(styles)
export default class Board extends React.Component {

  render() {
    return (
      <div styleName="board">
        <main>
          <Map />
          <WildlingsTrack />
          <Unit name="greyjoy-knight" x={799} y={238} />
        </main>
        <aside>
          <InfluenceTrack />
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
