import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Map.scss';

import { connect, build } from '~/redux/tools';
import Territory from '~/components/territory/Territory';

@connect(
  state => ({ territories: state.territories })
)
@CSSModules(styles)
export default class Map extends React.Component {
  renderTerritories(){
    const territories = build(this.props, 'territories');
    if(!territories) { return; }
    return territories.map(territory => {
      return (
        <Territory key={territory.id} {...territory} />
        );
    });
  }

  render() {
    return (
      <svg width="1495px" height="2975px">
        { this.renderTerritories() }
      </svg>
    );
  }
}

