import React from 'react';
import CSSModules from 'react-css-modules';

import { piece } from '~/decorators';

import styles from './GarrisonToken.scss';

@piece('garrison-token')
@CSSModules(styles)
export default class GarrisonToken extends React.Component {
  render() {
    const { name } = this.props;
    return <div styleName={`garrison-${name}`} style={this.props.style}></div>
  }
}

