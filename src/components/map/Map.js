import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import build from 'redux-object';

import { fetchGame } from '~/redux/actions/';
import { droppable } from '~/decorators';

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
    this.props.fetchGame(6);
  }

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

@droppable(['unit', 'garrison-token'])
@CSSModules(styles)
export class Territory extends React.Component {
  drop(monitor) {
    const result = Object.assign(
      { territory: this.props.slug },
      monitor.getDropPosition()
    );
    return result;
  }

  render() {
    const props = this.props;
    const { connectDropTarget, isOver } = props;
    const styleName = isOver ? "territory-actived" : 'territory';

    return connectDropTarget(
      <g id={props.slug} styleName={styleName}>
        <path d={props.boundaries} />
      </g>
    );
  }
}

