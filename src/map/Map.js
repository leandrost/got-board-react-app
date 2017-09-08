import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import build from 'redux-object';

import { droppable } from '../decorators';
import { fetchGame } from '../redux/actions/';

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
  drop(item, monitor) {
    console.log('drop');
    console.log('scrollTop', document.body.scrollTop);
    console.log('scrollLeft', document.body.scrollLeft);
    const y = document.body.scrollTop + monitor.getSourceClientOffset().y;
    //const x = document.body.scrollLeft + monitor.getSourceClientOffset().x;
    const x = monitor.getDifferenceFromInitialOffset().x;

    console.log('getClientOffset', monitor.getClientOffset());
    console.log('getInitialClientOffset', monitor.getInitialClientOffset());
    console.log('getInitialSourceClientOffset', monitor.getInitialSourceClientOffset());
    console.log('getDifferenceFromInitialOffset', monitor.getDifferenceFromInitialOffset());
    console.log('getSourceClientOffset', monitor.getSourceClientOffset());

    return  { x: x, y: y };
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

