import React from 'react';
//import CSSModules from 'react-css-modules';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

//import styles from './InfluenceToken.scss';

import HouseToken from '~/components/house-token/HouseToken';

export default class InfluenceToken extends React.Component {
  render() {
    const steady = typeof position === 'number';
    return <HouseToken
      {...this.props}
      type="influence-token"
      steady={steady}
    />
  }
}
