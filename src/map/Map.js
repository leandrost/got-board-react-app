import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import build from 'redux-object';

import { fetchGame } from '../redux/actions/';
import { droppable } from '../decorators';

import styles from './Map.scss';

@connect(
  state => (
    {
      territories: state.territories
    }
  ),
  dispatch => (
    bindActionCreators({
      fetchGame,
    }, dispatch)
  )
)
@CSSModules(styles)
export default class Map extends React.Component {
  componentDidMount() {
    this.props.fetchGame(1);
  }

  renderTerritories(){
    const territories = build(this.props, 'territories');
    if(!territories) { return; }
    return territories.map(territory => {
      return (
        <Territory
          key={territory.id}
          name={territory.name}
          boundaries={territory.boundaries} />
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

@droppable("unit")
@CSSModules(styles)
export class Territory extends React.Component {
  drop(monitor) {
    return monitor.getDropPosition();
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    const styleName =  isOver ? "territory-actived" : 'territory';

    return connectDropTarget(
      <g id={this.props.name} styleName={styleName}>
        <path d={this.props.boundaries} />
      </g>
    );
  }
}

