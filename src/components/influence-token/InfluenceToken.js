import React from 'react';
import HouseToken from '~/components/house-token/HouseToken';

export default class InfluenceToken extends React.Component {
  evaluatePosition = (drop) => {
    if (drop.target !== 'board'){ return; }
    drop.position = 0;
  }

  render() {
    const steady = this.props.position > 0;
    return <HouseToken
      {...this.props}
      type="influence-token"
      steady={steady}
      beforeMovePiece={this.evaluatePosition}
    />
  }
}
