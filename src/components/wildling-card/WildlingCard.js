import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './WildlingCard.scss';

import _ from 'lodash';
import { connect, build, actions } from '~/redux/tools';

import Piece from '~/components/piece/Piece';

import * as wildlingCards from '~/redux/actions/';

function buildCard(state) {
  if (!state.wildlingCards.id) { return {}; }
  return state.wildlingCards.attributes;
}

@connect(
  (state, props) => ({
    gameId: state.current.gameId,
    card: buildCard(state),
  }),
  actions(wildlingCards)
)
@CSSModules(styles)
export default class WildlingCard extends React.Component {

  get gameId() {
    return this.props.gameId;
  }

  get cardName() {
    const card =  this.props.card;
    if (!card) { return null; }
    return _.kebabCase(card.name);
  }

  draw = (e) => {
    e.preventDefault();
    if (this.cardName) {
      return this.props.moveWildlingCardToBottom(this.gameId);
    }
    this.props.drawWildlingCard(this.gameId);
  }

  peek = (e) => {
    e.preventDefault();
    if (this.cardName) {
      return this.props.hideWildlingCard(this.gameId);
    }
    this.props.peekWildlingCard(this.gameId);
  }

  shuffle = (e) => {
    e.preventDefault();
    new Notification("Wildlings Cards has been Shuffled!");
  }

  render() {
    return (
      <div styleName="wildling-card">
        <a href="#peek" onClick={this.peek}>Peak</a>
        <a href="#draw" onClick={this.draw}>Draw</a>
        <a href="#shuffle" onClick={this.shuffle}>Shuffle</a>
        <Piece styleName={this.cardName} />
      </div>
    );
  }
}
