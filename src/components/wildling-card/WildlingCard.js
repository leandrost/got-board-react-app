import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './WildlingCard.scss';

import _ from 'lodash';
import { connect, build, actions } from '~/redux/tools';

import Piece from '~/components/piece/Piece';

import * as wildlingCards from '~/redux/actions/';

@connect(
  (state, props) => ({ card: build(state, 'wildlingCards')[0] || {} }),
  actions(wildlingCards)
)
@CSSModules(styles)
export default class WildlingCard extends React.Component {
  get cardName() {
    return _.kebabCase(this.props.card.name);
  }

  reveal = (e) => {
    e.preventDefault();
    if (this.cardName) {
      return this.props.unrevealWildlingCardSuccess();
    }
    this.props.revealWildlingCardSuccess();
  }

  shuffle = () => {
    new Notification("Wildlings Cards has been Shuffled!");
  }

  render() {
    return (
      <div styleName="wildling-card">
        <a href="#peak" onClick={this.reveal}>Peak</a>
        <a href="#reveal" onClick={this.reveal}>Reveal</a>
        <a href="#shuffle" onClick={this.shuffle}>Shuffle</a>
        <Piece styleName={this.cardName} />
      </div>
    );
  }
}
