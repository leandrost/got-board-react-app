import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './WildlingCard.scss';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class WildlingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
    };
  }

  get cardStyle() {
    return {
      display: this.state.revealed ? null : "none",
    }
  }

  reveal = () => {
    this.setState(prevState => ({ revealed: !prevState.revealed }));
  }

  shuffle = () => {
    console.log("wildling Cards shuffle");
    new Notification("Wildlings Cards has been Shuffled!");
  }

  render() {
    return (
      <div styleName="wildling-card">
        <a href="#peak" onClick={this.reveal}>Peak</a>
        <a href="#reveal" onClick={this.reveal}>Reveal</a>
        <a href="#shuffle" onClick={this.shuffle}>Shuffle</a>

        <Piece
          style={this.cardStyle}
          styleName='silence-at-the-wall'
        />
      </div>
    );
  }
}
