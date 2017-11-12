import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './OrderToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece'
import HouseToken from '~/components/house-token/HouseToken'


@CSSModules(styles, { allowMultiple: true })
export default class OrderToken extends React.Component {
  state = { flipped: false };

  flip = () => {
    console.trace(0);
    this.setState(prevState => ({ flipped: !prevState.flipped }));
  }

  render() {
    const { special, type, houseName, strength, revealed } = this.props;
    const specialModifier = special ? 'special-' : '';
    const minusModifier = strength < 0 ? 'minus-' : '';
    const flippedStyle = revealed ? 'flipped' : '';
    const orderType = _.kebabCase(type);

    //if (!revealed) {
      //return <HouseToken {...this.props} type="order-cover" />
    //}

    return (
      <Piece
        {...this.props}
        styleName={`flippable ${flippedStyle}`}
        data-flipped={this.state.flipped}
        onClick={this.flip}
      >
        <div
          styleName="flipper"
          onClick={this.flip}
        >
          <div
            styleName={`${specialModifier}${minusModifier}${orderType}`}
            onClick={this.flip}
          >
          </div>
          <div
            styleName={`${houseName}-order-cover`}
            onClick={this.flip}
          />
        </div>
      </Piece>
    );
  }
}
